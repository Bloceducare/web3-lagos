import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdLogOut } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";

type User = {
  email: string;
  id: number;
  first_name: string;
  github_username: string;
  other_name: string;
};

type HackathonHeaderProps = {
  user: User | null;
};

const HackathonHeader: React.FC<HackathonHeaderProps> = ({ user }) => {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const formatDate = (date: Date): string => {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const dayName = days[date.getDay()];
      const day = date.getDate();
      const monthName = months[date.getMonth()];
      const year = date.getFullYear();

      return `${dayName} ${day}th ${monthName}, ${year}`;
    };

    setCurrentDate(formatDate(new Date()));
  }, []);

  return (
    <div className="flex w-full flex-row-reverse  items-start justify-between">
      <div className="flex justify-end  w-fit">
        <IoIosNotificationsOutline className="w-10 h-6" />

        <button className="group text-black">
          <MdOutlineAccountCircle className="w-8 h-6" />
          <div className="z-10 hidden  rounded-lg shadow w-32 group-focus:block top-full right-0 ">
            <div className="py-2 mb-2 ">
              <Link href="/hackathon" className="flex rounded-md space-x-2 ">
                <IoMdLogOut className="w-4 h-8 " />
                <p className="text-center ">Logout</p>
              </Link>
            </div>
          </div>
        </button>
      </div>
      <div className="w-full flex justify-center items-center sm:justify-start ">
        <div>
          <h1 className="text-2xl text-black text-start font-bold mr-20 ">
            Welcome, {user ? user.first_name : "Guest"}!
          </h1>
          <h3 className="text-black mr-40 text-start">{currentDate}</h3>
        </div>
      </div>
    </div>
  );
};

export default HackathonHeader;
