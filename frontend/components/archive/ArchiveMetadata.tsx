import React from "react";
import Head from "next/head";

interface ArchiveMetadataProps {
  selectedVideo?: { topic: string; speaker?: string } | null;
}

const ArchiveMetadata: React.FC<ArchiveMetadataProps> = ({ selectedVideo }) => {
  const baseMetadata = {
    title: "Archive - Web3 Lagos Conference",
    description:
      "Watch past Web3 Lagos conference recordings, presentations, and highlights. Access talks from top blockchain experts, developers, and innovators.",
    keywords:
      "Web3 Lagos archive, blockchain conference recordings, cryptocurrency talks, DeFi presentations, Web3 videos",
    ogTitle: "Web3 Lagos Conference Archive",
    ogDescription:
      "Watch years of blockchain innovation and education from Africa's premier Web3 conference.",
    ogImage: "/web3lagos.jpg",
  };

  const enhancedMetadata = selectedVideo
    ? {
        ...baseMetadata,
        title: `${selectedVideo.topic} - Web3 Lagos Archive`,
        description: `Watch "${selectedVideo.topic}"${
          selectedVideo.speaker ? ` by ${selectedVideo.speaker}` : ""
        } from the Web3 Lagos conference archive. ${baseMetadata.description}`,
        ogTitle: `${selectedVideo.topic} - Web3 Lagos Conference`,
        ogDescription: `Watch "${selectedVideo.topic}"${
          selectedVideo.speaker ? ` by ${selectedVideo.speaker}` : ""
        } and other blockchain innovation talks from Africa's premier Web3 conference.`,
      }
    : baseMetadata;

  return (
    <Head>
      <title>{enhancedMetadata.title}</title>
      <meta name="description" content={enhancedMetadata.description} />
      <meta name="keywords" content={enhancedMetadata.keywords} />
      <meta property="og:title" content={enhancedMetadata.ogTitle} />
      <meta
        property="og:description"
        content={enhancedMetadata.ogDescription}
      />
      <meta property="og:image" content={enhancedMetadata.ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={enhancedMetadata.ogTitle} />
      <meta
        name="twitter:description"
        content={enhancedMetadata.ogDescription}
      />
      <meta name="twitter:image" content={enhancedMetadata.ogImage} />
    </Head>
  );
};

export default ArchiveMetadata;
