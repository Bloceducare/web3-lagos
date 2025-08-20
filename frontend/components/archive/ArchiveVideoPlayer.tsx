import React from "react";
import { ScheduleItem } from "../../data/scheduleData";

interface ArchiveVideoPlayerProps {
  selectedVideo: ScheduleItem;
  className?: string;
}

const ArchiveVideoPlayer: React.FC<ArchiveVideoPlayerProps> = ({
  selectedVideo,
  className = "",
}) => {
  return (
    <div className={className}>
      {/* Video Player */}
      <div className="bg-black rounded-lg overflow-hidden shadow-lg mb-4">
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
            width="100%"
            height="100%"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
            title={selectedVideo.topic}
          ></iframe>
        </div>
      </div>

      {/* Video Info */}
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            {selectedVideo.year}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {selectedVideo.day}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {selectedVideo.hall}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {selectedVideo.duration}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {selectedVideo.topic}
        </h1>

        <p className="text-blue-600 font-medium mb-3">
          Speaker: {selectedVideo.speaker || "Not specified"}
        </p>

        <p className="text-gray-600 leading-relaxed">
          {selectedVideo.description || "No description available"}
        </p>
      </div>
    </div>
  );
};

export default ArchiveVideoPlayer;
