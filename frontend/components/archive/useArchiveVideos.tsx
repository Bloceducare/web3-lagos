import { useMemo } from "react";
import {
  getArchiveVideos,
  ScheduleItem,
  getConferenceYears,
  conferenceData,
  ConferenceEdition,
  DaySchedule,
  HallSchedule,
} from "../../data/scheduleData";

export const useArchiveVideos = () => {
  // Get all archived videos from all years
  const archiveVideos = useMemo(() => {
    return getArchiveVideos();
  }, []);

  // Get unique years for filter (sorted newest first)
  const years = useMemo(() => {
    return getConferenceYears();
  }, []);

  // Get unique halls for filter
  const halls = useMemo(() => {
    const hallSet = new Set<string>();

    Object.values(conferenceData).forEach((yearData: ConferenceEdition) => {
      Object.values(yearData.days).forEach((day: DaySchedule) => {
        Object.values(day.halls).forEach((hall: HallSchedule) => {
          if (hall.items.some((item: ScheduleItem) => item.youtubeId)) {
            hallSet.add(hall.title);
          }
        });
      });
    });

    return Array.from(hallSet).sort();
  }, []);

  return {
    archiveVideos,
    years,
    halls,
  };
};

export default useArchiveVideos;
