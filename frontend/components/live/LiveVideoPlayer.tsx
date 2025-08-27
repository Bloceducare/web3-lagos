import React from "react";

interface LiveVideoPlayerProps {
  embedUrl: string;
  stageTitle: string;
  className?: string;
}

const LiveVideoPlayer: React.FC<LiveVideoPlayerProps> = ({
  embedUrl,
  stageTitle,
  className = "",
}) => {
  return (
    <div
      className={`bg-black rounded-lg overflow-hidden shadow-lg ${className}`}
    >
      <div className="aspect-video">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          title={`${stageTitle} Live Stream`}
        ></iframe>
      </div>
      <div className="p-4 bg-gray-900 text-white">
        <h2 className="text-xl font-bold">
          Web3 Lagos Conference 2025 - {stageTitle}
        </h2>
        <p className="text-gray-300 text-sm mt-1">Live Stream</p>
      </div>
    </div>
  );
};

export default LiveVideoPlayer;
