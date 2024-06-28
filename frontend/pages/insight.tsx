import React from "react";
import notes from "../public/notes.svg";
import Image from "next/image";
import group from "../public/group.svg";
import speech from "../public/speech.svg";
import play from "../public/play.svg";
import barchat from "../public/bar.svg";
import barchatStat from "../public/barchart.png";
import { YoutubeIframe, Contact } from "@/components";
import { DataFetcher } from "../components";

const Insight: React.FC = () => {
  type IconBoxProps = {
    value: string;
    title: string;
    src: string;
  };

  const IconBox: React.FC<IconBoxProps> = ({ src, title, value }) => (
    <div className="w-[26rem] bg-[#ffffff] flex-shrink-0">
      <div className="flex w-full shadow-xl rounded-lg justify-between pl-10 py-8">
        <div className="w-[35%] h-[8rem] flex justify-center items-center bg-[#ccc] rounded-full">
          <Image src={src} alt="stats" />
        </div>
        <div className="w-[50%] space-y-0 m-auto">
          <p className="text-[20px] text-[#454c70] font-[700] md:text-[48px] lg:text-[50px] text-center leading-[24.5px] md:leading-[52.8px] lg:leading-[52.8px]">
            {value}
          </p>
          <p className="text-[20px] text-center text-[#23242A] font-[600] lg:text-[20px] leading-[24.5px] md:leading-[52.8px] lg:leading-[52.8px]">
            {title}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center w-full pt-[7.5rem] bg-[#fdfdfd]">
      <section className="lg:px-6 lg:max-w-screen-lg xl:max-w-screen-xl">
        <h1 className="text-[#053758] font-[700] text-[2.6rem] tracking-wider mb-[2rem]">Event Overview</h1>
        <div className="gap-x-24 items-baseline">
          <div className="w-full overflow-x-scroll flex flex-col justify-center">
            <div className="flex pb-10 gap-10 w-max">
              <DataFetcher>
                {({ registrations }) => (
                  <IconBox src={notes} title="Total Registration" value={registrations.length > 0 ? `${registrations.length}` : '0'} />
                )}
              </DataFetcher>

              <DataFetcher>
                {({ registrations }) => (
                  <IconBox src={group} title="Total Attendance" value="2447" />
                )}
              </DataFetcher>

              <DataFetcher>
                {({ speakers }) => (
                  <IconBox src={speech} title="Speakers" value={speakers.length > 0 ? `${speakers.length}` : '0'} />
                )}
              </DataFetcher>

              <DataFetcher>
                {({ registrations }) => (
                  <IconBox src={play} title="Total Streams" value="3,161" />
                )}
              </DataFetcher>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-[#23242A] text-[36px] leading-[39px] font-[700]">
              Registration Breakdown
            </h2>
            <ul className="text-[#23242A] text-[22px] flex mt-[2rem] gap-5 leading-[35px]">
              <li className="w-full bg-[#ffffff] shadow-xl rounded-lg px-5 py-4">23 States in Nigeria</li>
              <li className="w-full bg-[#ffffff] shadow-xl rounded-lg px-5 py-4">14 African Countries</li>
              <li className="w-full bg-[#ffffff] shadow-xl rounded-lg px-5 py-4">3 European Countries</li>
              <li className="w-full bg-[#ffffff] shadow-xl rounded-lg px-5 py-4">3 Asian Countries</li>
              <li className="w-full bg-[#ffffff] shadow-xl rounded-lg px-5 py-4">USA and UK</li>
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-[#23242A] text-[36px] leading-[39px] font-[700]">
              Attendance Breakdown -{" "}
            </h2>
            <ul className="text-[#23242A] text-[32px] leading-[35px]">
              <li>
                <span>Day 1:</span> States in Nigeria
              </li>
              <li>
                <span>Day 2:</span> African Countries
              </li>
              <li>
                <span>Day 3:</span> European Countries
              </li>
            </ul>
          </div>
        </div>

        <div className="p-8 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-x-24 items-baseline">
          <div>
            <div className="bg-[#053758] p-6 rounded-lg">
              <div className="flex items-end space-x-12">
                <div>
                  <Image src={speech} alt="stats" />
                </div>
                <div>
                  <p className="text-[20px] md:text-[48px] font-[500] leading-[24.5px] md:leading-[52.8px] lg:text-[48px] text-white lg:leading-[52.8px]">
                    Speakers:
                  </p>
                  <p className="text-[46px] md:text-[48px] leading-[59.5px] md:leading-[52.8px] lg:text-[64px] text-white lg:leading-[70.4px] font-[700]">
                    50
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <ul className="text-[#23242A] text-[32px] leading-[35px]">
                <li>
                  Non Technical Speaker: <br /> <span>17</span>
                </li>
                <li>
                  Technical Speakers: <br /> <span>33</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="">
            <div className="bg-[#053758] p-6 rounded-lg">
              <div className="flex self-end space-x-12">
                <div>
                  <Image src={play} alt="stats" />{" "}
                </div>
                <div>
                  <p className="text-[20px] md:text-[48px] font-[500] leading-[24.5px] md:leading-[52.8px] lg:text-[48px] text-white lg:leading-[52.8px]">
                    Total Streams
                  </p>
                  <p className="text-[46px] md:text-[48px] leading-[59.5px] md:leading-[52.8px] lg:text-[64px] text-white lg:leading-[70.4px] font-[700]">
                    3,161
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <ul className="text-[#23242A] text-[32px] leading-[35px] mr-6">
                <h3>Youtube</h3>
                <li>
                  <span>Day 1:</span> 1441
                </li>
                <li>
                  <span>Day 2:</span> 722
                </li>
                <li>
                  <span>Day 3:</span> 596
                </li>
              </ul>

              <ul className="text-[#23242A] text-[32px] leading-[35px]">
                <h3>StreamETH</h3>
                <li>
                  402 Total <br />
                  <span>Streams</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="">
          <div className="flex justify-center my-8 items-center">
            <div>
              <Image src={barchat} alt="stats_icon" />
            </div>
            <p className="text-[48px] leading-[57px] text-[#053758]">
              Statistical Summary
            </p>
          </div>

          <div className="md:flex p-2 lg:flex justify-between items-center">
            <div>
              <Image src={barchatStat} alt="stats-icon" />
            </div>

            <div className="mt-12 md:mt-0 lg:mt-0 p-4 md:p-0 lg:p-0">
              <p className="text-[#23242A] text-[48px] leading-[52px]">
                33% of Registrations
                <br /> were from newbies
                <br />
                /beginners to Web3.
                <br /> 27% were developers,
                <br /> 10% were designers
                <br />
                /marketers.
              </p>
            </div>
          </div>
        </div>
      </section>
      <YoutubeIframe />
      <div className="">
        <Contact />
      </div>
    </div>
  );
};

export default Insight;
