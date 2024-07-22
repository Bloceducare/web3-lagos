import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";

const HackathonHeader = () => {
  return (
    <div>
      <div className="flex justify-end mr-20 ">
        <IoIosNotificationsOutline className=" w-10 h-6 " />
        <MdOutlineAccountCircle className="w-10 h-6" />
      </div>
      <div className="  mr-80 ">
        <h1 className="text-2xl text-black font-bold mr-20 text-center">
          Welcome, Daniel Ochoja
        </h1>
        <h3 className="text-black  mr-40 text-center">
          Monday 15th July, 2024
        </h3>
      </div>
    </div>
  );
};
export default HackathonHeader;
