import { useMemo } from "react";
import { Conference } from "../../lib/api";
import {
  getConferenceDays,
  getConferenceDayDisplayName,
} from "../../utils/conferenceUtils";
import { Day } from "./DaySelector";

export const useDaysConfig = (conference: Conference | null): Day[] => {
  return useMemo(() => {
    if (!conference) {
      // Fallback to default days if no conference data
      return [
        { key: "day1" as const, label: "Day 1", date: "TBD" },
        { key: "day2" as const, label: "Day 2", date: "TBD" },
        { key: "day3" as const, label: "Day 3", date: "TBD" },
      ];
    }

    const conferenceDays = getConferenceDays(conference);

    return conferenceDays.map((day) => {
      const displayInfo = getConferenceDayDisplayName(conference, day);

      return {
        key: day,
        label: `Day ${day.replace("day", "")}`,
        date: displayInfo.date,
      };
    });
  }, [conference]);
};

export default useDaysConfig;
