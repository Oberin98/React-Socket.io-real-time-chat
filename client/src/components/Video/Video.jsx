import React, { useEffect, useState, useRef } from "react";

// Styles
import "./Video.css";

const videoType = "video/webm";

const Video = () => {
  const [recording, setRecording] = useState(false);
  const [videos, setVideos] = useState([]);
  const mediaRecorder = useRef(null); 

  let video = {};
  // init data storage for video chunks
  let chunks = [];
  
  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      video.srcObject = stream;
      video.play();
      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: videoType
      });

      mediaRecorder.current.ondataavailable = e => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };
    })();
  }, [chunks, video]);

  const startRecording = e => {
    e.preventDefault();
    // wipe old data chunks
    chunks = [];
    // start recorder with 10ms buffer
    mediaRecorder.state()
    debugger
    mediaRecorder.start(10);
    // say that we're recording
    setRecording(true);
  };

  const stopRecording = e => {
    e.preventDefault();
    // stop the recorder
    mediaRecorder.stop();
    // say that we're not recording
    setRecording(false);
    // save the video to memory
    saveVideo();
  };

  const saveVideo = () => {
    // convert saved chunks to blob
    const blob = new Blob(chunks, { type: videoType });
    // generate video url from blob
    const videoURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    setVideos(prevState => prevState.concat([videoURL]));
  };

  return (
    <div className="camera">
      <video
        style={{ width: 400 }}
        ref={v => {
          video = v;
        }}
      >
        Video stream not available.
      </video>
      <div>
        {!recording && <button onClick={e => startRecording(e)}>Record</button>}
        {recording && <button onClick={e => stopRecording(e)}>Stop</button>}
      </div>
      <div>
        <h3>Recorded videos:</h3>
        {videos.map((videoURL, i) => (
          <div key={`video_${i}`}>
            <video style={{ width: 200 }} src={videoURL} autoPlay loop />
            <div>
              <a href={videoURL}>Download</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;
