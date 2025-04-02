import React from "react";
import YouTube, { YouTubeProps } from "react-youtube";

const YouTubePlayerReact = ({ videoId }: { videoId: string }) => {
  const opts: YouTubeProps["opts"] = {
    width: "100%", // Make it responsive
    height: "auto",
    playerVars: {
      autoplay: 1, // Auto-play video
      rel: 0, // Prevents showing related videos on end
      modestbranding: 1, // Hides YouTube logo
      controls: 1, // Shows controls
      showinfo: 0, // Hides video info
      disablekb: 1, // Disables keyboard shortcuts
      fs: 1, // Enables fullscreen
      playsinline: 1, // Ensures video plays inline on mobile
    },
  };

  // Function to handle video end
  const onVideoEnd = () => {
    console.log("Video has ended!");
    // Trigger any custom functionality when video ends
  };

  // Function to handle video play
  const onVideoPlay = () => {
    console.log("Video is playing!");
  };

  // Function to handle video pause
  const onVideoPause = (event: any) => {
    console.log("Video is paused!");
    event.target.stopVideo(); // Stops video to avoid showing related videos
  };

  return (
    <div className="">
      <YouTube
        videoId={videoId}
        opts={opts}
        onEnd={onVideoEnd}
        onPlay={onVideoPlay}
        onPause={onVideoPause}
      />
    </div>
  );
};

export default YouTubePlayerReact;
