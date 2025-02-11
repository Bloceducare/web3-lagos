import Image from "next/image";

// bg-cover bg-[url('../images/main_bg.png')] h-[calc(110vh-20rem)] w-[1440px]
type DetailsCardProps = {
  cardHeading: string;
  cardContent: string;
  cardLink: string;
  linkName: string;
};

const DetailsCard: React.FC<DetailsCardProps> = ({
  cardHeading,
  cardContent,
  cardLink,
  linkName,
}) => {
  return (
    <div className="bg-white shadow-xl w-full flex flex-col items-center border rounded-2xl lg:h-[26rem] md:h-[31rem] sm:h-fit sm:w-full justify-between">
      <div className="p-[30px] lg:px-[40px] lg:py-[30px]">
        <h3 className="mb-6 text-[#122C47] text-2xl font-semibold ">
          {" "}
          {cardHeading}{" "}
        </h3>
        <p className="text-slate-600">{cardContent}</p>
      </div>
      <div className="border-t-[1px] w-full relative px-[30px] py-[20px] lg:px-[40px] ">
        <a className="text-left underline" href={cardLink}>
          {linkName}
        </a>
      </div>
    </div>
  );
};

const EventDetails = () => {
  return (
    <>
      <div className="flex justify-center items-center mx-auto">
        <div className="grid grid-cols-2 gap-5 px-4 py-[3rem] md:px-5 md:py-[5rem] lg:h-full w-full justify-between items-center m-auto flex-col md:flex-row lg:max-w-screen-lg xl:max-w-screen-xl">
          <DetailsCard
            cardHeading="Our Goal"
            cardContent="At Web3bridge, we believe education is critical in the drive for adoption of blockchain technology. And we have set up Web3 Lagos conference to bring education across varying topics/subjects and comprehension of blockchain technology."
            cardLink="#"
            linkName="Learn More"
          />
          <DetailsCard
            cardHeading="Our Goal"
            cardContent="At Web3bridge, we believe education is critical in the drive for adoption of blockchain technology. And we have set up Web3 Lagos conference to bring education across varying topics/subjects and comprehension of blockchain technology."
            cardLink="#"
            linkName="Learn More"
          />
          <DetailsCard
            cardHeading="Our Goal"
            cardContent="At Web3bridge, we believe education is critical in the drive for adoption of blockchain technology. And we have set up Web3 Lagos conference to bring education across varying topics/subjects and comprehension of blockchain technology."
            cardLink="#"
            linkName="Learn More"
          />

          <DetailsCard
            cardHeading="Event Overview "
            cardContent="Web3 Lagos Conference is a 3-day physical and virtual event comprising of hackathon, workshops, networking, career fair, panel session, talks, etc. The event focuses on onboarding and supporting the growth of individual new to the concept of blockchain and decentralisation, helping technical and non-technical blockchain native persons realise the endless possibilities and opportunities of the Blockchain & Ethereum ecosystem."
            cardLink="https://x.com/Web3LagosCon?t=GsypdcemdkbHLj0OfWFf3g&s=09"
            linkName="Visit X(Twitter) to Learn More"
          />
        </div>
      </div>
    </>
  );
};

// export default EventDetails;

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Card, CardContent } from "@/components/ui/card";

// // TypeScript interfaces
// interface GoalProps {
//   title: string;
//   description: string;
// }

// interface EventOverview {
//   title: string;
//   description: string;
// }

// interface HighlightStats {
//   attendees: number;
//   year: number;
//   keynoteSpeaker: string;
// }

// interface SuccessStory {
//   year: number;
//   link: string;
// }

// const EventDetails = () => {
//   const goals: GoalProps = {
//     title: "Our Goals",
//     description:
//       "At Web3Lagos, we believe education is critical in the drive for adoption of blockchain technology. And we have set up Web3 Lagos conferences to bring education across varying topics/subjects and comprehension of blockchain technology.",
//   };

//   const eventOverview: EventOverview = {
//     title: "Event Overview",
//     description:
//       "Web3 Lagos Conference is a 3-day physical and virtual event comprising of hackathon, workshops, networking, career fair panel sessions, talks etc. The event focused on onboarding and supporting the growth of individual and businesses in the web3 space while creating networking opportunities and non-technical blockchain native persons outside the builders, possibilities and opportunities of the blockchain ecosystem.",
//   };

//   const highlights: HighlightStats = {
//     attendees: 600,
//     year: 2023,
//     keynoteSpeaker: "Chief Norman at PeerBridge",
//   };

//   const successStories: SuccessStory[] = [
//     { year: 2022, link: "#" },
//     { year: 2023, link: "#" },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       {/* Top Grid Section */}
//       <div className="grid md:grid-cols-2 gap-8 mb-16">
//         {/* Goals Card */}
//         <Card className="p-6">
//           <h2 className="text-2xl font-bold mb-4">{goals.title}</h2>
//           <p className="text-gray-600">{goals.description}</p>
//           <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//             Get More
//           </button>
//         </Card>

//         {/* Event Overview Card */}
//         <Card className="p-6">
//           <h2 className="text-2xl font-bold mb-4">{eventOverview.title}</h2>
//           <p className="text-gray-600">{eventOverview.description}</p>
//         </Card>
//       </div>

//       {/* Registration Section */}
//       <div className="grid md:grid-cols-2 gap-8 mb-16">
//         {/* Register for Event */}
//         <Card className="p-6">
//           <h2 className="text-2xl font-bold mb-4">Register for Event</h2>
//           <p className="text-gray-600 mb-4">{goals.description}</p>
//           <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
//             Get More
//           </button>
//         </Card>

//         {/* Register As Speaker */}
//         <Card className="bg-blue-600 text-white p-6">
//           <h2 className="text-2xl font-bold mb-4">Register As Speaker</h2>
//           <p className="mb-4">{goals.description}</p>
//           <button className="px-6 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100">
//             Get More
//           </button>
//         </Card>
//       </div>

//       {/* Highlights Section */}
//       <div className="mb-16">
//         <h2 className="text-3xl font-bold text-center mb-8">
//           Highlights from W3LC {highlights.year}
//         </h2>
//         <p className="text-center text-gray-600 mb-8">
//           The {highlights.year} edition had over {highlights.attendees}{" "}
//           enthusiasts and players in the ecosystem in attendance. With over 50
//           speakers in interactive and balanced breakout sessions.{" "}
//           {highlights.keynoteSpeaker} delivered the keynote address.
//         </p>
//         <div className="aspect-w-16 aspect-h-9 mb-8">
//           <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
//             <span className="text-gray-500">Video Player Placeholder</span>
//           </div>
//         </div>
//       </div>

//       {/* Success Story Section */}
//       <div className="grid md:grid-cols-2 gap-8">
//         <div>
//           <h2 className="text-2xl font-bold mb-4">Our Success Story:</h2>
//           <p className="text-gray-600 mb-4">
//             Check gallery from the previous event
//           </p>
//           {successStories.map((story) => (
//             <Link
//               key={story.year}
//               href={story.link}
//               className="block mb-2 text-blue-600 hover:underline"
//             >
//               ➔ W3LC {story.year} Link Here
//             </Link>
//           ))}
//         </div>
//         <div className="grid grid-cols-3 gap-4">
//           {[1, 2, 3, 4, 5, 6].map((index) => (
//             <div key={index} className="aspect-square bg-gray-200 rounded-lg">
//               {/* Replace with actual images */}
//               <div className="w-full h-full flex items-center justify-center text-gray-500">
//                 Image {index}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetails;
