import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Header from "../../components/live/Layout/Header";
import Footer from "../../components/live/Layout/Footer";
import { ScheduleItem } from "../../lib/api";
import {
  ArchiveVideoPlayer,
  ArchiveSidebar,
  ArchiveMetadata,
  LoadingSpinner,
  useArchiveVideos,
} from "../../components/archive";

const Archive = () => {
  const router = useRouter();
  const { video: videoParam, id: idParam, topic: topicParam } = router.query;

  // Get archive videos and filter options from custom hook
  const { archiveVideos, years, halls } = useArchiveVideos();
  const [selectedVideo, setSelectedVideo] = useState<ScheduleItem | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedHall, setSelectedHall] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Update URL params when video selection changes
  const updateVideoInURL = useCallback(
    (video: ScheduleItem) => {
      const params = new URLSearchParams();
      params.set("video", video.youtube_id || "");
      params.set("id", video.id.toString());
      // Update URL without page reload
      router.replace(`/archive?${params.toString()}`, undefined, {
        shallow: true,
      });
    },
    [router]
  );

  const clearURLParams = useCallback(() => {
    router.replace("/archive", undefined, { shallow: true });
  }, [router]);

  const handleVideoSelect = useCallback(
    (video: ScheduleItem) => {
      setSelectedVideo(video);
      updateVideoInURL(video);
    },
    [updateVideoInURL]
  );

  const handleClearAll = useCallback(() => {
    setSelectedYear(null);
    setSelectedHall(null);
    setSearchTerm("");
    clearURLParams();
  }, [clearURLParams]);

  // Initialize selectedVideo when archiveVideos is available
  useEffect(() => {
    if (archiveVideos.length > 0 && !selectedVideo) {
      const firstVideo = archiveVideos[archiveVideos.length - 2];
      setSelectedVideo(firstVideo);
      // Only update URL if there are no existing params
      if (!videoParam && !idParam && !topicParam) {
        updateVideoInURL(firstVideo);
      }
    }
  }, [
    archiveVideos,
    selectedVideo,
    videoParam,
    idParam,
    topicParam,
    updateVideoInURL,
  ]);

  useEffect(() => {
    let foundVideo: ScheduleItem | null = null;

    if (idParam && typeof idParam === "string") {
      foundVideo =
        archiveVideos.find(
          (video: ScheduleItem) => video.id.toString() === idParam
        ) || null;
    }

    // Find by YouTube ID
    if (!foundVideo && videoParam && typeof videoParam === "string") {
      foundVideo =
        archiveVideos.find(
          (video: ScheduleItem) => video.youtube_id === videoParam
        ) || null;
    }

    if (foundVideo) {
      setSelectedVideo(foundVideo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoParam, idParam]);

  // Filter videos based on selected filters and search
  const filteredVideos = archiveVideos
    .filter((video) => {
      const matchesYear =
        !selectedYear || video.conference_year === selectedYear;
      const matchesHall = !selectedHall || video.hall_name === selectedHall;
      const matchesSearch =
        !searchTerm ||
        video.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (video.speaker &&
          video.speaker.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesYear && matchesHall && matchesSearch;
    })
    .reverse();

  if (!selectedVideo) {
    return (
      <>
        <ArchiveMetadata />
        <div className="min-h-screen bg-gradient-to-b from-[#ffffff] to-[#ECF3FE]">
          <Header />
          <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <LoadingSpinner message="Loading archive..." />
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <ArchiveMetadata selectedVideo={selectedVideo} />

      <div className="min-h-screen bg-gradient-to-b from-[#ffffff] to-[#ECF3FE]">
        <Header />

        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Player */}
            <ArchiveVideoPlayer
              selectedVideo={selectedVideo}
              className="lg:col-span-2"
            />

            {/* Filters and Video List */}
            <ArchiveSidebar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              selectedHall={selectedHall}
              setSelectedHall={setSelectedHall}
              years={years}
              halls={halls}
              filteredVideos={filteredVideos}
              selectedVideo={selectedVideo}
              onVideoSelect={handleVideoSelect}
              onClearAll={handleClearAll}
              className="lg:col-span-1"
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Archive;
