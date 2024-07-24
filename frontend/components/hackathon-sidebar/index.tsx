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
    <div className=" fixed w-64 h-full left-0 top-16 border-r bg-[#0096FF] rounded-tr-3xl rounded-br-3xl ">
      <div className="h-full px-3 py-4 text-white">
        <div className="">
          <Image
            src={"/Logo.png"}
            alt="..."
            height={100}
            width={200}
            className=""
          />
        </div>
        <div className="mt-24 text-1xl px-12">
          <div className="py-2 mb-2 rounded-lg hover:shadow hover:bg-white-500  hover:text-black">
            <Link
              href="/hackathon/dashboard"
              className="flex rounded-md space-x-2"
            >
              <IoHomeOutline className="w-8 h-6 " />
              <p className="text-center">Home</p>
            </Link>
          </div>

          <div className="py-2 mb-2 rounded-lg hover:shadow hover:bg-white-500  hover:text-black">
            <Link href="/schedule" className="flex rounded-md space-x-2">
              <AiOutlineSchedule className="w-8 h-6" />
              <p className="text-center">Schedule</p>
            </Link>
          </div>
          <div className="py-2 mb-2 rounded-lg hover:shadow hover:bg-white-500  hover:text-black">
            <Link
              href="/hackathon/team"
              className="flex rounded-md space-x-2  "
            >
              <AiOutlineTeam className="w-8 h-6" />
              <p className="text-center">Team</p>
            </Link>
          </div>
          <div className="py-2 mb-2 rounded-lg hover:shadow hover:bg-white-500  hover:text-black">
            <Link
              href="/hackathon/project"
              className="flex rounded-md space-x-2 "
            >
              <GoProjectRoadmap className="w-8 h-6" />
              <p className="text-center">Project</p>
            </Link>
          </div>
          <div className="mt-40">
            <div className="py-2 mb-2 rounded-lg hover:shadow hover:bg-white-500  hover:text-black">
              <Link href="#" className="flex rounded-md space-x-2">
                <MdOutlineContactSupport className="w-8 h-6" />
                <p className="text-center">Support</p>
              </Link>
            </div>
            <div className="py-2 mb-2 rounded-lg hover:shadow hover:bg-white-500  hover:text-black">
              <Link href="/" className="flex rounded-md space-x-2 ">
                <IoMdLogOut className="w-8 h-6" />
                <p className="text-center">Logout</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
