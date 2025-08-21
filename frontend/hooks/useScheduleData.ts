import { useState, useEffect } from "react";
import { apiClient, ScheduleItem, Conference, Hall } from "../lib/api";

export const useScheduleData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [conference, setConference] = useState<Conference | null>(null);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [sessions, setSessions] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { conference, halls, sessions } =
          await apiClient.getCurrentConference();

        setConference(conference);
        setHalls(halls);
        setSessions(sessions);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch schedule data"
        );
        console.error("Schedule data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Refetch data
  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);

      const { conference, halls, sessions } =
        await apiClient.getCurrentConference();

      setConference(conference);
      setHalls(halls);
      setSessions(sessions);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch schedule data"
      );
      console.error("Schedule data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    conference,
    halls,
    sessions,
    refetch,
  };
};

export const useArchivedSessions = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [archivedSessions, setArchivedSessions] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    const fetchArchivedSessions = async () => {
      try {
        setLoading(true);
        setError(null);

        const sessions = await apiClient.getArchivedSessions();

        if (!Array.isArray(sessions)) {
          console.error("Sessions is not an array:", sessions);
          setError("Invalid response format from server");
          setArchivedSessions([]);
          return;
        }

        setArchivedSessions(sessions);
      } catch (err) {
        console.error("Error fetching archived sessions:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch archived sessions"
        );
        setArchivedSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArchivedSessions();
  }, []);

  return {
    loading,
    error,
    archivedSessions,
    refetch: async () => {
      const sessions = await apiClient.getArchivedSessions();
      setArchivedSessions(sessions);
    },
  };
};
