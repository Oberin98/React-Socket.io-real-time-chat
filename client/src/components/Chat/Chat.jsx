import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import io from "socket.io-client";
import PropTypes from "prop-types";

// Components
import NavBar from "../NavBar/NavBar";
import SendMessageInput from "../SendMessageInput/SendMessageInput";
import Messages from "../Messages/Messages";
import Video from "../Video/Video";

// Styles
import "./Chat.css";
import usericon from "../../icons/user.png";

// Redux
import {
  addMessage,
  setRoomAndName,
  addMember
} from "../../redux/actions/chatActions";

// Socket io
import {
  JOIN,
  DISCONNECT,
  MESSAGE,
  SEND_MESSAGE,
  ADD_MEMBER
} from "../../socketsClient/socketUtils";

let socket;

// CHAT COMPONENT
export const Chat = ({
  name,
  room,
  addMessage,
  setRoomAndName,
  messages,
  addMember,
  members,
  isVideo
}) => {

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
  }, [ENDPOINT, name, room, addMember]);

  // Setting members
  useEffect(() => {
    socket.on(ADD_MEMBER, members => {
      addMember(members);
    });
  }, [addMember]);

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
        <h3 className="membersHeader">Members</h3>
        <div className="members">
          {members &&
            members.map((member, ind) => {
              return (
                <div className="memberContainer">
                  <div className="member" key={ind}>
                    <img src={usericon} alt="user" className="userIcon" />
                    <h5>{member.name}</h5>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="chatContainer">
        <NavBar socket={socket} setRoomAndName={setRoomAndName} />
        {
          isVideo
          ? <Video socket={socket} room={room} />
          : <>
            <Messages messages={messages} name={name} />
          <SendMessageInput
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
          </>
        }
      </div>
    </section>
  );
};


// PropTypes
Chat.propTypes = {
  name: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
  addMessage: PropTypes.func.isRequired,
  isVideo: PropTypes.bool.isRequired
};

// Redux
const mapStateToProps = state => ({
  name: state.chatReducer.name,
  room: state.chatReducer.room,
  messages: state.chatReducer.messages,
  members: state.chatReducer.members,
  isVideo: state.chatEnvReducer.isVideo
});

const mapDispatchToProps = dispatch => ({
  addMessage: message => dispatch(addMessage(message)),
  setRoomAndName: (room, name) => dispatch(setRoomAndName(room, name)),
  addMember: (name, room, id) => dispatch(addMember(name, room, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
