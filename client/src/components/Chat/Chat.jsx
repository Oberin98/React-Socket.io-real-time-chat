import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import io from "socket.io-client";
import PropTypes from "prop-types";

// Components
import { NavBar } from "../NavBar/NavBar";

// Styles
import "./Chat.css";

// Redux
import { addMessage } from "../../redux/actions/chatActions";

// Socket io
import {
  JOIN,
  DISCONNECT,
  MESSAGE,
  SEND_MESSAGE
} from "../../socketsClient/socketUtils";
let socket;

export const Chat = ({ name, room, messages, addMessage }) => {
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
      <div className="container">
        <NavBar socket={socket} />
        {/* <input
          type="text"
          value={message}
          onChange={event => setMessage(event.target.value)}
          onKeyPress={event => event.key === "Enter" && sendMessage(event)}
        /> */}
      </div>
    </section>
  );
};

const mapStateToProps = state => ({
  name: state.chatReducer.name,
  room: state.chatReducer.room,
  messages: state.chatReducer.messages
});

const mapDispatchToProps = dispatch => ({
  addMessage: message => dispatch(addMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
