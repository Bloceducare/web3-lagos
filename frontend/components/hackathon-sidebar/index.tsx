import React from "react";
import Image from "next/image";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineSchedule } from "react-icons/ai";
import { GoProjectRoadmap } from "react-icons/go";
import { AiOutlineTeam } from "react-icons/ai";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";

function SideBar() {
  return (
    <div className="w-[317px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r bg-[#0096FF] rounded-tr-3xl rounded-br-3xl ">
      <div className="h-full px-3 py-4 text-white">
        <div className="">
          <Image
            src={"/Logo.png"}
            alt="..."
            height={10}
            width={20}
            className=" w-[215px] h-[60px]"
          />
        </div>
        <div className="mt-20 text-1xl px-12  ">
          <button
            type="button"
            className="flex rounded-md items-center justify-center text-center space-x-2 onhover-white"
          >
            <IoHomeOutline className="w-8 h-6 mr-2" />
            <p className="text-center">Home</p>
          </button>

          <button
            type="button"
            className="flex rounded-md items-center justify-center text-center space-x-2 mt-8"
          >
            <AiOutlineSchedule className="w-8 h-6 mr-2" />
            <p className="text-center">Schedule</p>
          </button>
          <button
            type="button"
            className="flex rounded-md items-center justify-center text-center space-x-2 mt-8"
          >
            <AiOutlineTeam className="w-8 h-6 mr-2" />
            <p className="text-center">Team</p>
          </button>
          <button
            type="button"
            className="flex rounded-md items-center justify-center text-center space-x-2 mt-8"
          >
            <GoProjectRoadmap className="w-8 h-6 mr-2" />
            <p className="text-center">Project</p>
          </button>
          <div className="mt-60 ">
            <button
              type="button"
              className="flex rounded-md items-center justify-center text-center space-x-2 mt-8"
            >
              <MdOutlineContactSupport className="w-8 h-6 mr-2" />
              <p className="text-center">Support</p>
            </button>
            <button
              type="button"
              className="flex rounded-md items-center justify-center text-center space-x-2 mt-8"
            >
              <IoMdLogOut className="w-8 h-6 mr-2" />
              <p className="text-center">Log Out</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
