import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import io from "socket.io-client";

import PropTypes from "prop-types";

// Socket io
import { JOIN, DISCONNECT, MESSAGE } from "../../socketsClient/socketUtils";

let socket;

export const Chat = ({ name, room, messages }) => {
  const [message, setMessage] = useState('');
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit(JOIN, { name, room }, () => {});

    return () => {
      socket.emit(DISCONNECT);

      socket.off();
    };
  }, [ENDPOINT, name, room]);

  useEffect(() => {
    socket.on(MESSAGE, message => {

    }, [messages]);
  });

  return <div></div>;
};

const mapStateToProps = state => ({
  name: state.chatReducer.name,
  room: state.chatReducer.room,
  messages: state.chatReducer.messages
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(Chat);
