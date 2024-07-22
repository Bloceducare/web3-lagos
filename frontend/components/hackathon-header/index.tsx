import React, { useEffect, useState } from "react";
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
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
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
      <div className="flex justify-end mr-20 ">
        <IoIosNotificationsOutline className="w-10 h-10" />
        <MdOutlineAccountCircle className="w-10 h-10" />
      </div>
      <div className="w-fit justify-start text-start ">
        <h1 className="text-2xl text-black text-start font-bold mr-20">
          Welcome, {user ? user.first_name : "Guest"}!
        </h1>
        <h3 className="text-black mr-40 text-center">
          {currentDate}
        </h3>
      </div>
    </div>
  );
};

export default HackathonHeader;
