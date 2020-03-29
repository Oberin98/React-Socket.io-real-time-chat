import React, { Component } from "react";
import { connect } from "react-redux";

import ScrollToBottom from "react-scroll-to-bottom";
import PropTypes from "prop-types";

// Styles
import "./Messages.css";

export const Messages = ({ messages }) => {
  return (
    <ScrollToBottom>
      {messages.map(message => (
        <Message message={message} />
      ))}
    </ScrollToBottom>
  );
};

Messages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => ({
  messages: state.chatReducer.messages
});

export default connect(mapStateToProps)(Messages);
