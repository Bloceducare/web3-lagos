import React, { useState } from "react";
import { useRouter } from "next/router";
import LiveLayout from "./LiveLayout";
import { useScheduleData } from "../../hooks/useScheduleData";
import {
  LiveVideoPlayer,
  ScheduleSidebar,
  LiveMetadata,
  useDaysConfig,
} from "../../components/live";
import {
  getConferenceDayFromDateTime,
  ConferenceDay,
  formatSessionTime,
  getSessionDuration,
} from "../../utils/conferenceUtils";
import {
  mapSessionToScheduleItem,
  resolveMainStageHall,
} from "../../utils/liveHallUtils";

const Live = () => {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<ConferenceDay>("day1");

  const { loading, error, conference, halls, sessions } = useScheduleData();

  const handleTalkClick = (item: any) => {
    const youtubeId = item.youtubeId || item.youtube_id;
    if (youtubeId) {
      const params = new URLSearchParams();
      params.set("video", youtubeId);
      params.set("id", item.id.toString());
      router.push(`/archive?${params.toString()}`);
    }
  };

  const days = useDaysConfig(conference);

  if (loading) {
    return (
      <LiveLayout>
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading schedule...</p>
            </div>
          </div>
        </div>
      </LiveLayout>
    );
  }

  if (error || !conference) {
    return (
      <LiveLayout>
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">Failed to load schedule data</p>
              <p className="text-gray-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </LiveLayout>
    );
  }

  const mainStageHall = resolveMainStageHall(halls);

  const getDayFromDateTime = (startDateTime: string): ConferenceDay => {
    if (!conference) return "day1";
    return getConferenceDayFromDateTime(conference, startDateTime);
  };

  const mainStageSessions = sessions
    .filter((session) => {
      const sessionHallMatch = session.hall === mainStageHall?.id;
      const sessionDay = getDayFromDateTime(session.start_datetime);
      return sessionHallMatch && sessionDay === selectedDay;
    })
    .sort(
      (a, b) =>
        new Date(a.start_datetime).getTime() -
        new Date(b.start_datetime).getTime()
    );

  const getSelectedDayDate = (): Date => {
    if (!conference) return new Date();
    const conferenceStartDate = new Date(conference.start_date);
    const dayOffset = parseInt(selectedDay.replace("day", "")) - 1;
    const selectedDate = new Date(conferenceStartDate);
    selectedDate.setDate(conferenceStartDate.getDate() + dayOffset);
    return selectedDate;
  };

  const currentSchedule = {
    title: `Day ${selectedDay.replace("day", "")}`,
    date: getSelectedDayDate().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    }),
    halls: {
      hall1: {
        title: mainStageHall?.name || "Main Stage",
        items: mainStageSessions.map((session) =>
          mapSessionToScheduleItem(session, {
            time: formatSessionTime(session.start_datetime),
            day: selectedDay,
            duration: getSessionDuration(
              session.start_datetime,
              session.end_datetime
            ),
          })
        ),
      },
    },
  };
  const currentHall = currentSchedule?.halls?.hall1;

  return (
    <>
      <LiveMetadata
        stageTitle={mainStageHall?.name || "Main Stage"}
        selectedDay={selectedDay}
        days={days}
        conferenceYear={conference.year}
      />
      <LiveLayout halls={halls}>
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <LiveVideoPlayer
              embedUrl={mainStageHall?.embed_url}
              isLive={Boolean(mainStageHall?.is_live)}
              stageTitle={mainStageHall?.name || "Main Stage"}
              conferenceYear={conference.year}
              className="lg:col-span-2 h-fit"
            />

            <ScheduleSidebar
              days={days}
              selectedDay={selectedDay}
              onDaySelect={setSelectedDay}
              currentSchedule={currentSchedule}
              stageTitle={currentHall.title}
              hallSchedule={currentHall}
              onTalkClick={handleTalkClick}
              className="lg:col-span-1"
            />
          </div>
        </div>
      </LiveLayout>
    </>
  );
};

export default Live;
