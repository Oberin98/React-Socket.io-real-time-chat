import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import io from "socket.io-client";
import PropTypes from "prop-types";

// Components
import { NavBar } from "../NavBar/NavBar";
import { SendMessageInput } from "../SendMessageInput/SendMessageInput";
import { Messages } from "../SendMessageInput/Messages/Messages";

// Styles
import "./Chat.css";

// Redux
import { addMessage, setRoomAndName } from "../../redux/actions/chatActions";

// Socket io
import {
  JOIN,
  DISCONNECT,
  MESSAGE,
  SEND_MESSAGE
} from "../../socketsClient/socketUtils";
let socket;

export const Chat = ({ name, room, addMessage, setRoomAndName, messages }) => {
  const [message, setMessage] = useState("");
  const ENDPOINT = "localhost:5000";

  // Connection with sockets on server
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit(JOIN, { name, room }, () => {});

    return () => {
      socket.emit(DISCONNECT);

      socket.off();
    };
  }, [ENDPOINT, name, room]);

  // Listeninig to getting new message
  useEffect(() => {
    socket.on(MESSAGE, message => {
      addMessage(message);
    });
  }, [addMessage]);

  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit(SEND_MESSAGE, { message, room }, () => setMessage(""));
    }
  };

  return (
    <section className="outerContainer">
      <div className="membersContainer">
        <h3 className="membersHeader">
          Members
        </h3>
      </div>
      <div className="chatContainer">
        <NavBar socket={socket} setRoomAndName={setRoomAndName} />
        <Messages messages={messages} name={name} />
        <SendMessageInput  message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </section>
  );
};

Chat.propTypes = {
  name: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  name: state.chatReducer.name,
  room: state.chatReducer.room,
  messages: state.chatReducer.messages
});

const mapDispatchToProps = dispatch => ({
  addMessage: message => dispatch(addMessage(message)),
  setRoomAndName: (room, name) => dispatch(setRoomAndName(room, name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
