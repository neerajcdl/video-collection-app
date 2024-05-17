import React, { useState, useEffect } from "react";
import "./App.css";
import ReactPlayer from "react-player";
import { MdDelete } from "react-icons/md";

const getLocalItems = () => {
  let list = localStorage.getItem("lists");

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoCaption, setVideoCaption] = useState("");
  const [youTubeVideos, setYouTubeVideos] = useState(getLocalItems());

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(youTubeVideos));
  }, [youTubeVideos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideo = {
      url: videoUrl,
      caption: videoCaption,
      progress: 0,
    };
    setYouTubeVideos((prevVideos) => [...prevVideos, newVideo]);
    setVideoUrl("");
    setVideoCaption("");
  };

  const handleDelete = (index) => {
    const updatedData = youTubeVideos.filter((item, ind) => {
      return ind !== index;
    });

    setYouTubeVideos(updatedData);
  };

  const handleProgress = (index, progress) => {
    setYouTubeVideos((prevVideos) => {
      const updatedVideos = [...prevVideos];
      updatedVideos[index].progress = progress.playedSeconds;
      return updatedVideos;
    });
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  return (
    <div className="app-container">
      <h1>Video Caption App</h1>
      <div className="form-part">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter video URL"
            id="videoUrl"
            name="videoUrl"
            required
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Enter your video caption"
            id="videoCaption"
            name="videoCaption"
            required
            value={videoCaption}
            onChange={(e) => setVideoCaption(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="video-part">
        {youTubeVideos.map((item, index) => {
          return (
            <div key={index} className="video">
              <ReactPlayer
                width={250}
                height={200}
                className="video-player"
                url={item.url}
                onProgress={(progress) => handleProgress(index, progress)}
              />
              <div className="title-time">
                <p className="caption">{item.caption}</p>
                <div className="time-delete-part">
                  <p className="timestamps">{formatTime(item.progress)}</p>
                  <MdDelete
                    className="delete-icon"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
