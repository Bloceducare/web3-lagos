import React from "react";
import { ScheduleItem as ScheduleItemType } from "../../data/scheduleData";

interface ScheduleItemProps {
  item: ScheduleItemType;
  onItemClick: (item: ScheduleItemType) => void;
  className?: string;
}

const ScheduleItemComponent: React.FC<ScheduleItemProps> = ({
  item,
  onItemClick,
  className = "",
}) => {
  return (
    <div
      onClick={() => onItemClick(item)}
      className={`border-l-4 border-blue-500 pl-4 pb-4 transition-all duration-200 ${
        item.youtubeId
          ? "cursor-pointer hover:bg-blue-50 hover:border-l-6 hover:shadow-sm"
          : ""
      } ${className}`}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="text-sm text-blue-600 font-medium">
              {item.time}
              {item.duration && (
                <span className="text-gray-500 ml-2">({item.duration})</span>
              )}
            </div>
            <span className="text-xs text-gray-400 font-mono">#{item.id}</span>
          </div>
          {item.youtubeId && (
            <span className="text-xs text-blue-500 font-medium">
              ▶ Watch Replay
            </span>
          )}
        </div>

        <h4 className="text-sm font-semibold text-gray-900 mb-1 leading-tight">
          {item.topic}
        </h4>

        {item.speaker && (
          <p className="text-xs text-gray-600">Speaker: {item.speaker}</p>
        )}
      </div>
    </div>
  );
};

export default ScheduleItemComponent;
