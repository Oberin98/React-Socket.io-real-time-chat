import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

import PropTypes from "prop-types";

// Styles
import "./NavBar.css";

// icons
import onlineicon from "../../icons/onlineIcon.png";


export const NavBar = ({ socket, setRoomAndName }) => {
  const { room, name } = useParams();
  const history = useHistory();
 
  const leaveChat = () => {
    socket.close();
    history.push("/");
  };

  useEffect(() => {
    setRoomAndName(room, name)
    }, [name, room, setRoomAndName]);

  return (
    <header className="navBar">
      <div className="leftInnerContainer">
        <img src={onlineicon} alt="logo" className="onlineIcon" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <button type="button" onClick={() => leaveChat()}>
          Leave chat
        </button>
      </div>
    </header>
  );
};

NavBar.propTypes = {
  socket: PropTypes.object,
  setRoomAndName: PropTypes.func.isRequired
};

export default connect(null)(NavBar);
