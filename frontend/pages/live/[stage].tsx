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
  useStageConfig,
  useDaysConfig,
} from "../../components/live";

const LiveStage = () => {
  const router = useRouter();
  const { stage } = router.query;
  const [selectedDay, setSelectedDay] = useState<"thur" | "fri" | "sat">(
    "thur"
  );

  // Stage configuration
  const stageConfig = useStageConfig(stage as string);

  // Navigate to archive page with specific video and additional context
  const handleTalkClick = (item: ScheduleItem) => {
    if (item.youtubeId) {
      // Use the utility function to generate comprehensive query parameters
      const queryString = generateArchiveQueryParams(item);
      router.push(`/archive?${queryString}`);
    }
  };

  const days = useDaysConfig();

  const currentSchedule = scheduleData.days[selectedDay];
  const hallSchedule = currentSchedule.halls[stageConfig.hallKey];

  // If no schedule exists for this hall on this day, show a message
  if (!hallSchedule || !hallSchedule.items || hallSchedule.items.length === 0) {
    return (
      <>
        <LiveMetadata
          stageTitle={stageConfig.title}
          selectedDay={selectedDay}
          days={days}
        />
        <LiveLayout>
          <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* YouTube Player */}
              <LiveVideoPlayer
                embedUrl={stageConfig.embedUrl}
                stageTitle={stageConfig.title}
                className="lg:col-span-2"
              />

              {/* No Schedule Message */}
              <ScheduleSidebar
                days={days}
                selectedDay={selectedDay}
                onDaySelect={setSelectedDay}
                currentSchedule={currentSchedule}
                stageTitle={stageConfig.title}
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
        stageTitle={stageConfig.title}
        selectedDay={selectedDay}
        days={days}
      />
      <LiveLayout>
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* YouTube Player */}
            <LiveVideoPlayer
              embedUrl={stageConfig.embedUrl}
              stageTitle={stageConfig.title}
              className="lg:col-span-2"
            />

            {/* Schedule Sidebar */}
            <ScheduleSidebar
              days={days}
              selectedDay={selectedDay}
              onDaySelect={setSelectedDay}
              currentSchedule={currentSchedule}
              stageTitle={stageConfig.title}
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
