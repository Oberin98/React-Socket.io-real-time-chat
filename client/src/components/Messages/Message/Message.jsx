import React from "react";

import PropTypes from "prop-types";

// Styles
import "./Message.css";

const Message = ({ message: { user, message }, currentUser }) => {
  let isSentByCurrentUser = false;
  currentUser = currentUser.trim().toLowerCase();
  
  if (user === currentUser) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <small className="sentText pr-10">{currentUser}</small>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{message}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundDark">
        <p className="messageText colorDark">{message}</p>
      </div>
      <small className="sentText pl-10">{user}</small>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
