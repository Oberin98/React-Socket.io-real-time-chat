import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";
import PropTypes from "prop-types";

// Styles
import "./Messages.css";

// Components
import Message from './Message/Message';

export const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom className="chatBody">
      {messages.map((message, index) => (
        <Message message={message} currentUser={name} key={index} />
      ))}
    </ScrollToBottom>
  );
};

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string.isRequired
};

export default Messages
