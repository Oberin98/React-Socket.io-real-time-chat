import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Styles
import './Video.css';

const Video = () => {
  const [localVideo, setLocalVideo] = useState('');
  
  useEffect(() => {
    navigator.getUserMedia(
      { video: true, audio: true },
      stream => {
          console.log(stream)
          setLocalVideo(stream)
          console.log(localVideo)
      },
      err => {
        console.log(err)
      }
     );
  }, [])

  return (
    <div className="video-container">
      <video autoplay className="remoteVideo" id="remoteVideo"></video>
      <video autoplay muted className="localVideo" srcObject={localVideo} id="localVideo"></video>
    </div>
  );
};

Video.propTypes = {};

export default Video;
