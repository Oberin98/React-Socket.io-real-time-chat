import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from 'react-router';

// Styles
import "./NavBar.css";

// icons
import onlineicon from "../../icons/onlineIcon.png";

export const NavBar = ({ socket }) => {
  const { room } = useParams();
  const history = useHistory();

  const leaveChat = () => {
    socket.close();
    history.push("/");
  }

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

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(NavBar);
