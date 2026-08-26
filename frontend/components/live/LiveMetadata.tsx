import React from "react";
import Head from "next/head";
import { Day } from "./DaySelector";
import { ConferenceDay } from "../../utils/conferenceUtils";

interface MetadataConfig {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

interface LiveMetadataProps {
  stageTitle: string;
  selectedDay: ConferenceDay;
  days: Day[];
  conferenceYear?: number | string;
}

const LiveMetadata: React.FC<LiveMetadataProps> = ({
  stageTitle,
  selectedDay,
  days,
  conferenceYear,
}) => {
  const currentDay = days.find((d) => d.key === selectedDay);
  const year = conferenceYear ?? new Date().getFullYear();

  const metadata: MetadataConfig = {
    title: `${stageTitle} - Web3 Lagos ${year} Live Stream`,
    description: `Watch the ${stageTitle} live stream from Web3 Lagos ${year} conference. ${
      currentDay
        ? `Currently showing ${currentDay.label} (${currentDay.date})`
        : ""
    } schedule and sessions.`,
    keywords: `Web3 Lagos, ${stageTitle}, blockchain conference, live stream, cryptocurrency, decentralized technology`,
    ogTitle: `${stageTitle} Live Stream - Web3 Lagos ${year}`,
    ogDescription: `Join us live at the ${stageTitle} for Web3 Lagos ${year} - Africa's premier blockchain conference.`,
    ogImage: "/web3lagos.jpg",
  };

  return (
    <Head>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <meta name="keywords" content={metadata.keywords} />
      <meta property="og:title" content={metadata.ogTitle} />
      <meta property="og:description" content={metadata.ogDescription} />
      <meta property="og:image" content={metadata.ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.ogTitle} />
      <meta name="twitter:description" content={metadata.ogDescription} />
      <meta name="twitter:image" content={metadata.ogImage} />
    </Head>
  );
};

export default LiveMetadata;
