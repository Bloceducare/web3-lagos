import React from "react";

interface LiveVideoPlayerProps {
  embedUrl?: string | null;
  stageTitle: string;
  conferenceYear?: number | string;
  isLive?: boolean;
  className?: string;
}

const LiveVideoPlayer: React.FC<LiveVideoPlayerProps> = ({
  embedUrl,
  stageTitle,
  conferenceYear,
  isLive = false,
  className = "",
}) => {
  const yearLabel = conferenceYear ?? new Date().getFullYear();
  const showStream = Boolean(isLive && embedUrl);

  return (
    <div
      className={`bg-black rounded-lg overflow-hidden shadow-lg ${className}`}
    >
      <div className="aspect-video relative">
        {showStream ? (
          <iframe
            src={embedUrl as string}
            width="100%"
            height="100%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            title={`${stageTitle} Live Stream`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gray-300">
              <span
                className={`h-2 w-2 rounded-full ${
                  isLive ? "bg-amber-400" : "bg-gray-500"
                }`}
              />
              {isLive ? "Stream URL missing" : "Offline"}
            </div>
            <h3 className="text-2xl font-bold mb-2">{stageTitle}</h3>
            <p className="text-gray-400 text-sm max-w-md">
              {isLive
                ? "This stage is marked live, but no embed URL is configured yet."
                : "The livestream is not active right now. Check the schedule sidebar for upcoming sessions."}
            </p>
          </div>
        )}
      </div>
      <div className="p-4 bg-gray-900 text-white flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">
            Web3 Lagos Conference {yearLabel} — {stageTitle}
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            {showStream ? "Live Stream" : "Stream offline"}
          </p>
        </div>
        {showStream && (
          <span className="shrink-0 inline-flex items-center gap-2 rounded-full bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wide px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Live
          </span>
        )}
      </div>
    </div>
  );
};

export default LiveVideoPlayer;
