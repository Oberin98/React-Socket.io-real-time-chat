import React from "react";
// import { connect } from "react-redux";

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

// const mapStateToProps = state => ({
//   messages: state.chatReducer.messages,
//   name: state.chatReducer.name
// });

// export default connect(mapStateToProps)(Messages);

export default Messages
