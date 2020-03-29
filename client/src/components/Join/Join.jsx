import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

// Styles
import "./Join.css";

// Redux
import { connectChat } from "../../redux/actions/chatActions";

import PropTypes from "prop-types";

export const Join = ({ connectChat }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const history = useHistory();

  const redirectToChat = () => {
    if (!room || !name) {
      return;
    } else {
      connectChat(name, room);
      history.push(`/chat/${room}/${name}`);
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={event => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={event => setRoom(event.target.value)}
          />
        </div>
        <button
          className={"button mt-20"}
          type="button"
          onClick={() => redirectToChat()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  connectChat: (name, room) => dispatch(connectChat(name, room))
});

export default connect(null, mapDispatchToProps)(Join);
