import React from "react";
import { ScheduleItem } from "../../data/scheduleData";
import ArchiveVideoItem from "./ArchiveVideoItem";

interface ArchiveVideoListProps {
  videos: ScheduleItem[];
  selectedVideo: ScheduleItem | null;
  onVideoSelect: (video: ScheduleItem) => void;
  onClearFilters: () => void;
  className?: string;
}

const ArchiveVideoList: React.FC<ArchiveVideoListProps> = ({
  videos,
  selectedVideo,
  onVideoSelect,
  onClearFilters,
  className = "",
}) => {
  if (videos.length === 0) {
    return (
      <div className={`p-8 text-center ${className}`}>
        <p className="text-gray-500">No videos found matching your criteria.</p>
        <button
          onClick={onClearFilters}
          className="text-blue-600 hover:text-blue-700 text-sm mt-2"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className={`max-h-[600px] overflow-y-auto ${className}`}>
      <div className="divide-y divide-gray-200">
        {videos.map((video: ScheduleItem) => (
          <ArchiveVideoItem
            key={video.id}
            video={video}
            isSelected={selectedVideo?.id === video.id}
            onSelect={onVideoSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default ArchiveVideoList;
