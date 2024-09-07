import React from "react";
import Header from "../../../components/livestream/Header";
import Footer from "../../../components/livestream/Footer";
import Link from "next/link";

const page = () => {
  const button = "py-2 px-4 rounded-sm hover:bg-[#ccc]";
  return (
    <div className="bg-gradient-to-b from-[#ffffff] to-[#ECF3FE]">
      <Header />
      <div className="flex flex-col w-[85%] gap-y-10 md:gap-y-0 md:flex-row md:w-[1200px] md:px-8 lg:w-[1000px] justify-between">
        <div className="flex flex-col py-4 justify-center">
          <div className="flex ">
            <Link href="/livestream/ruby" className={`${button}`}>
              <p>Main Stage</p>
            </Link>
            <Link href="/livestream/emerald" className={`${button}`}>
              <p>Emerald Hall</p>
            </Link>
          </div>
          <div className="aspect-video min-h-[400px] h-[600px] max-h-[600px]">
            <iframe
              src="https://streameth-platform-ur2bq6e34-streameth.vercel.app/embed/?stage=66d916d84f2179fbae7c65b5&vod=false&streamId=&playerName=Emerald+Hall"
              width="100%"
              height="100%"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
