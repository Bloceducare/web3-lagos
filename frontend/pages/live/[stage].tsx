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
} from "../../utils/conferenceUtils";

const LiveStage = () => {
  const router = useRouter();
  const { stage } = router.query;
  const [selectedDay, setSelectedDay] = useState<ConferenceDay>("day1");

  // Fetch schedule data from API
  const { loading, error, conference, halls, sessions } = useScheduleData();

  // Navigate to archive page with specific video
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

  const findHallForStage = (stageName: string, halls: any[]) => {
    let hall = halls.find((h) => h.slug === stageName);
    if (hall) return hall;
    return null;
  };

  const stageHall = findHallForStage(stage as string, halls);

  if (!stageHall) {
    return (
      <LiveLayout>
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">Stage not found</p>
              <p className="text-gray-600">No hall found for stage: {stage}</p>
              <button
                onClick={() => router.push("/live")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Go to Main Stage
              </button>
            </div>
          </div>
        </div>
      </LiveLayout>
    );
  }

  const getDayFromDateTime = (startDateTime: string): ConferenceDay => {
    if (!conference) return "day1";

    return getConferenceDayFromDateTime(conference, startDateTime);
  };

  const stageSessions = sessions
    .filter((session) => {
      const sessionHallMatch =
        session.hall_slug === stage || // Direct slug match
        session.hall === stageHall?.id || // Hall ID match
        (session.hall_name && // Generate slug from hall name and match
          session.hall_name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "") === stage);

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
      [stageHall.slug]: {
        title: stageHall.name,
        items: stageSessions.map((session) => ({
          id: session.id.toString(),
          time: new Date(session.start_datetime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          topic: session.topic,
          speaker: session.speaker,
          youtube_id: session.youtube_id,
          description: session.description,
          hall: session.hall_name,
          day: selectedDay,
          year: session.conference_year,
          duration: `${Math.round(
            (new Date(session.end_datetime).getTime() -
              new Date(session.start_datetime).getTime()) /
              (1000 * 60)
          )} minutes`,
          speakerBio: session.speaker_bio,
          speakerImage: session.speaker_image,
          type: session.type,
        })),
      },
    },
  };

  const hallSchedule = currentSchedule.halls[stageHall.slug];

  // If no schedule exists for this hall on this day, show a message
  if (!hallSchedule || !hallSchedule.items || hallSchedule.items.length === 0) {
    return (
      <>
        <LiveMetadata
          stageTitle={stageHall.name}
          selectedDay={selectedDay}
          days={days}
        />
        <LiveLayout>
          <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* YouTube Player */}
              <LiveVideoPlayer
                embedUrl={stageHall.embed_url}
                stageTitle={stageHall.name}
                className="lg:col-span-2"
              />

              {/* No Schedule Message */}
              <ScheduleSidebar
                days={days}
                selectedDay={selectedDay}
                onDaySelect={setSelectedDay}
                currentSchedule={currentSchedule}
                stageTitle={stageHall.name}
                hallSchedule={null}
                onTalkClick={handleTalkClick}
                className="lg:col-span-1"
              />
            </div>
          </div>
        </LiveLayout>
      </>
    );
  }

  return (
    <>
      <LiveMetadata
        stageTitle={stageHall.name}
        selectedDay={selectedDay}
        days={days}
      />
      <LiveLayout>
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* YouTube Player */}
            <LiveVideoPlayer
              embedUrl={stageHall.embed_url}
              stageTitle={stageHall.name}
              className="lg:col-span-2 h-fit"
            />

            {/* Schedule Sidebar */}
            <ScheduleSidebar
              days={days}
              selectedDay={selectedDay}
              onDaySelect={setSelectedDay}
              currentSchedule={currentSchedule}
              stageTitle={stageHall.name}
              hallSchedule={hallSchedule}
              onTalkClick={handleTalkClick}
              className="lg:col-span-1"
            />
          </div>
        </div>
      </LiveLayout>
    </>
  );
};

export default LiveStage;
