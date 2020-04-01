import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Styles
import "./Video.css";

// Socket actions
import {
  CALL,
  BACK_CALL,
  MAKE_ANSWER,
  ANSWER_MADE
} from "../../socketsClient/socketUtils";

const videoType = "video/webm";

const Video = ({ socket, room }) => {
  const mediaRecorder = useRef(null);

  let localVideo = {};
  let remoteVideo = {};
  // init data storage for video chunks
  let chunks = [];

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      localVideo.srcObject = stream;
      localVideo.play();
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: videoType
      });

      mediaRecorder.current.ondataavailable = e => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };
    })();
  }, [chunks, localVideo]);

  useEffect(() => {
    let peerConnection = new RTCPeerConnection();
    const callUser = async room => {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(
        new RTCSessionDescription(offer)
      );

      socket.emit(CALL, {
        offer,
        room
      });
    };

    callUser(room);

    socket.on(BACK_CALL, async ({ offer, room }) => {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(
        new RTCSessionDescription(answer)
      );

      socket.emit(MAKE_ANSWER, {
        answer,
        room
      });
    });

    socket.on(ANSWER_MADE, async answer => {
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    peerConnection.ontrack = function({ streams: [stream] }) {
      remoteVideo.srcObject = stream;
      remoteVideo.play();
    };
  }, [remoteVideo, socket, room]);

  return (
    <div className="camera">
      <video
        style={{ width: 400 }}
        ref={v => {
          localVideo = v;
        }}
      ></video>
      <video
        style={{ width: 800 }}
        ref={v => {
          remoteVideo = v;
        }}
      ></video>
    </div>
  );
};

Video.propType = {
  socket: PropTypes.object.isRequired
};

export default Video;
