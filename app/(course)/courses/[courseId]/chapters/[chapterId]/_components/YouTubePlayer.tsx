"use client";

import { Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface YouTubePlayerProps {
  videoId: string;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  const onPlayerReady = useCallback(() => {
    console.log("YouTube Player is ready");
    setIsReady(true);
  }, []);

  useEffect(() => {
    const initializePlayer = () => {
      if (playerRef.current && !player) {
        console.log("Initializing YouTube Player");
        const ytPlayer = new window.YT.Player(playerRef.current, {
          videoId,
          width: "100%",
          height: "auto",
          playerVars: {
            autoplay: 1,
            rel: 0,
            modestbranding: 1,
            controls: 1,
            showinfo: 0,
            disablekb: 1,
            fs: 1,
            playsinline: 1,
          },
          events: {
            onReady: onPlayerReady,
          },
        });
        setPlayer(ytPlayer);
      }
    };

    const loadYouTubeAPI = () => {
      if (!window.YT) {
        console.log("Loading YouTube IFrame API");
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        document.body.appendChild(tag);

        window.onYouTubeIframeAPIReady = initializePlayer;
      } else {
        initializePlayer();
      }
    };

    loadYouTubeAPI();

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [videoId, onPlayerReady, player]); // ✅ Added missing dependencies

  return (
    <div className="relative aspect-video">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      <div className="flex justify-center items-center w-full max-w-2xl mx-auto">
        <div ref={playerRef} id="youtube-player" className="w-full aspect-video" />
      </div>
    </div>
  );
};

export default YouTubePlayer;
