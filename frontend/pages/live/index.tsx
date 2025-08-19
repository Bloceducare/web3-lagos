import React, { useState } from "react";
import { useRouter } from "next/router";
import LiveLayout from "./LiveLayout";
import {
  scheduleData,
  ScheduleItem,
  generateArchiveQueryParams,
} from "../../data/scheduleData";
import {
  LiveVideoPlayer,
  ScheduleSidebar,
  LiveMetadata,
  useDaysConfig,
} from "../../components/live";

const Live = () => {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState<"thur" | "fri" | "sat">(
    "thur"
  );

  // Navigate to archive page with specific video and additional context
  const handleTalkClick = (item: ScheduleItem) => {
    if (item.youtubeId) {
      const queryString = generateArchiveQueryParams(item);
      router.push(`/archive?${queryString}`);
    }
  };

  const days = useDaysConfig();
  const currentSchedule = scheduleData.days[selectedDay];
  const currentHall = currentSchedule.halls.hall1;

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
              embedUrl="https://www.youtube.com/embed/EbcGAXOTWbA"
              stageTitle="Main Stage"
              className="lg:col-span-2"
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
