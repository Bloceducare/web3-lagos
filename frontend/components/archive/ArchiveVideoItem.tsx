import React from "react";
import { ScheduleItem } from "../../lib/api";

interface ArchiveVideoItemProps {
  video: ScheduleItem;
  isSelected: boolean;
  onSelect: (video: ScheduleItem) => void;
  className?: string;
}

const ArchiveVideoItem: React.FC<ArchiveVideoItemProps> = ({
  video,
  isSelected,
  onSelect,
  className = "",
}) => {
  return (
    <div
      onClick={() => onSelect(video)}
      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
        isSelected ? "bg-blue-50 border-r-4 border-blue-500" : ""
      } ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
            {video.topic}
          </h4>
          <p className="text-xs text-blue-600 mb-1">
            {video.speaker || "Speaker TBD"}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              {video.conference_year}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{video.hall_name}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">
              {new Date(video.start_datetime).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveVideoItem;
