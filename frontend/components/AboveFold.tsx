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

import heroImage from "../public/bg.png"

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

  const backgroundImageStyle = {
    backgroundImage: "url('../public/bg.png')",
  };

  return (
    <div className="w-full h-fit flex items-center bg-top bg-no-repeat bg-[#100F21] pt-[9rem] pb-[3rem] justify-center px-4 sm:px-8 py-4 bg-[url('../public/bg.png')]  bg-cover">
    <section className="flex flex-col justify-center space-y-7 items-center text-center lg:max-w-screen-lg xl:max-w-screen-xl">
      {/* <div className="w-full flex text-white m-auto justify-between"> */}
        {/* <div className="flex flex-col justify-center w-full"> */}
        <div className="flex flex-wrap space-y-6 lg:space-y-0 lg:flex-nowrap justify-center lg:space-x-20 lg:justify-between mb-8">
          <TextContainer Content="100% Remote Discord" />
          <TextContainer Content="Friday, June 28th @4pm (GMT-3) to Sunday, June 30thRemote Discord" />
        </div>


        <div className="text-[2.6rem] lg:text-[3.5rem]">
          <div className=" flex flex-col justify-center w-fit font-bold">
            <h1 className="leading-[4rem] text-white">Web3 Lagos Conference 
              <span className="text-[2.6rem] lg:text-[4rem] md:text-3xl lg:text-4xl font-normal">
                  {" "}
                  3.0
                </span>
            </h1> 
          </div>
        </div>

        <div className=" w-full px-4 lg:w-[70%] xl:w-[60%] text-[1.1em] lg:my-5 leading-8 text-white">
          <p>
            The Web3 Lagos Conference is the largest Web3 Event in Lagos,
            Nigeria. This conference will bring together Web3 enthusiasts from all over
            Nigeria and beyond.
          </p>
          <p>
          Here, community meets technology for three days of intensive Networking and Learning experiences. Future of money, you deserve to be in the know!
          </p>
        </div>
        <div className="flex flex-col space-y-4 items-center md:space-y-0 md:flex-row justify-center space-x-0 md:space-x-10 md:justify-between">
          <Link href="/apply/registration">
            <Button className="bg-gradient-to-r from-[#3E3797] to-[#111022] text-white ring-[2px] border-[#756EE97D] rounded-lg px-5 w-full sm:px-6">
              Register Here
            </Button>
          </Link>

          <Link href="https://drive.google.com/file/d/12NdPRIdl13EW6X8sX7Hrzr-M4WfAkW06/view" target="_blank">
            <Button className="border-[2px] w-full px-1 sm:px-6 border-solid border-[#756EE97D] text-[#F0EFDA] rounded-lg">
              Sponsor's Deck
            </Button>
          </Link>
        </div>

        <div className=" w-fit mt-10 flex flex-col gap-4 text-white">

          <div className="flex flex-col items-center w-fit justify-center gap-3">
            <div className="flex items-center text-[1.1em] lg:text-[1.4em] font-medium">
              <FaMapMarkerAlt className="text-[#fae586] mr-2" />
              <div>The Zone, Gbagada, Lagos State.</div>
            </div>

          <DateCountDown />

        <div className="flex flex-wrap lg:flex-nowrap items-center space-y-8 md:space-y-0 md:space-x-10 my-8 justify-between w-[88%] md:w-fit">
          <Progress Title="Attendee" number={registrations.length > 0 ? `${registrations.length}`: '--'} imageSrc="/attendees.svg" />
          <Progress Title="Speakers" number={speakers.length > 0 ? `${speakers.length}`: '--'} imageSrc="/speakers.svg" />
          <Progress Title="Sponsors" number="15+" imageSrc="/sponsor.svg" />
          <Progress Title="Hackers" number={registrations.length > 0 ? `${registrations.length}`: '--'} imageSrc="/attendees.svg" />
        </div>
          </div>
        </div>

      {/* </div> */}
      {/* </div> */}
    </section>
  </div>
  );
};

export default AboveFold;
