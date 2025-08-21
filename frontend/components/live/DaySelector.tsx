import React from "react";

export interface Day {
  key: "thur" | "fri" | "sat";
  label: string;
  date: string;
}

interface DaySelectorProps {
  days: Day[];
  selectedDay: "thur" | "fri" | "sat";
  onDaySelect: (day: "thur" | "fri" | "sat") => void;
  className?: string;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  days,
  selectedDay,
  onDaySelect,
  className = "",
}) => {
  return (
    <div className={`border-b border-gray-200 ${className}`}>
      <div className="flex">
        {days.map((day) => (
          <button
            key={day.key}
            onClick={() => onDaySelect(day.key)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              selectedDay === day.key
                ? "bg-blue-600 text-white"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            <div>{day.label}</div>
            <div className="text-xs opacity-75">{day.date}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaySelector;
