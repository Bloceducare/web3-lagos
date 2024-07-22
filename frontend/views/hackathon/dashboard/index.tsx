import React from "react";
import Image from "next/image";

const Dashboard = () => {
  return (
    <div className=" p-6 ml-auto mr-20  bg-[#0096FF] w-[1020px] text-white rounded-3xl gap-0 ">
      <h1 className=" px-4 text-3xl"> Hackathon Rules</h1>
      <div className="flex items-center sm:flex-rowspace-y-3 space-x-3 mt-4 px-4">
        <Image
          src={"/Vector (6).png"}
          alt="..."
          height={10}
          width={20}
          className=" "
        />
        <h3>Web3Lagos 3.0 is happening primarily in person.</h3>
      </div>
      <div className="flex items-center sm:flex-rowspace-y-3 space-x-3 mt-4 px-4">
        <Image
          src={"/Vector (6).png"}
          alt="..."
          height={10}
          width={20}
          className=" "
        />
        <h3>Hacker teams are made up of a maximum of 5 people.</h3>
      </div>{" "}
      <div className="flex items-center sm:flex-rowspace-y-3 space-x-3 mt-4 px-4">
        <Image
          src={"/Vector (6).png"}
          alt="..."
          height={10}
          width={20}
          className=" "
        />
        <h3>
          A minimum of 3 members of your team will need to be at the venue to be
          judged; no online-only submissions
        </h3>
      </div>{" "}
      <div className="flex items-center sm:flex-rowspace-y-3 space-x-3 mt-4 px-4">
        <Image
          src={"/Vector (6).png"}
          alt="..."
          height={10}
          width={20}
          className=" "
        />
        <h3>All projects must be related to the blockchain.</h3>
      </div>{" "}
      <div className="flex items-center sm:flex-rowspace-y-3 space-x-3 mt-4 px-4">
        <Image
          src={"/Vector (6).png"}
          alt="..."
          height={10}
          width={20}
          className=" "
        />
        <h3>You cannot copy, use, or submit another team's source code.</h3>
      </div>{" "}
      <div className="flex items-center sm:flex-rowspace-y-3 space-x-3 mt-4 px-4">
        <Image
          src={"/Vector (6).png"}
          alt="..."
          height={10}
          width={20}
          className=" "
        />
        <h3>Projects must involve writing significant software.</h3>
      </div>{" "}
      <div className="flex items-center sm:flex-rowspace-y-3 space-x-3 mt-4 px-4">
        <Image
          src={"/Vector (6).png"}
          alt="..."
          height={10}
          width={20}
          className=" "
        />
        <h3>
          All code for projects must be written within the time frame of
          Hackathon, there can be no previously written code submitted to the
          judging process
        </h3>
      </div>
      <div className="flex items-center sm:flex-rowspace-y-3 space-x-3 mt-4 px-4">
        <Image
          src={"/Vector (6).png"}
          alt="..."
          height={10}
          width={20}
          className=" "
        />
        <h3>
          The judges’ decision is final in terms of determining prizes and
          awards.
        </h3>
      </div>{" "}
      <div className="flex items-center sm:flex-rowspace-y-3 space-x-3 mt-4 px-4 ">
        <Image
          src={"/Vector (6).png"}
          alt="..."
          height={10}
          width={20}
          className=" "
        />
        <h3>
          Please respect our{" "}
          <span className="text-[#FFD700] underline">Code</span>
          <span className="text-[#1ACF2C] underline"> of Conduct.</span>
        </h3>
      </div>
    </div>
  );
};

export default Dashboard;
