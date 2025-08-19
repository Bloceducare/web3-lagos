import { Day } from "./DaySelector";

export const useDaysConfig = (): Day[] => {
  return [
    { key: "thur" as const, label: "Day 1", date: "28th August" },
    { key: "fri" as const, label: "Day 2", date: "29th August" },
    { key: "sat" as const, label: "Day 3", date: "30th August" },
  ];
};

export default useDaysConfig;
