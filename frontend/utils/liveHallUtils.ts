/** Resolve the main-stage hall without relying on array index. */
export function resolveMainStageHall<T extends { name: string; slug?: string | null }>(
  halls: T[]
): T | undefined {
  if (!halls.length) return undefined;

  const bySlug = halls.find((h) => (h.slug || "").toLowerCase() === "main-stage");
  if (bySlug) return bySlug;

  const byName = halls.find((h) => h.name.toLowerCase().includes("main"));
  if (byName) return byName;

  return halls[0];
}

/** Map API session fields onto the schedule sidebar item shape. */
export function mapSessionToScheduleItem(
  session: {
    id: number | string;
    topic: string;
    speaker?: string;
    youtube_id?: string;
    description?: string;
    hall_name?: string;
    conference_year?: number;
    speaker_bio?: string;
    speaker_image?: string;
    type?: string;
    start_datetime: string;
    end_datetime: string;
  },
  extras: {
    time: string;
    day: string;
    duration: string;
  }
) {
  return {
    id: session.id.toString(),
    time: extras.time,
    topic: session.topic,
    speaker: session.speaker,
    youtubeId: session.youtube_id || undefined,
    youtube_id: session.youtube_id,
    description: session.description,
    hall: session.hall_name || "",
    day: extras.day,
    year: session.conference_year || new Date().getFullYear(),
    duration: extras.duration,
    speakerBio: session.speaker_bio,
    speakerImage: session.speaker_image,
    type: session.type as any,
  };
}
