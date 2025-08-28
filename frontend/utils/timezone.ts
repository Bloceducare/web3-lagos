import { format as formatTz, toZonedTime } from "date-fns-tz";
import { parseISO, isValid } from "date-fns";

const LAGOS_TIMEZONE = "Africa/Lagos";

export const formatInTimezone = (
  datetime: string,
  formatString: string = "h:mm a"
): string => {
  try {
    const date = parseISO(datetime);
    if (!isValid(date)) {
      console.warn("Invalid date string provided:", datetime);
      return datetime;
    }

    // Convert to Lagos timezone and format
    const zonedDate = toZonedTime(date, LAGOS_TIMEZONE);
    return formatTz(zonedDate, formatString, { timeZone: LAGOS_TIMEZONE });
  } catch (error) {
    console.error("Error formatting date in timezone:", error);
    return datetime;
  }
};
