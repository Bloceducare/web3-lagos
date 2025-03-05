/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import useTotalParticipants from "@/views/home/hooks/useTotalParticipants";
import LekkiImg from '../images/lekki.png'
import Bridge from '../images/bridge.png'

import Button from "./button";
import { BsFillPeopleFill } from "react-icons/bs";
import DateCountDown from "./dateCountDown";
import { FaPaperPlane, FaMapMarkerAlt, FaRegCalendarAlt, FaUserNinja } from "react-icons/fa";

import Sponsors from "./Sponsors";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import heroImage from "../public/bg.png"

type ProgressProps = {
  Title: string;
  number: string;
  imageSrc: string | null;
}

const Progress: React.FC<ProgressProps> = ({ Title, number, imageSrc }) => {
  return (
    <div className="flex items-center space-x-2 ">
      <div>
        {imageSrc ? (
          <Image alt="stats-icon" width="49" height="49" decoding="async" data-nimg="1" src={imageSrc} />
        ) : (
          <FaUserNinja className="text-3xl text-[#F0EFDA]" />  
        )}
      </div>
      <div>
        <span className="block text-[#F0EFDA] text-2xl md:text-3xl leading-tight font-semibold">{number}</span>
        <span className="font-normal text-sm md:text-base leading-tight text-[#F0EFDA]">{Title}</span>
      </div>
    </div>
  );
};


type containerProps = {
  Content: string;
}

const TextContainer:React.FC<containerProps> = ({Content}) => (
  <div className="bg-[#FFFFFF4F] px-5 py-2 border-[2px] rounded-[50px] text-white">
    {Content}
  </div>
)

const AboveFold = () => {
  const [registrations, setRegistrations] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [hackers, setHackers] = useState([]);

  console.log(registrations)

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        const generalRegistrations = await fetch('https://web3lagosbackend.onrender.com/api/general-registrations/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
          },
        });

        const speakerRegistrations = await fetch('https://web3lagosbackend.onrender.com/api/speaker-registrations/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
          },
        });

        const hackerrRegistrations = await fetch('https://web3lagosbackend.onrender.com/users/users/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
          },
        });

        const generalData = await generalRegistrations.json();
        const speakerData = await speakerRegistrations.json();
        const hackers = await hackerrRegistrations.json();
        
        setRegistrations(generalData);  
        setSpeakers(speakerData);  
        setHackers(hackers)
      } catch (error) {
        console.error('Error fetching registration data:', error);
      }
    }

    fetchRegistrations();
  }, []);


  return (
    <>
    <div className="relative w-full h-screen">
  <Image src={LekkiImg} alt="lekki" className="w-full h-[45%]   sm:h-[70vh] md:h-[100vh]  xl:h-[92vh] mt-44 sm:mt-24 ml-[15%] lg:ml-[10%] xl:ml-[20%] object-contain relative  " />

  <div className="absolute inset-0 top-[100px] md-custom:top-[150px]  sm:top-[230px] md:top-[400px] lg:top-[450px] w-full h-full">
    <Image src={Bridge} alt="bridge" className="w-full h-full object-contain" />
  </div>
</div>

    <div className="w-full sm:h-fit flex items-center -mt-72 sm:bg-top bg-no-repeat text-black pt-[9rem] pb-[3rem] justify-center px-4 sm:-mt-40 sm:px-5 py-4 md:-mt-10 xl:mt-14 lg:mt-24 font-dmSans">
    <section className="flex flex-col justify-center space-y-7 items-center text-center lg:max-w-screen-lg xl:max-w-screen-xl">
      {/* <div className="w-full flex text-white m-auto justify-between"> */}
        {/* <div className="flex flex-col justify-center w-full"> */}
        {/* <div className="flex flex-wrap space-y-6 lg:space-y-0 lg:flex-nowrap justify-center lg:space-x-20 lg:justify-between mb-8">
          <TextContainer Content="100% Remote Discord" />
          <TextContainer Content="Friday, June 28th @4pm (GMT-3) to Sunday, June 30thRemote Discord" />
        </div> */}
        
        <section className="relative w-[95%] lg:w-[70%]">
        <div className="absolute top-[-400px] md:top-[-500px] lg:top-[-650px] xl:top-[-650px]">

          <div className=" w-full px-4 lg:w-[100%] xl:w-full text-sm md:text-[1.1em] lg:my-5 leading-6  ">
            <p>
            The Web3 Lagos Conference is the largest Web3 Event in Lagos, Nigeria. This conference will bring together Web3 enthusiasts from all over Nigeria and beyond.
            </p>
            {/* <p>
            Here, community meets technology for three days of intensive Networking and Learning experiences. Future of money, you deserve to be in the know!
            </p> */}
          </div>
          <div className="flex justify-center gap-2 md:gap-10 flex-wrap md:flex-nowrap mt-5">
          <div className="flex items-center text-sm md:text-[1.1em] lg:text-[16px] font-medium">
            <FaMapMarkerAlt className="text-[#188BE0] mr-2" />
            <div>The Zone, Gbagada, Lagos State.</div>
          </div>
          <div className="flex items-center text-sm md:text-[1.1em] lg:text-[1em] font-medium">
            <FaRegCalendarAlt className="text-[#188BE0] mr-2" />
            <div>August 28 - August 30, 2025</div>
          </div>

            </div>
          <div className="flex items-center gap-5 justify-center space-x-0 md:space-x-10 md:gap-10 mt-10">
            <Link href="/apply/registration">
              <Button className="bg-[#188BE0] text-white lg:text-xl rounded-lg px-6">
                Register Here
              </Button>
            </Link>

            <Link href="https://drive.google.com/file/d/1_OfxyQ2MTWCkLQkai5y0LfCvnjkruOEr/view?usp=sharing" target="_blank">
              <Button className="border-[2px] w-full px-5 border-solid border-[#188BE0] text-[#188BE0] rounded-lg">
                Sponsor's Deck
              </Button>
            </Link>
          </div>

          </div>
        </section>
       
        <div className="w-screen flex flex-col gap-4 text-black bg-[#188BE0] h-[280px] xl:h-[230px]">
  <div className="flex flex-col items-center w-full justify-center gap-3">
    <div className="relative  mr-[80%]">
    <DateCountDown endDate={new Date("2025-08-28T00:00:00")} />
    </div>

    <div className="flex flex-wrap lg:flex-nowrap items-center gap-6 md:space-y-0 md:space-x-10 my-8 justify-between w-full px-4 md:px-32 mt-32 md:mt-48 xl:mt-32">
      <Progress Title="Attendee" number={registrations.length > 0 ? `${registrations.length}` : '--'} imageSrc="/attendees.svg" />
      <Progress Title="Speakers" number={speakers.length > 0 ? `${speakers.length}` : '--'} imageSrc="/speakers.svg" />
      <Progress Title="Sponsors" number="6+" imageSrc="/sponsor.svg" />
      {/* <Progress Title="Hackers" number={hackers.length > 0 ? `${hackers.length}` : '--'} imageSrc={null} /> */}
    </div>
  </div>
</div>



      {/* </div> */}
      {/* </div> */}
    </section>
  </div>
  </>
  );
};

export default AboveFold;
