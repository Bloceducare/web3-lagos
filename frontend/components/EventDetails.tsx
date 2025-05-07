import React from "react";
import Image from "next/image";
import Link from "next/link";
import L1 from "@/assets/fonts/landingpage/L1.png";
import L2 from "@/assets/fonts/landingpage/L2.png";
import L3 from "@/assets/fonts/landingpage/L3.png";
import Ethereum from "@/public/ethereum.png"
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
    title: "Our Mission at Web3bridge",
    description:
      "At Web3bridge, we believe that education is the foundation for blockchain adoption. That’s why we’ve created initiatives like the Web3 Lagos Conference — a platform designed to educate, inspire, and empower individuals across different levels of understanding in blockchain technology.",
      
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
    <div className="py-12">
  <div className="max-w-screen-2xl mx-auto px-5 lg:px-12">
  <div className="mb-8 text-center">
  <h1 className="text-[20px] sm:text-[32px] md:text-[36px] text-[#188BE0] py-4 shadow-xl font-medium">
    Empowering Africa Through Blockchain Education
  </h1>
  <p className="text-[#1E1E1E] text-lg sm:text-xl md:text-2xl leading-[35px] md:leading-[40px] mt-20">
    The Web3 Lagos Conference by Web3bridge is a 3-day hybrid event designed to onboard, educate, and inspire the next generation of blockchain innovators. Through workshops, hackathons, panels, and networking, we’re creating a space where both beginners and experts can connect, learn, and explore the future of Web3 in Africa and beyond.
  </p>
</div>

  </div>

  <div className="max-w-screen-2xl mx-auto px-5 lg:px-12">
  {/* Top Grid Section */}
  <div className="flex flex-wrap justify-between items-center mb-16 mt-20">
    <Card className="p-6 w-full sm:w-[45%] h-full shadow-xl border-[#E0182C] border-2 mb-4 sm:mb-0">
      <h2 className="mb-2">{goals.icon}</h2>
      <h2 className="text-2xl font-bold mb-4">{goals.title}</h2>
      <p className="text-[#000000]">{goals.description}</p>
    </Card>
    <div className="relative aspect-video w-full sm:w-[50%]">
      <Image
        src={L1}
        alt="Event image 1"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  </div>

  {/* Registration Section */}
  <div className="flex flex-wrap-reverse justify-between items-center mb-16 mt-20">
    <div className="relative aspect-video w-full sm:w-[50%]">
      <Image
        src={L3}
        alt="Event image 2"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>

    {/* Register As Speaker */}
    <Card className="p-6 w-full sm:w-[45%] h-full shadow-xl border-[#E0182C] border-2 mb-4 sm:mb-0">
      <Speaker className="mb-2" />
      <h2 className="text-2xl font-bold mb-4">Be a Speaker</h2>
      <p className="mb-4">
        Passionate about blockchain and eager to share your knowledge? Join us as a speaker at the Web3 Lagos Conference and contribute to driving awareness, learning, and real-world use cases of blockchain and Ethereum.
      </p>
      <button className="px-6 py-2 bg-[#E0182C] text-white rounded-md hover:bg-[#ff3246]">
        Click here
      </button>
    </Card>
  </div>

  <div className="flex flex-wrap justify-between items-center mb-16 mt-20">
    <Card className="p-6 w-full sm:w-[50%] h-full shadow-xl border-[#E0182C] border-2 mb-4 sm:mb-0">
      <h2 className="mb-2">{goals.icon}</h2>
      <h2 className="text-2xl font-bold mb-4">Event Overview</h2>
      <p className="text-[#000000] mb-2">
        The Web3 Lagos Conference is a 3-day hybrid event — both physical and virtual — that includes:
      </p>
      <ul className="list-disc list-inside text-[#000000] mb-4">
        <li>Hackathons</li>
        <li>Workshops</li>
        <li>Networking opportunities</li>
        <li>Career fairs</li>
        <li>Panel sessions</li>
        <li>Expert talks</li>
      </ul>
      <p className="text-[#000000]">
        It’s designed to onboard newcomers and help both technical and non-technical individuals discover the endless opportunities in the blockchain and Ethereum ecosystem.
      </p>
    </Card>

    <div className="relative aspect-video w-full sm:w-[40%]">
      <Image
        src={Ethereum}
        alt="Event image 1"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  </div>

  <div className="flex flex-wrap-reverse justify-between items-center mb-16 mt-20">
    <div className="relative aspect-video w-full sm:w-[50%]">
      <Image
        src={L2}
        alt="Event image 5"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>

    {/* Register As Speaker */}
    <Card className="p-6 w-full sm:w-[45%] h-full shadow-xl border-[#E0182C] border-2 mb-4 sm:mb-0">
      <Speaker className="mb-2" />
      <h2 className="text-2xl font-bold mb-4">Attend The Event</h2>
      <p className="mb-4">
        Whether you're a beginner or a blockchain native, the Web3 Lagos Conference is for you. Register now to learn, connect, and grow in a dynamic 3-day experience that blends education with real opportunities.
      </p>
      <button className="px-6 py-2 bg-[#188BE0] text-white rounded-md hover:bg-[#31a3fa]">
        Click here
      </button>
    </Card>
  </div>
</div>


  {/* Highlights Section */}
  <div className="mb-16 py-5 bg-[#F2FAFF]">
    <div className="max-w-screen-2xl mx-auto px-5 lg:px-12">
      <h3 className="font-bold my-4 text-center text-black text-3xl lg:text-4xl leading-10 lg:leading-12">
        A Look Back: Web3 Lagos {highlights.year} Highlights
      </h3>

      <div className="flex justify-center gap-10 items-center mb-4 flex-wrap">
        <div className="w-full md:w-[45%] text-center space-y-4 border-[#1E1E1E] shadow-xl border-2 rounded-2xl px-5 text-[#1E1E1E] py-4">
          <p>
            In 2023, Web3 Lagos brought together over 1,500 blockchain enthusiasts, builders, and innovators for an unforgettable 3-day experience. The event featured 50+ speakers, interactive breakout sessions, and a powerful keynote by Ayodeji Awosika, Chief Mechanic at Web3bridge.
          </p>
          <p>🎥 Want to relive the moments? Watch the Web3 Lagos 2023 Recap on YouTube — see the energy, insights, and community that made it all unforgettable.</p>
        </div>

        <div className="w-full md:w-[35%]">
          <YoutubeIframe />
        </div>
      </div>
    </div>
  </div>

  <section>
    <h1 className="text-center text-[40px] font-medium">Our Success Story Through the Years</h1>
    <div className="mt-5 bg-blue-800 py-10">
      <div className="max-w-screen-2xl mx-auto px-5 lg:px-12">
        <p className="text-2xl mb-4">
          Each year, Web3 Lagos grows stronger — empowering more people, sparking new ideas, and deepening the impact of blockchain in Africa. From groundbreaking keynotes to vibrant community moments, our past events tell a story of progress, passion, and purpose.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-black mb-4">Check gallery from the previous event</p>
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
                  className="object-cover"
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
    </div>
  </section>
</div>


  );
};
export default EventDetails;
