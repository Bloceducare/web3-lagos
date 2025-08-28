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

const Live = () => {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<ConferenceDay>("day1");

  const { loading, error, conference, halls, sessions } = useScheduleData();

  const handleTalkClick = (item: any) => {
    if (item.youtube_id) {
      const params = new URLSearchParams();
      params.set("video", item.youtube_id);
      params.set("id", item.id.toString());
      router.push(`/archive?${params.toString()}`);
    }
  };

  const days = useDaysConfig(conference);

  // Show loading state
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

  // Show error state
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

  const mainStageHall =
    halls.find((hall) => hall.name.toLowerCase().includes("main")) || halls[3];

  const getDayFromDateTime = (startDateTime: string): ConferenceDay => {
    if (!conference) return "day1";
    return getConferenceDayFromDateTime(conference, startDateTime);
  };

  // Filter sessions for the main stage and selected day
  const mainStageSessions = sessions
    .filter((session) => {
      const sessionHallMatch = session.hall === mainStageHall?.id;
      const sessionDay = getDayFromDateTime(session.start_datetime);
      const dayMatch = sessionDay === selectedDay;

      return sessionHallMatch && dayMatch;
    })
    .sort((a, b) => {
      return (
        new Date(a.start_datetime).getTime() -
        new Date(b.start_datetime).getTime()
      );
    });

  // Get the actual date for the selected day
  const getSelectedDayDate = (): Date => {
    if (!conference) return new Date();

    const conferenceStartDate = new Date(conference.start_date);
    const dayOffset = parseInt(selectedDay.replace("day", "")) - 1; // day1 = 0, day2 = 1, etc.

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
        items: mainStageSessions.map((session) => ({
          id: session.id.toString(),
          time: formatSessionTime(session.start_datetime),
          topic: session.topic,
          speaker: session.speaker,
          youtube_id: session.youtube_id,
          description: session.description,
          hall: session.hall_name,
          day: selectedDay,
          year: session.conference_year,
          duration: getSessionDuration(
            session.start_datetime,
            session.end_datetime
          ),
          speakerBio: session.speaker_bio,
          speakerImage: session.speaker_image,
          type: session.type,
        })),
      },
    },
  };
  const currentHall = currentSchedule?.halls?.hall1;

  return (
    <>
      <LiveMetadata
        stageTitle="Main Stage"
        selectedDay={selectedDay}
        days={days}
      />
      <LiveLayout>
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* YouTube Player */}
            <LiveVideoPlayer
              embedUrl={mainStageHall?.embed_url}
              stageTitle={mainStageHall?.name || "Main Stage"}
              className="lg:col-span-2 h-fit"
            />

            {/* Schedule Sidebar */}
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
