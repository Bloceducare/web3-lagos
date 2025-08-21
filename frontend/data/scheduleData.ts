export interface ScheduleItem {
  id: string;
  time: string;
  duration?: string;
  topic: string;
  speaker?: string;
  speakerBio?: string;
  speakerImage?: string;
  youtubeId?: string;
  description?: string;
  hall: string;
  day: string;
  year: number;
  type?:
    | "talk"
    | "workshop"
    | "panel"
    | "break"
    | "registration"
    | "ama"
    | "networking";
  isLive?: boolean;
  liveStreamUrl?: string;
  videoThumbnail?: string;
  videoDescription?: string;
  recordingDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HallSchedule {
  title: string;
  items: ScheduleItem[];
}

export interface DaySchedule {
  title: string;
  date: string;
  halls: {
    [key: string]: HallSchedule;
  };
}

export interface ConferenceEdition {
  name: string;
  year: number;
  dates: string[];
  venue: string;
  days: {
    [key: string]: DaySchedule;
  };
}

export interface ConferenceData {
  [year: number]: ConferenceEdition;
}

export const conferenceData: ConferenceData = {
  2025: {
    name: "Web3 Lagos 2025",
    year: 2025,
    dates: ["2025-08-28", "2025-08-29", "2025-08-30"],
    venue: "Lagos Continental Hotel",
    days: {
      thur: {
        title: "Day 1",
        date: "28th August",
        halls: {
          hall1: {
            title: "Hall 1",
            items: [
              {
                id: "web3lagos_2025_thur_hall1_001",
                time: "9:00 - 10:00 AM",
                duration: "60 minutes",
                topic: "Arrival & Registration",
                hall: "Hall 1",
                day: "Day 1",
                year: 2025,
                type: "registration",
              },
              {
                id: "web3lagos_2025_thur_hall1_002",
                time: "10:00 - 10:15 AM",
                duration: "15 minutes",
                topic: "Welcome address",
                hall: "Hall 1",
                day: "Day 1",
                year: 2025,
                type: "talk",
              },
              {
                id: "web3lagos_2025_thur_hall1_003",
                time: "10:15 - 10:30 AM",
                duration: "15 minutes",
                topic: "Introductions",
                hall: "Hall 1",
                day: "Day 1",
                year: 2025,
                type: "talk",
              },
              {
                id: "web3lagos_2025_thur_hall1_004",
                time: "10:30 - 11:15 AM",
                duration: "45 minutes",
                topic: "Introduction to Blockchain",
                speaker: "Hezekiah Suleman",
                youtubeId: "EbcGAXOTWbA",
                description:
                  "A comprehensive introduction to blockchain fundamentals and core concepts.",
                hall: "Hall 1",
                day: "Day 1",
                year: 2025,
                type: "talk",
              },
              {
                id: "web3lagos_2025_thur_hall1_005",
                time: "11:15 - 11:40 AM",
                duration: "25 minutes",
                topic:
                  "Empowering Underserved Markets Onchain: An Exposition to Real-World Assets (RWAs)",
                speaker: "Oluwole Kayode",
                speakerBio: "RWA specialist and blockchain strategist",
                youtubeId: "dQw4w9WgXcQ",
                description:
                  "Exploring how Real-World Assets can empower underserved markets through blockchain technology.",
                hall: "Hall 1",
                day: "Day 1",
                year: 2025,
                type: "talk",
              },
              {
                id: "web3lagos_2025_thur_hall1_006",
                time: "11:40 - 11:50 AM",
                duration: "10 minutes",
                topic:
                  "The Role of Social Media in Building Web3 Communities: Best Practices and Pitfalls",
                speaker: "Amara Achusi",
                speakerBio: "Community builder and Web3 marketing expert",
                hall: "Hall 1",
                day: "Day 1",
                year: 2025,
                type: "talk",
              },
              {
                id: "web3lagos_2025_thur_hall1_007",
                time: "11:50 AM - 12:05 PM",
                duration: "15 minutes",
                topic:
                  "Adoption in Africa: Improvement of Africa Educational System Using Blockchain Technology",
                speaker: "David Amodu",
                speakerBio: "EdTech entrepreneur and blockchain advocate",
                hall: "Hall 1",
                day: "Day 1",
                year: 2025,
                type: "talk",
              },
              {
                id: "web3lagos_2025_thur_hall1_008",
                time: "12:05 - 12:35 PM",
                duration: "30 minutes",
                topic: "Blockchain Policies in Nigeria",
                speaker: "Beverly Agbakoba",
                speakerBio:
                  "Legal expert in blockchain and cryptocurrency regulations",
                youtubeId: "tpHRVlHVpNg",
                description:
                  "Deep dive into Nigeria's blockchain regulatory landscape and policy framework.",
                hall: "Hall 1",
                day: "Day 1",
                year: 2025,
                type: "talk",
              },
              {
                id: "web3lagos_2025_thur_hall1_009",
                time: "12:35 - 12:45 PM",
                duration: "10 minutes",
                topic: "The Future of Data in Web3",
                speaker: "Ivy Elebesunu",
                speakerBio: "Data scientist and Web3 researcher",
                hall: "Hall 1",
                day: "Day 1",
                year: 2025,
                type: "talk",
              },
              {
                id: "web3lagos_2025_thur_hall1_010",
                time: "12:45 - 12:55 PM",
                duration: "10 minutes",
                topic: "Working as a writer in Web3: How to build their brand",
                speaker: "Toluwalope Ajetunmobi",
                speakerBio: "Content creator and Web3 writer",
                hall: "Hall 1",
                day: "Day 1",
                year: 2025,
                type: "talk",
              },
              {
                id: "web3lagos_2025_thur_hall1_011",
                time: "12:55 - 1:10 PM",
                duration: "15 minutes",
                topic: "Real World Assets (Fluke or For-real)",
                speaker: "Emmanuel Tope",
                speakerBio: "DeFi researcher and RWA analyst",
                youtubeId: "EbcGAXOTWbA",
                description:
                  "Exploring the intersection of decentralized finance and real-world asset tokenization.",
                hall: "Hall 1",
                day: "Day 1",
                year: 2025,
                type: "talk",
              },
            ],
          },
          hall2: {
            title: "Hall 2",
            items: [
              {
                id: "web3lagos_2025_thur_hall2_001",
                time: "11:50 AM - 12:05 PM",
                duration: "15 minutes",
                topic:
                  "From Web2 to Web3: Web3.js - Your Developer Passport to the Decentralized Future",
                speaker: "Adefisayo Adejumo",
                speakerBio: "Full-stack developer and Web3.js contributor",
                hall: "Hall 2",
                day: "Day 1",
                year: 2025,
                type: "workshop",
              },
            ],
          },
        },
      },
      fri: {
        title: "Day 2",
        date: "29th August",
        halls: {
          hall1: {
            title: "Hall 1",
            items: [
              {
                id: "web3lagos_2025_fri_hall1_001",
                time: "9:00 - 10:00 AM",
                topic: "Arrival & Registration",
                hall: "Hall 1",
                day: "Day 2",
                year: 2025,
                type: "registration",
              },
            ],
          },
          hall2: {
            title: "Hall 2",
            items: [
              {
                id: "web3lagos_2025_fri_hall2_001",
                time: "1:10 - 1:30 PM",
                topic:
                  "Field Notes from the Trenches: Ensuring High-Availability and Resilience in Blockchain Node Operations",
                speaker: "Ukeme David Eseme",
                speakerBio:
                  "DevOps engineer and blockchain infrastructure specialist",
                youtubeId: "EbcGAXOTWbA",
                description:
                  "Deep dive into blockchain node infrastructure and best practices for maintaining high availability.",
                hall: "Hall 2",
                day: "Day 2",
                year: 2025,
                type: "talk",
              },
            ],
          },
        },
      },
      sat: {
        title: "Day 3",
        date: "30th August",
        halls: {
          hall1: {
            title: "Hall 1",
            items: [
              {
                id: "web3lagos_2025_sat_hall1_001",
                time: "9:00 - 9:45 AM",
                topic: "Arrival and Registration",
                hall: "Hall 1",
                day: "Day 3",
                year: 2025,
                type: "registration",
              },
            ],
          },
          hall2: {
            title: "Hall 2",
            items: [],
          },
        },
      },
    },
  },
  2024: {
    name: "Web3 Lagos 2024",
    year: 2024,
    dates: ["2024-08-21", "2024-08-22", "2024-08-23"],
    venue: "Lagos Continental Hotel",
    days: {
      day1: {
        title: "Day 1",
        date: "21st August",
        halls: {
          mainStage: {
            title: "Main Stage",
            items: [
              {
                id: "web3lagos_2024_day1_main_001",
                time: "Full Session",
                topic: "Web3 Gaming and NFTs",
                speaker: "Various Speakers",
                year: 2024,
                day: "Day 1",
                hall: "Main Stage",
                duration: "25 min",
                description:
                  "The future of gaming in Web3 and the role of NFTs in digital ownership.",
                youtubeId: "EbcGAXOTWbA",
                type: "panel",
              },
              {
                id: "web3lagos_2024_day1_main_002",
                time: "Full Session",
                topic: "Smart Contract Security",
                speaker: "David Drounz",
                year: 2024,
                day: "Day 1",
                hall: "Main Stage",
                duration: "30 min",
                description:
                  "Best practices for smart contract development and security considerations.",
                youtubeId: "EbcGAXOTWbA",
                type: "talk",
              },
            ],
          },
        },
      },
    },
  },
};

// Backward compatibility - current year schedule
export const scheduleData: ConferenceEdition = conferenceData[2025];

export const getAllScheduleItems = (year?: number): ScheduleItem[] => {
  const items: ScheduleItem[] = [];

  if (year) {
    const yearData = conferenceData[year];
    if (yearData) {
      Object.values(yearData.days).forEach((day: DaySchedule) => {
        Object.values(day.halls).forEach((hall: HallSchedule) => {
          items.push(...hall.items);
        });
      });
    }
  } else {
    // Get all items from all years
    Object.values(conferenceData).forEach((yearData: ConferenceEdition) => {
      Object.values(yearData.days).forEach((day: DaySchedule) => {
        Object.values(day.halls).forEach((hall: HallSchedule) => {
          items.push(...hall.items);
        });
      });
    });
  }

  return items;
};

export const getArchiveVideos = (): ScheduleItem[] => {
  const allItems = getAllScheduleItems();
  // Only return items that have YouTube IDs (are available as recordings)
  return allItems.filter((item) => item.youtubeId);
};

export const getScheduleItemById = (id: string): ScheduleItem | null => {
  const allItems = getAllScheduleItems();
  return allItems.find((item) => item.id === id) || null;
};

export const getScheduleItemByYouTubeId = (
  youtubeId: string
): ScheduleItem | null => {
  const allItems = getAllScheduleItems();
  return allItems.find((item) => item.youtubeId === youtubeId) || null;
};

export const searchScheduleItems = (
  query: string,
  year?: number
): ScheduleItem[] => {
  const allItems = getAllScheduleItems(year);
  const searchTerm = query.toLowerCase();

  return allItems.filter(
    (item) =>
      item.topic.toLowerCase().includes(searchTerm) ||
      (item.speaker && item.speaker.toLowerCase().includes(searchTerm)) ||
      (item.description && item.description.toLowerCase().includes(searchTerm))
  );
};

export const getConferenceYears = (): number[] => {
  return Object.keys(conferenceData)
    .map(Number)
    .sort((a, b) => b - a);
};

export const getHallsByYear = (year: number): string[] => {
  const yearData = conferenceData[year];
  if (!yearData) return [];

  const halls = new Set<string>();
  Object.values(yearData.days).forEach((day: DaySchedule) => {
    Object.values(day.halls).forEach((hall: HallSchedule) => {
      if (hall.items.length > 0) {
        halls.add(hall.title);
      }
    });
  });

  return Array.from(halls);
};

export const generateArchiveQueryParams = (item: ScheduleItem): string => {
  const params = new URLSearchParams();

  if (item.youtubeId) {
    params.set("video", item.youtubeId);
  }
  params.set("id", item.id);
  return params.toString();
};
