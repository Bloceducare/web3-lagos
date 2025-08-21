import { Conference } from "../lib/api";
import {
  differenceInDays,
  addDays,
  parseISO,
  format,
  differenceInMinutes,
} from "date-fns";

export type ConferenceDay = "day1" | "day2" | "day3" | "day4" | "day5";

const parseDate = (dateString: string): Date => {
  if (dateString.includes("T")) {
    return parseISO(dateString);
  }

  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const getConferenceDays = (conference: Conference): ConferenceDay[] => {
  if (!conference) return ["day1"];

  const startDate = parseDate(conference.start_date);
  const endDate = parseDate(conference.end_date);

  const dayCount = differenceInDays(endDate, startDate) + 1;

  const days: ConferenceDay[] = [];
  for (let i = 1; i <= Math.min(dayCount, 5); i++) {
    days.push(`day${i}` as ConferenceDay);
  }

  return days.length > 0 ? days : ["day1"];
};

export const getConferenceDayFromDateTime = (
  conference: Conference,
  datetime: string
): ConferenceDay => {
  if (!conference) return "day1";

  const sessionDate = parseDate(datetime);
  const startDate = parseDate(conference.start_date);

  const daysDiff = differenceInDays(sessionDate, startDate);
  const dayNumber = Math.max(1, Math.min(daysDiff + 1, 5));

  return `day${dayNumber}` as ConferenceDay;
};

export const getConferenceDayDisplayName = (
  conference: Conference,
  day: ConferenceDay
): { shortName: string; fullName: string; date: string } => {
  if (!conference) {
    return { shortName: "Day 1", fullName: "Day 1", date: "" };
  }

  const dayNumber = parseInt(day.replace("day", ""));
  const startDate = parseDate(conference.start_date);
  const currentDate = addDays(startDate, dayNumber - 1);

  return {
    shortName: format(currentDate, "EEE").toLowerCase(),
    fullName: format(currentDate, "EEEE"),
    date: format(currentDate, "MMMM d"),
  };
};

export const formatSessionTime = (datetime: string): string => {
  const date = parseDate(datetime);
  return format(date, "h:mm a");
};

/**
 * Get session duration
 */
export const getSessionDuration = (
  startDateTime: string,
  endDateTime: string
): string => {
  const start = parseDate(startDateTime);
  const end = parseDate(endDateTime);
  const minutes = differenceInMinutes(end, start);
  return `${minutes} min`;
};

export const getConferenceDayDate = (
  conference: Conference,
  day: ConferenceDay
): Date => {
  if (!conference) return new Date();

  const dayNumber = parseInt(day.replace("day", ""));
  const startDate = parseDate(conference.start_date);

  return addDays(startDate, dayNumber - 1);
};
