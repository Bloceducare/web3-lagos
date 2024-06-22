/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import useTotalParticipants from "@/views/home/hooks/useTotalParticipants";

import Button from "./button";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import DateCountDown from "./dateCountDown";
import Sponsors from "./Sponsors";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type ProgressProps = {
  Title: string;
  number: string;
  imageSrc: string;
}

const Progress: React.FC<ProgressProps> = ({ Title, number, imageSrc }) => {
  return (
    <div className="flex items-center space-x-2">
      <div>
        <img alt="stats-icon" width="49" height="49" decoding="async" data-nimg="1" src={imageSrc} />
      </div>
      <div>
        <span className="block text-[#F0EFDA] text-2xl md:text-3xl leading-tight font-semibold">{number}</span>
        <span className="font-normal text-sm md:text-base leading-tight text-[#F0EFDA]">{Title}</span>
      </div>
    </div>
  )
}

const AboveFold = () => {
  const [registrations, setRegistrations] = useState([]);
  const [speakers, setSpeakers] = useState([]);

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

        const generalData = await generalRegistrations.json();
        const speakerData = await speakerRegistrations.json();
        
        setRegistrations(generalData);  
        setSpeakers(speakerData);  
      } catch (error) {
        console.error('Error fetching registration data:', error);
      }
    }

    fetchRegistrations();
  }, []);
  return (
    <div className="w-full flex bg-hero justify-center px-4 sm:px-8 py-4">
    <section className="flex justify-center items-center">
      <div className="w-full flex text-white m-auto justify-between">
        <div className="flex flex-col justify-center w-full">

        <div className="text-[3.5rem] ">
          <div className=" flex flex-col justify-center w-fit font-bold">
            <h1 className="leading-[4rem]">Web3 Lagos Conference 
              <span className="text-[4rem] md:text-3xl lg:text-4xl font-normal">
                  {" "}
                  3.0
                </span>
            </h1> 
          </div>
        
        </div>
        <div className="w-auto text-[1.1em] mt-2 leading-8">
          <p>
            The Web3 Lagos Conference is the largest Web3 Event in Lagos,
            Nigeria. This conference will bring together Web3 enthusiasts from all over
            Nigeria and beyond.
          </p>
        </div>

        <div className=" w-fit mt-4 flex flex-col gap-4 text-[#fae586]">
          <DateCountDown />

          <div className="flex flex-col items-center w-fit justify-center gap-3">
            <div className="flex items-center text-[1.4em] font-bold">
              <FaMapMarkerAlt className="text-[#fae586] mr-2" />
              <div>The Zone, Gbagada, Lagos State.</div>
            </div>
            <div className="flex items-center text-[1.2em] font-bold">
              <FaRegCalendarAlt className="text-[#fae586] mr-2" />
              <div>September 05 - September 07, 2024</div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4 my-8 justify-between w-fit">
          <Progress Title="Attendee" number={registrations.length > 0 ? `${registrations.length}`: '--'} imageSrc="/attendees.svg" />
          <Progress Title="Speakers" number={speakers.length > 0 ? `${speakers.length}`: '--'} imageSrc="/speakers.svg" />
          <Progress Title="Sponsors" number="15+" imageSrc="/sponsor.svg" />
        </div>

        <div className="w-full space-x-1.5 flex justify-between">
          <Link href="/apply/registration">
            <Button className="cta_header w-full py-3 px-1 sm:py-5 sm:px-6 rounded-lg">
              Register Here
            </Button>
          </Link>

          <Link href="https://drive.google.com/file/d/12NdPRIdl13EW6X8sX7Hrzr-M4WfAkW06/view" target="_blank">
            <button className="border-[1px] w-full py-3 px-1 sm:py-5 sm:px-6 border-dashed border-gray-400 text-[#F0EFDA] rounded-lg">
              Sponsor's Deck
            </button>
          </Link>
        </div>

      </div>
      <div className="w-fit justify-end h-full relative ">
            <Image src='/bgimage.webp' width={370} height={350} alt='bgimg' className=" right-0" />
          </div>
      </div>
    </section>
  </div>
  );
};

export default AboveFold;
