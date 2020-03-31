import React from "react";
import { connect } from "react-redux";

import PropTypes from "prop-types";

// Components
import { startVideo } from '../../redux/actions//chatEnvActions';

// Styles
import "./SendMessageInput.css";
import video from "../../icons/play.png";

export const SendMessageInput = ({ message, setMessage, sendMessage, startVideo }) => {
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
        <p>Send</p>
      </button>
      <button className="startVideoButton noBorder" type="button">
        <img src={video} alt="Record" onClick={() => startVideo(true)}/>
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

const mapDispatchToProps = dispatch => ({
  startVideo: start => dispatch(startVideo(start)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMessageInput);
