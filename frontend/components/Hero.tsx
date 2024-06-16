import React from "react";

import dot from "../public/dot.svg";
import Image from "next/image";
import attendess from "../public/attendees.svg";
import speakers from "../public/speakers.svg";
import sponsors from "../public/sponsor.svg";
import banner from "../public/banner.png";
import Button from "./button";
import Link from "next/link";

type Stats = {
  icon: string;
  statsnum: string;
  desc: string;
};

const Stats = ({ icon, statsnum, desc }: Stats) => {
  return (
    <div className="flex items-center space-x-2">
      <div>
        <Image src={icon} priority alt="stats-icon" />
      </div>
      <div>
        <span className="block text-[#F0EFDA] text-2xl md:text-3xl leading-tight font-semibold">
          {statsnum}
        </span>
        <span className="font-normal text-sm md:text-base leading-tight text-[#F0EFDA]">
          {desc}
        </span>
      </div>
    </div>
  );
};

function Hero() {
  return (
    <section className="bg-hero">
      <div className="container mx-auto px-12 pt-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-2">
          <div>
            <h1 className="text-[#F0EFDA] my-4 text-2xl md:text-4xl font-[700] lg:leading-[76px] lg:text-[64px]">
              <span className="text-2xl md:text-4xl lg:text-5xl leading-tight font-semibold">
                Web3 Lagos <br /> Conference
              </span>{" "}
              <span className="text-xl md:text-3xl lg:text-4xl font-normal">
                {" "}
                2.0
              </span>
            </h1>

            <p className="text-[#F0EFDA] font-[400] text-[24px] leading-[28.8px]">
              The Web3 Lagos Conference is the largest Web3 Event in Lagos,
              Nigeria. This conference will bring together Web3 enthusiasts from
              all over Nigeria and beyond.
              <br /> Here, community meets technology for three days of
              intensive Networking and Learning experiences.
            </p>
            <div className="flex items-center space-x-4">
              <div>
                <Image src={dot} priority alt="svg-icon" />
              </div>
              <div className="my-2">
                {/* <p className="text-[#F0EFDA]  lg:text-[33.13px] lg:leading-[39.76px] font-[500]"> */}
                <p className="lg:text-[33.13px] text-[#F0EFDA] lg:leading-[39.76px] text-xl lg:text-lg lg: leading-[1.25]">

                  The Zone, Gbagada, Lagos.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 my-2">
              <Stats icon={attendess} statsnum={"1.5k+"} desc="Attendees" />
              <Stats icon={speakers} statsnum={"50+"} desc="Speakers" />
              <Stats icon={sponsors} statsnum={"15+"} desc="Sponsors" />
            </div>
            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mt-4">
              <Link href="#">
                <Button className="cta_header py-2 px-6 text-[20px] leading-[24px] rounded-lg">
                  Register
                </Button>
              </Link>

              <Link href="#">
                <button className="border-[3px] py-2 px-12 border-dashed border-gray-400 text-[#F0EFDA] text-[20px] leading-[24px] rounded-lg">
                  Sponsor next event
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-24 md:mt-0 lg:mt-0">
            <Image src={banner} alt="event-banner" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
