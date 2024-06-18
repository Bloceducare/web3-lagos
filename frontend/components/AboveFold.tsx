import Link from "next/link";
import useTotalParticipants from "@/views/home/hooks/useTotalParticipants";

import { BsFillPeopleFill } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import DateCountDown from "./dateCountDown";
import Sponsors from "./Sponsors";
import Image from "next/image";
import Location from "../images/location.svg";
import Date from "../images/date-icon.svg";

const AboveFold = () => {
  return (
  <div className="w-full bg-hero h-auto">
    <section className=" flex flex-row justify-center items-center">
      <div className="w-[80vw] flex text-white m-auto justify-between">
      <div className="flex flex-col justify-center w-full h-[60rem] sm:w-1/2" >

        <div className="text-4xl ">
          <h1 className=" flex flex-col font-bold gap-2">
            <span className="font-bold ">Web3 Lagos</span> 
            <span className="">Conference 2024</span>
          </h1>
        
        </div>
        <div className="w-fit text-[1.3em] mt-2 leading-10">
          <p>
            The Web3 Lagos Conference is the largest Web3 Event in Lagos,
            Nigeria. This conference will bring together Web3 enthusiasts from all over
            Nigeria and beyond.
          </p>
          <p>
            Here, community meets technology for three days of intensive
            Networking and Learning experiences.
          </p>
        </div>

        <div className=" w-fit mt-16 flex flex-col gap-4 text-[#fae586]">
          <DateCountDown />

            <div className="flex flex-col items-center w-fit justify-center gap-3">
              <div className="flex justify-between w-fit  items-center text-[1.2em] font-bold">
                <div>
                  <Image src={Location} alt={"location"} width={20} height={10} />
                </div>
                <div>The Zone, Gbagada, Lagos State.</div>
              </div>
              <div className="flex justify-between">
                <div>
                  <Image src={Date} alt={"date"} width={20} height={10} />
                </div>
                <div>September 05 - September 07, 2024</div>
              </div>
            </div>
           
          </div>

          <div className="flex items-center space-x-4 mt-16">
            <div className="flex items-center space-x-2">
              <div>
                <img alt="stats-icon" width="49" height="49" decoding="async" data-nimg="1" src="/attendees.svg" /></div>
                <div><span className="block text-[#F0EFDA] text-2xl md:text-3xl leading-tight font-semibold">1.5k+</span>
                <span className="font-normal text-sm md:text-base leading-tight text-[#F0EFDA]">Attendees</span>
                </div></div><div className="flex items-center space-x-2">
                  <div><img alt="stats-icon"  width="45" height="45" decoding="async" data-nimg="1" src="/speakers.svg"/>
                  </div><div><span className="block text-[#F0EFDA] text-2xl md:text-3xl leading-tight font-semibold">50+</span>
                  <span className="font-normal text-sm md:text-base leading-tight text-[#F0EFDA]">Speakers</span>
                  </div></div><div className="flex items-center space-x-2">
                    <div>
                      <img alt="stats-icon" width="45" height="45" decoding="async" data-nimg="1" src="/sponsor.svg" /></div>
                <div>
                  <span className="block text-[#F0EFDA] text-2xl md:text-3xl leading-tight font-semibold">15+</span>
                <span className="font-normal text-sm md:text-base leading-tight text-[#F0EFDA]">Sponsors</span>
                </div>
                </div>
                </div>

<a href="https://drive.google.com/file/d/12NdPRIdl13EW6X8sX7Hrzr-M4WfAkW06/view" target="_blank" className="cta_header w-fit p-2 rounded-xl text-xl mt-4">Sponsor&apos;s Deck</a>

</div>
      <div className="mt-[80px]">
        <Image src='/bgimage.webp'  width={300} height={300} alt='bgimg' />
        </div>
        </div>

        
     {/* // looks wierd on mobile please fix  */}
        {/* <div className="md:hidden lg:hidden grid justify-center mb-24">
          <div className="flex">
            <div>
              <Image src={Location} alt={"location"} width={20} height={10} />
            </div>
            <div>The Zone, Gbagada, Lagos State.</div>
          </div>
          <div className="flex">
            <div>
              <Image src={Date} alt={"date"} width={20} height={10} />
            </div>
            <div>September 05 - September 07, 2024</div>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default AboveFold;
