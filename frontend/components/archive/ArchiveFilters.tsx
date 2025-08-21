import React from "react";

interface ArchiveFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedYear: number | null;
  setSelectedYear: (year: number | null) => void;
  selectedHall: string | null;
  setSelectedHall: (hall: string | null) => void;
  years: number[];
  halls: string[];
  filteredCount: number;
  hasActiveFilters: boolean;
  onClearAll: () => void;
  className?: string;
}

const ArchiveFilters: React.FC<ArchiveFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedYear,
  setSelectedYear,
  selectedHall,
  setSelectedHall,
  years,
  halls,
  filteredCount,
  hasActiveFilters,
  onClearAll,
  className = "",
}) => {
  return (
    <div className={`p-4 border-b border-gray-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Browse Archive</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="px-3 py-1 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset filters
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search videos or speakers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Year Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Year
        </label>
        <select
          value={selectedYear || ""}
          onChange={(e) =>
            setSelectedYear(e.target.value ? Number(e.target.value) : null)
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="">All Years</option>
          {years.map((year: number) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Hall Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hall
        </label>
        <select
          value={selectedHall || ""}
          onChange={(e) => setSelectedHall(e.target.value || null)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        >
          <option value="">All Halls</option>
          {halls.map((hall: string) => (
            <option key={hall} value={hall}>
              {hall}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500">
        {filteredCount} video{filteredCount !== 1 ? "s" : ""} found
      </p>
    </div>
  );
};

export default ArchiveFilters;
