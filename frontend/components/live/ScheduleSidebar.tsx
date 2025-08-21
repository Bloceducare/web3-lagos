import React from "react";
import DaySelector, { Day } from "./DaySelector";
import ScheduleItemComponent from "./ScheduleItem";
import { ScheduleItem, DaySchedule } from "../../data/scheduleData";

interface ScheduleSidebarProps {
  days: Day[];
  selectedDay: "thur" | "fri" | "sat";
  onDaySelect: (day: "thur" | "fri" | "sat") => void;
  currentSchedule: DaySchedule;
  stageTitle: string;
  hallSchedule: { title: string; items: ScheduleItem[] } | null;
  onTalkClick: (item: ScheduleItem) => void;
  className?: string;
}

const ScheduleSidebar: React.FC<ScheduleSidebarProps> = ({
  days,
  selectedDay,
  onDaySelect,
  currentSchedule,
  stageTitle,
  hallSchedule,
  onTalkClick,
  className = "",
}) => {
  // Handle empty schedule
  if (!hallSchedule || !hallSchedule.items || hallSchedule.items.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {stageTitle} Schedule
        </h3>
        <p className="text-gray-600 text-center py-8">
          No sessions scheduled for {stageTitle} on{" "}
          {days.find((d) => d.key === selectedDay)?.date}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      <DaySelector
        days={days}
        selectedDay={selectedDay}
        onDaySelect={onDaySelect}
      />

      <div className="max-h-[600px] overflow-y-auto">
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {currentSchedule.title} - {stageTitle}
          </h3>

          <div className="space-y-4">
            {hallSchedule.items.map((item: ScheduleItem, index: number) => (
              <ScheduleItemComponent
                key={index}
                item={item}
                onItemClick={onTalkClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSidebar;
