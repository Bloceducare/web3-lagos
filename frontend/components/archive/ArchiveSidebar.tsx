import React from "react";
import { ScheduleItem } from "../../data/scheduleData";
import ArchiveFilters from "./ArchiveFilters";
import ArchiveVideoList from "./ArchiveVideoList";

interface ArchiveSidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedYear: number | null;
  setSelectedYear: (year: number | null) => void;
  selectedHall: string | null;
  setSelectedHall: (hall: string | null) => void;
  years: number[];
  halls: string[];
  filteredVideos: ScheduleItem[];
  selectedVideo: ScheduleItem | null;
  onVideoSelect: (video: ScheduleItem) => void;
  onClearAll: () => void;
  className?: string;
}

const ArchiveSidebar: React.FC<ArchiveSidebarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedYear,
  setSelectedYear,
  selectedHall,
  setSelectedHall,
  years,
  halls,
  filteredVideos,
  selectedVideo,
  onVideoSelect,
  onClearAll,
  className = "",
}) => {
  const hasActiveFilters = selectedYear || selectedHall || searchTerm;

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}
    >
      <ArchiveFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedHall={selectedHall}
        setSelectedHall={setSelectedHall}
        years={years}
        halls={halls}
        filteredCount={filteredVideos.length}
        hasActiveFilters={!!hasActiveFilters}
        onClearAll={onClearAll}
      />

      <ArchiveVideoList
        videos={filteredVideos}
        selectedVideo={selectedVideo}
        onVideoSelect={onVideoSelect}
        onClearFilters={onClearAll}
      />
    </div>
  );
};

export default ArchiveSidebar;
