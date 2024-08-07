/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import HackathonHeader from "@/components/hackathon-header";
import SideBar from "@/components/hackathon-sidebar";

type User = {
  email: string;
  id: number;
  first_name: string;
  github_username: string;
  other_name: string;
};

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    console.log(userData);
  }, []);

 
  return (
    <div className="flex w-full h-full px-4 sm:px-0">
      <div className="sm:w-1/5 fixed h-screen sm:flex ">
        <SideBar />
      </div>
      <div className="flex flex-col sm:w-4/5  w-full sm:ml-[20%] sm:px-8 mt-14">
        <div className="w-full">
          <HackathonHeader user={user} />
        </div>
        <div className="w-full p-6 m-auto bg-[#0096FF] text-white rounded-3xl gap-0">
          <h1 className="px-4 text-3xl">Hackathon Rules</h1>
          <div className="flex items-center space-x-3 mt-4 px-4">
            <Image
              src={"/Vector (6).png"}
              alt="..."
              height={10}
              width={20}
              className=""
            />
            <h3>Web3Lagos 3.0 is happening primarily in person.</h3>
          </div>

          <div className="flex items-center space-x-3 mt-4 px-4">
            <Image
              src={"/Vector (6).png"}
              alt="..."
              height={10}
              width={20}
              className=""
            />
            <h3>Hacker teams are made up of a maximum of 5 people.</h3>
          </div>
          <div className="flex items-center space-x-3 mt-4 px-4">
            <Image
              src={"/Vector (6).png"}
              alt="..."
              height={10}
              width={20}
              className=""
            />
            <h3>
              A minimum of 3 members of your team will need to be at the venue
              to be judged; no online-only submissions.
            </h3>
          </div>

          <div className="flex items-center space-x-3 mt-4 px-4">
            <Image
              src={"/Vector (6).png"}
              alt="..."
              height={10}
              width={20}
              className=""
            />
            <h3>All projects must be related to the blockchain.</h3>
          </div>
          <div className="flex items-center space-x-3 mt-4 px-4">
            <Image
              src={"/Vector (6).png"}
              alt="..."
              height={10}
              width={20}
              className=""
            />
            <h3>You cannot copy, use, or submit another team's source code.</h3>
          </div>
          <div className="flex items-center space-x-3 mt-4 px-4">
            <Image
              src={"/Vector (6).png"}
              alt="..."
              height={10}
              width={20}
              className=""
            />
            <h3>Projects must involve writing significant software.</h3>
          </div>
          <div className="flex items-center space-x-3 mt-4 px-4">
            <Image
              src={"/Vector (6).png"}
              alt="..."
              height={10}
              width={20}
              className=""
            />
            <h3>
              All code for projects must be written within the time frame of
              Hackathon; there can be no previously written code submitted to
              the judging process.
            </h3>
          </div>
          <div className="flex items-center space-x-3 mt-4 px-4">
            <Image
              src={"/Vector (6).png"}
              alt="..."
              height={10}
              width={20}
              className=""
            />
            <h3>
              The judges’ decision is final in terms of determining prizes and
              awards.
            </h3>
          </div>
          <div className="flex items-center space-x-3 mt-4 px-4">
            <Image
              src={"/Vector (6).png"}
              alt="..."
              height={10}
              width={20}
              className=""
            />
            <h3>Please respect our code of conduct</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
