import { useMemo } from "react";
import { useArchivedSessions } from "../../hooks/useScheduleData";

export const useArchiveVideos = () => {
  const { loading, error, archivedSessions } = useArchivedSessions();

  const years = useMemo(() => {
    if (!archivedSessions.length) return [];

    const yearSet = new Set<number>();
    archivedSessions.forEach((video) => {
      if (video.conference_year) {
        yearSet.add(video.conference_year);
      }
    });
    return Array.from(yearSet).sort((a, b) => b - a);
  }, [archivedSessions]);

  // Get unique halls for filter
  const halls = useMemo(() => {
    if (!archivedSessions.length) return [];

    const hallSet = new Set<string>();
    archivedSessions.forEach((video) => {
      if (video.hall_name) {
        hallSet.add(video.hall_name);
      }
    });
    return Array.from(hallSet).sort();
  }, [archivedSessions]);

  return {
    archiveVideos: archivedSessions,
    years,
    halls,
    loading,
    error,
  };
};

export default useArchiveVideos;
