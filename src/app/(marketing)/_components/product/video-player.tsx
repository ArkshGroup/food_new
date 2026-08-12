"use client";

import { Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function YoutubePlayer({ videoUrl }: { videoUrl: string }) {
  // --- Convert watch/shorts URL into embed URL ---
  const getEmbedUrl = (url: string) => {
    try {
      const urlObj = new URL(url);

      // Normal YouTube video -> watch?v=ID
      if (
        urlObj.hostname.includes("youtube.com") ||
        urlObj.hostname.includes("youtu.be")
      ) {
        if (urlObj.pathname === "/watch") {
          return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
        }

        // Shorts -> /shorts/ID
        if (urlObj.pathname.startsWith("/shorts/")) {
          const videoId = urlObj.pathname.split("/")[2];
          return `https://www.youtube.com/embed/${videoId}`;
        }

        // Already embed
        if (urlObj.pathname.startsWith("/embed/")) {
          return url;
        }

        return url;
      }

      // Not YouTube — return raw URL (video file, etc.)
      return url;
    } catch {
      return url;
    }
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const isYouTube = embedUrl.includes("youtube.com/embed");

  const handleFullscreen = () => {
    const iframe = document.getElementById(
      "youtube-player"
    ) as HTMLIFrameElement;
    iframe?.requestFullscreen?.();
  };

  return (
    <div className="relative w-full h-[56vh] md:h-full border bg-white flex items-center justify-center">
      {isYouTube ? (
        <iframe
          id="youtube-player"
          className="w-full h-full object-cover bg-white object-center"
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <video
          id="custom-video"
          className="w-full h-full object-contain bg-white object-center"
          src={embedUrl}
          controls
          preload="none"
          playsInline
        />
      )}
    </div>
  );
}
