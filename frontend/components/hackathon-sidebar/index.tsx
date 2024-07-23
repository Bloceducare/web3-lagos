import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineSchedule } from "react-icons/ai";
import { GoProjectRoadmap } from "react-icons/go";
import { AiOutlineTeam } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";

function SideBar() {
  return (
    <div className="w-full h-full pb-20 pt-10 left-0 top-16 border-r bg-[#0096FF] rounded-tr-3xl rounded-br-3xl">
      <div className="h-full  px-3 py-4 text-white">
        <div className="">
          <Image
            src={"/Logo.png"}
            alt="..."
            height={100}
            width={200}
            className=""
          />
        </div>
        <div className="mt-20 text-1xl px-12">
          <Link href="/hackathon/dashboard" className="flex rounded-md space-x-2 ">
            <IoHomeOutline className="w-8 h-6" />
            <p className="text-center">Home</p>
          </Link>

          <Link href="/hackathon/schedule" className="flex rounded-md space-x-2 mt-8 ">
            <AiOutlineSchedule className="w-8 h-6" />
            <p className="text-center">Schedule</p>
          </Link>

          <Link href="/hackathon/team" className="flex rounded-md space-x-2 mt-8 ">
            <AiOutlineTeam className="w-8 h-6" />
            <p className="text-center">Team</p>
          </Link>

          <Link href="/hackathon/project" className="flex rounded-md space-x-2 mt-8 ">
            <GoProjectRoadmap className="w-8 h-6" />
            <p className="text-center">Project</p>
          </Link>

          <div className="mt-32">
            <Link href="#" className="flex rounded-md space-x-2 mt-8 ">
              <MdOutlineContactSupport className="w-8 h-6" />
              <p className="text-center">Support</p>
            </Link>

            <Link href="/" className="flex rounded-md space-x-2 mt-8 ">
              <IoMdLogOut className="w-8 h-6" />
              <p className="text-center">Logout</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
