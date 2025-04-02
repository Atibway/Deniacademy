"use client";

import React, { useEffect, useRef, useState, useCallback, Dispatch, SetStateAction } from "react";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import toast from "react-hot-toast";
import axios from "axios";
import { Chapter } from "@prisma/client";

interface VideoPlayerProps {
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked: boolean;
  title: string;
  chapter: Chapter;
  setIsVideoOpen:Dispatch<SetStateAction<boolean>>
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const VideoPlayer = ({
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  chapter,
  setIsVideoOpen
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const confetti = useConfettiStore();
  const videoId = chapter.videoUrl;
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [player, setPlayer] = useState<any>(null);

  // Handle video state changes
  const onPlayerStateChange = useCallback(async (event: any) => {
    if (event.data === window.YT.PlayerState.PAUSED) {
      console.log("Video is paused! Stopping...");
    }
    if (event.data === window.YT.PlayerState.ENDED) {
      console.log("Video has ended!");
      try {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: true,
        });

        if (!nextChapterId) {
          confetti.onOpen();
          toast.success("Course Completed 'Great Job 👍'");
        }
        setIsVideoOpen(false)
        router.refresh();

        if (nextChapterId) {
          setIsVideoOpen(false)
          toast.success("Chapter Completed 'Great Job 👍'");
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }

        console.log("onEnd --yes");
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        router.refresh();
      }
    }
  }, [courseId, chapterId, nextChapterId, confetti, router]);

  // Video is ready
  const onPlayerReady = useCallback(() => {
    console.log("YouTube Player is ready");
    setIsReady(true);
  }, []);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (!window.YT) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        document.body.appendChild(tag);

        window.onYouTubeIframeAPIReady = initializePlayer;
      } else {
        initializePlayer();
      }
    };

    const initializePlayer = () => {
      if (playerRef.current) {
        const ytPlayer = new window.YT.Player(playerRef.current, {
          videoId,
          width: "100%", // Fully responsive
          height: "auto",
          playerVars: {
            autoplay: 0, // Auto-play on load
            rel: 0, // Prevents related videos
            modestbranding: 1, // Minimal branding
            controls: 1, // Show controls
            showinfo: 0, // Hide video title/info
            disablekb: 1, // Disable keyboard shortcuts
            fs: 1, // Enable fullscreen
            playsinline: 1, // Inline play on mobile
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        });
        setPlayer(ytPlayer);
      }
    };

    loadYouTubeAPI();

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [videoId]);

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-sky-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is Locked</p>
        </div>
      )}
      {!isLocked && (
        <div>
             <div ref={playerRef} id="youtube-player" className="w-full aspect-video" />
        </div>
      )}
    </div>
  );
};
