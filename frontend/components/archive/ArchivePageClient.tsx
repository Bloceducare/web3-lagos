'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import LiveLayout from '@/pages/live/LiveLayout'
import ArchiveMetadata from './ArchiveMetadata'
import ArchiveSidebar from './ArchiveSidebar'
import ArchiveVideoPlayer from './ArchiveVideoPlayer'
import { useArchivedSessions } from '@/hooks/useScheduleData'
import type { ScheduleItem } from '@/lib/api'

export default function ArchivePageClient() {
  const router = useRouter()
  const { loading, error, archivedSessions } = useArchivedSessions()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [selectedHall, setSelectedHall] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<ScheduleItem | null>(null)

  const years = useMemo(() => {
    const ys = new Set<number>()
    archivedSessions.forEach((v) => {
      if (v.conference_year) ys.add(v.conference_year)
    })
    return Array.from(ys).sort((a, b) => b - a)
  }, [archivedSessions])

  const halls = useMemo(() => {
    const hs = new Set<string>()
    archivedSessions.forEach((v) => {
      if (v.hall_name) hs.add(v.hall_name)
    })
    return Array.from(hs).sort()
  }, [archivedSessions])

  const filteredVideos = useMemo(() => {
    return archivedSessions.filter((v) => {
      if (selectedYear != null && v.conference_year !== selectedYear) return false
      if (selectedHall && v.hall_name !== selectedHall) return false
      if (searchTerm) {
        const q = searchTerm.toLowerCase()
        const hay = `${v.topic} ${v.speaker || ''} ${v.description || ''}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [archivedSessions, selectedYear, selectedHall, searchTerm])

  useEffect(() => {
    if (!router.isReady || loading) return

    const yRaw = router.query.year
    const idRaw = router.query.id
    const vidRaw = router.query.video

    if (yRaw != null && yRaw !== '') {
      const y = Number(Array.isArray(yRaw) ? yRaw[0] : yRaw)
      if (!Number.isNaN(y)) setSelectedYear(y)
    }

    if (!archivedSessions.length) return

    if (idRaw != null && idRaw !== '') {
      const id = Number(Array.isArray(idRaw) ? idRaw[0] : idRaw)
      const found = archivedSessions.find((v) => v.id === id)
      if (found) {
        setSelectedVideo(found)
        if (found.conference_year) setSelectedYear(found.conference_year)
        return
      }
    }

    if (vidRaw != null && vidRaw !== '') {
      const yt = Array.isArray(vidRaw) ? vidRaw[0] : vidRaw
      const found = archivedSessions.find((v) => v.youtube_id === yt)
      if (found) {
        setSelectedVideo(found)
        if (found.conference_year) setSelectedYear(found.conference_year)
      }
    }
  }, [router.isReady, router.query.year, router.query.id, router.query.video, loading, archivedSessions])

  useEffect(() => {
    if (filteredVideos.length === 0) {
      if (selectedVideo) setSelectedVideo(null)
      return
    }
    if (!selectedVideo || !filteredVideos.some((v) => v.id === selectedVideo.id)) {
      setSelectedVideo(filteredVideos[0])
    }
  }, [filteredVideos, selectedVideo])

  const onClearAll = () => {
    setSearchTerm('')
    setSelectedYear(null)
    setSelectedHall(null)
    setSelectedVideo(null)
  }

  return (
    <>
      <ArchiveMetadata
        selectedVideo={
          selectedVideo
            ? { topic: selectedVideo.topic, speaker: selectedVideo.speaker }
            : null
        }
      />
      <LiveLayout>
        <div className="w-full max-w-7xl mx-auto px-4 py-8 min-h-[60vh]">
          {loading && (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading archive…</p>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-16">
              <p className="text-red-600 mb-2">Could not load archive</p>
              <p className="text-gray-600 text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
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
                  onVideoSelect={setSelectedVideo}
                  onClearAll={onClearAll}
                />
              </div>
              <div className="lg:col-span-2">
                <ArchiveVideoPlayer selectedVideo={selectedVideo} />
              </div>
            </div>
          )}
        </div>
      </LiveLayout>
    </>
  )
}
