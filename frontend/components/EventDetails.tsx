import React from "react";
import Image from "next/image";
import Link from "next/link";
import L1 from "@/assets/fonts/landingpage/L1.png";
import L2 from "@/assets/fonts/landingpage/L2.png";
import L3 from "@/assets/fonts/landingpage/L3.png";
import { Card } from "@/components/ui/card";
import { Goal, CalendarDays, Smile, Speaker } from "lucide-react";
import YoutubeIframe from "./Iframe";
interface GoalProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface EventOverview {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface HighlightStats {
  attendees: number;
  year: number;
  keynoteSpeaker: string;
}

interface SuccessStory {
  year: number;
  link: string;
}

const EventDetails = () => {
  const goals: GoalProps = {
    icon: <Goal size={24} />,
    title: "Our Goals",
    description:
      "At Web3Lagos, we believe education is critical in the drive for adoption of blockchain technology. And we have set up Web3 Lagos conferences to bring education across varying topics/subjects and comprehension of blockchain technology.",
  };

  const eventOverview: EventOverview = {
    icon: <CalendarDays size={24} />,
    title: "Event Overview",
    description:
      "Web3 Lagos Conference is a 3-day physical and virtual event comprising of hackathon, workshops, networking, career fair panel sessions, talks etc. The event focused on onboarding and supporting the growth of individual and businesses in the web3 space while creating networking opportunities and non-technical blockchain native persons outside the builders, possibilities and opportunities of the blockchain ecosystem.",
  };

  const highlights: HighlightStats = {
    attendees: 600,
    year: 2023,
    keynoteSpeaker: "Chief Norman at PeerBridge",
  };

  const successStories: SuccessStory[] = [
    { year: 2022, link: "#" },
    { year: 2023, link: "#" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Grid Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="p-6">
          <h2 className="mb-2">{goals.icon}</h2>
          <h2 className="text-2xl font-bold mb-4">{goals.title}</h2>
          <p className="text-gray-600">{goals.description}</p>
        </Card>

        <Card className="p-6">
          <h2 className="mb-2">{eventOverview.icon}</h2>
          <h2 className="text-2xl font-bold mb-4">{eventOverview.title}</h2>
          <p className="text-gray-600">{eventOverview.description}</p>
        </Card>
      </div>

      {/* Registration Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <Card className="p-6">
          <Smile className="mb-2" />
          <h2 className="text-2xl font-bold mb-4">Register for Event</h2>
          <p className="text-gray-600 mb-4">{goals.description}</p>
          <button className="px-6 py-2 bg-[#188BE0] text-white rounded-md hover:bg-blue-700">
            Click here
          </button>
        </Card>

        {/* Register As Speaker */}
        <Card className="bg-[#188BE0] text-white p-6">
          <Speaker className="mb-2" />
          <h2 className="text-2xl font-bold mb-4">Register As Speaker</h2>
          <p className="mb-4">{goals.description}</p>
          <button className="px-6 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100">
            Click here
          </button>
        </Card>
      </div>

      {/* Highlights Section */}
      <div className="mb-16">
        <h3 className="font-bold my-4 text-center text-black text-3xl lg:text-4xl leading-10 lg:leading-12">
          Highlights from W3LC {highlights.year}
        </h3>
        <p className="text-center text-black text-lg">
          The {highlights.year} edition had over {highlights.attendees}{" "}
          enthusiasts and players in the ecosystem in attendance. With over 50
          speakers in interactive and balanced breakout sessions.{" "}
          {highlights.keynoteSpeaker} delivered the keynote address.
        </p>
        <YoutubeIframe />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Success Story:</h2>
          <p className="text-gray-600 mb-4">
            Check gallery from the previous event
          </p>
          {successStories.map((story) => (
            <Link
              key={story.year}
              href={story.link}
              className="block mb-2 text-black font-semibold"
            >
              ➔ W3LC {story.year}: Link Here
            </Link>
          ))}
        </div>
        <div>
          <div className="grid grid-cols-2 gap-6">
            <div className="relative aspect-video">
              <Image
                src={L1}
                alt="Event image 1"
                fill
                className="object-cover "
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-video">
              <Image
                src={L3}
                alt="Event image 2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-4">
            <div className="relative aspect-video">
              <Image
                src={L3}
                alt="Event image 3"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-video">
              <Image
                src={L1}
                alt="Event image 4"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-video">
              <Image
                src={L2}
                alt="Event image 5"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventDetails;
