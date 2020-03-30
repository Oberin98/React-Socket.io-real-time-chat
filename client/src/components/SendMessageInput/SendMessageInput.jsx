import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

// Styles
import "./SendMessageInput.css";

export const SendMessageInput = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="sendMessageFrom" onSubmit={event => sendMessage(event)}>
      <input
        type="text"
        className="sendMessageInput noBorder"
        placeholder="Type message..."
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyPress={event => event.key === "Enter" && sendMessage(event)}
      />
      <button className="sendMessageButton noBorder" type="submit">
        Send
      </button>
    </form>
  );
};

SendMessageInput.propTypes = {
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageInput);
