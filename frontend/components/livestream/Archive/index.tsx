"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface StreamProps {
  image1: string;
  image2: string;
  link1: string;
  link2: string;
  label1: string;
  label2: string;
}

const Streams: React.FC<StreamProps> = ({
  image1,
  image2,
  label1,
  label2,
  link1,
  link2,
}) => {
  const labelStyle = "p-4";
  const card = "shadow-md rounded-lg w-full md:w-[48%]";
  const imageStyle = "w-full bg-[#ccc] rounded-t-lg h-[250px]";

  return (
    <div className="flex flex-col md:flex-row md:w-[1200px] md:px-8 lg:w-[1000px]">
      <div className="aspect-video min-h-[400px] h-[600px] max-h-[600px]">
        <iframe
          src="https://streameth-platform-ur2bq6e34-streameth.vercel.app/embed/?stage=66d916d84f2179fbae7c65b4&vod=false&streamId=&playerName=Emerald+Hall"
          width="100%"
          height="100%"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Streams;
