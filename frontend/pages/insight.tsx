import React from "react";
import notes from "public/notes.svg";
import Image from "next/image";
import group from "public/group.svg";
import speech from "public/speech.svg";
import play from "public/play.svg";
import barchat from "public/bar.svg";
import barchatStat from "public/barchart.png";
import YoutubeIframe from "frontend/components/Iframe";
import Contact from "frontend/components/Contact";
function Insight() {
  return (
    <div>
      <section className="container mx-auto">
        <div className="p-8 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-x-24 items-baseline">
          <div>
            <div className="bg-[#F8B135] p-6 rounded-lg">
              <div className="flex items-center space-x-12">
                <div>
                  <Image src={notes} alt="stats" />
                </div>
                <div>
                  <p className="text-[20px] md:text-[48px] font-[500] lg:text-[48px] leading-[24.5px] md:leading-[52.8px] lg:leading-[52.8px]">
                    Total Registration
                  </p>
                  <p className="text-[20px] md:text-[48px] font-[500] lg:text-[48px] leading-[24.5px] md:leading-[52.8px] font-[700] lg:leading-[52.8px]">
                    2332
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h2 className="text-[#23242A] text-[36px] leading-[39px] font-[700]">
                Registration Breakdown -{" "}
              </h2>
              <ul className="text-[#23242A] text-[32px] leading-[35px]">
                <li>23 States in Nigeria</li>
                <li>14 African Countries</li>
                <li>3 European Countries</li>
                <li>3 Asian Countries</li>
                <li>USA and UK</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <div className="bg-[#F8B135] p-6  rounded-lg">
              <div className="flex items-center space-x-12">
                <div>
                  <Image src={group} alt="stats" />
                </div>
                <div>
                  <p className="text-[20px] md:text-[48px] font-[500] lg:text-[48px] leading-[24.5px] md:leading-[52.8px] font-[500] lg:leading-[52.8px]">
                    Total Attendance
                  </p>
                  <p className="text-[20px] md:text-[48px] font-[500] lg:text-[48px] leading-[24.5px] md:leading-[52.8px] font-[700] lg:leading-[52.8px]">
                    2447
                  </p>
                </div>
              </div>
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
        </div>

        <div className="p-8 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-x-24 items-baseline">
          <div>
            <div className="bg-[#053758] p-6   rounded-lg">
              <div className="flex items-end space-x-12">
                <div>
                  <Image src={speech} alt="stats" />
                </div>
                <div>
                  <p className=" text-[20px] md:text-[48px] font-[500]  leading-[24.5px] md:leading-[52.8px] lg:text-[48px] text-white lg:leading-[52.8px]">
                    Speakers:
                  </p>
                  <p className="text-[46px] md:text-[48px] font-[500]  leading-[59.5px] md:leading-[52.8px] lg:text-[64px] text-white lg:leading-[70.4px] font-[700]">
                    50
                  </p>
                </div>
              </div>
            </div>
            <div className="my-4">
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
                  <p className=" text-[20px] md:text-[48px] font-[500]  leading-[24.5px] md:leading-[52.8px] lg:text-[48px] text-white lg:leading-[52.8px]">
                    Total Streams
                  </p>
                  <p className="text-[46px] md:text-[48px] font-[500]  leading-[59.5px] md:leading-[52.8px] lg:text-[64px] text-white lg:leading-[70.4px] font-[700]">
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

        <div className="mt-24">
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
      <div className="mt-24">
        <Contact />
      </div>
    </div>
  );
}

export default Insight;
