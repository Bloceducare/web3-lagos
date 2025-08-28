"use client";
import React, { useState } from "react";
import { useScheduleData } from "../hooks/useScheduleData";
import { useDaysConfig } from "./live/useDaysConfig";
import {
  getConferenceDayFromDateTime,
  ConferenceDay,
  formatSessionTime,
  getSessionDuration,
} from "../utils/conferenceUtils";
import { Calendar, Clock, User, MapPin } from "lucide-react";
import ClientOnly from "./ClientOnly";

const SchedulePreviewContent = () => {
  const [selectedDay, setSelectedDay] = useState<ConferenceDay>("day1");
  const { loading, error, conference, halls, sessions } = useScheduleData();
  const days = useDaysConfig(conference);

  // Show loading state
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-5 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-[32px] md:text-[40px] font-medium text-[#188BE0] mb-4">
              Conference Schedule
            </h2>
            <p className="text-[#1E1E1E] text-lg md:text-xl max-w-3xl mx-auto">
              Explore the exciting lineup of speakers, panels, and workshops across three days of blockchain innovation and learning.
            </p>
          </div>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading schedule...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state or when no data is available
  if ((error || !conference) && !loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-2xl mx-auto px-5 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-[32px] md:text-[40px] font-medium text-[#188BE0] mb-4">
              Conference Schedule
            </h2>
            <p className="text-[#1E1E1E] text-lg md:text-xl max-w-3xl mx-auto">
              Explore the exciting lineup of speakers, panels, and workshops across three days of blockchain innovation and learning.
            </p>
          </div>
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load schedule data</p>
            <p className="text-gray-600">{error}</p>
            <p className="text-gray-500 mt-4">
              Please check back later or visit the live page for the most up-to-date schedule.
            </p>
            <a
              href="/live"
              className="inline-flex items-center px-8 py-3 bg-[#188BE0] text-white rounded-md hover:bg-[#31a3fa] transition-colors font-medium mt-4"
            >
              Go to Live Stream
            </a>
          </div>
        </div>
      </section>
    );
  }

  const mainStageHall =
    halls.find((hall) => hall.name.toLowerCase().includes("main")) || halls[0] || null;

  const getDayFromDateTime = (startDateTime: string): ConferenceDay => {
    if (!conference) return "day1";
    return getConferenceDayFromDateTime(conference, startDateTime);
  };

  // Filter sessions for the main stage and selected day
  const mainStageSessions = sessions
    .filter((session) => {
      if (!mainStageHall) return false;
      const sessionHallMatch = session.hall === mainStageHall.id;
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-5 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[40px] font-medium text-[#188BE0] mb-4">
            Conference Schedule
          </h2>
          <p className="text-[#1E1E1E] text-lg md:text-xl max-w-3xl mx-auto">
            Explore the exciting lineup of speakers, panels, and workshops across three days of blockchain innovation and learning.
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-lg p-2 shadow-md">
            {days.map((day) => (
              <button
                key={day.key}
                onClick={() => setSelectedDay(day.key as ConferenceDay)}
                className={`px-6 py-3 rounded-md font-medium transition-colors ${
                  selectedDay === day.key
                    ? "bg-[#188BE0] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Day {selectedDay.replace("day", "")} - {mainStageHall?.name || "Main Stage"}
                </h3>
                <p className="text-gray-600 flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  {getSelectedDayDate().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <a
                href="/live"
                className="px-6 py-2 bg-[#188BE0] text-white rounded-md hover:bg-[#31a3fa] transition-colors"
              >
                View Live
              </a>
            </div>
          </div>

          <div className="p-6">
            {!mainStageHall ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No hall information available
                </p>
                <p className="text-gray-500 mt-2">
                  Please check back later for schedule updates.
                </p>
              </div>
            ) : mainStageSessions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No sessions scheduled for {mainStageHall.name} on{" "}
                  {days.find((d) => d.key === selectedDay)?.date}
                </p>
                <p className="text-gray-500 mt-2">
                  Check back later for updates or view other days.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {mainStageSessions.map((session, index) => (
                  <div
                    key={session.id || index}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatSessionTime(session.start_datetime)}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            {session.hall_name || mainStageHall?.name}
                          </div>
                        </div>
                        
                        <h4 className="text-xl font-semibold text-gray-900 mb-2">
                          {session.topic || "Untitled Session"}
                        </h4>
                        
                        {session.speaker && (
                          <div className="flex items-center text-gray-700 mb-3">
                            <User className="w-4 h-4 mr-2" />
                            <span className="font-medium">{session.speaker}</span>
                          </div>
                        )}
                        
                        {session.description && (
                          <p className="text-gray-600 mb-3 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                            {session.description}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>
                            Duration: {getSessionDuration(session.start_datetime, session.end_datetime)}
                          </span>
                          {session.type && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {session.type}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Want to see the full schedule and join the live stream?
          </p>
          <a
            href="/live"
            className="inline-flex items-center px-8 py-3 bg-[#E0182C] text-white rounded-md hover:bg-[#ff3246] transition-colors font-medium"
          >
            Go to Live Stream
          </a>
        </div>
      </div>
    </section>
  );
};

const SchedulePreview = () => {
  return (
    <ClientOnly
      fallback={
        <section className="py-16 bg-gray-50">
          <div className="max-w-screen-2xl mx-auto px-5 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-[32px] md:text-[40px] font-medium text-[#188BE0] mb-4">
                Conference Schedule
              </h2>
              <p className="text-[#1E1E1E] text-lg md:text-xl max-w-3xl mx-auto">
                Explore the exciting lineup of speakers, panels, and workshops across three days of blockchain innovation and learning.
              </p>
            </div>
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading schedule...</p>
            </div>
          </div>
        </section>
      }
    >
      <SchedulePreviewContent />
    </ClientOnly>
  );
};

export default SchedulePreview;
