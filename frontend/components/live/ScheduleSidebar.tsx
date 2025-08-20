import React from "react";
import DaySelector, { Day } from "./DaySelector";
import ScheduleItemComponent from "./ScheduleItem";
import { ScheduleItem, DaySchedule } from "../../data/scheduleData";
import { ConferenceDay } from "../../utils/conferenceUtils";

interface ScheduleSidebarProps {
  days: Day[];
  selectedDay: ConferenceDay;
  onDaySelect: (day: ConferenceDay) => void;
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
  // Handle empty schedule - but still show day selector
  if (!hallSchedule || !hallSchedule.items || hallSchedule.items.length === 0) {
    return (
      <div
        className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
      >
        <DaySelector
          days={days}
          selectedDay={selectedDay}
          onDaySelect={onDaySelect}
        />

        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {stageTitle} Schedule
          </h3>
          <p className="text-gray-600 text-center py-8">
            No sessions scheduled for {stageTitle} on{" "}
            {days.find((d) => d.key === selectedDay)?.date}
          </p>
        </div>
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
