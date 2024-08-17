import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoMdLogOut } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const router = useRouter();


  useEffect(() => {
    const formatDate = (date: Date): string => {
      return format(date, "EEEE do MMMM, yyyy", { locale: enUS });
    };

    setCurrentDate(formatDate(new Date()));
  }, []);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    router.push("/hackathon");
  };

  return (
    <div className="flex w-full flex-row-reverse items-start justify-between">
      <div className="flex justify-end w-fit">
        <IoIosNotificationsOutline className="w-10 h-6" />
        <button onClick={toggleDropdown} className="group text-black  relative">
          <MdOutlineAccountCircle className="w-8 h-6" />
          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 rounded-lg shadow w-32 right-0  bg-[#fff]">
              <div className="py-2">
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-start gap-3 justify-start text-start w-full px-4 py-2 text-black hover:bg-gray-100"
                >
                  <IoMdLogOut className="w-4 h-8 mr-2" />
                  <span>Logout</span>
                  <Link href="/hackathon/updateuser"><span>Edit Profile</span></Link>
                </button>
              </div>
            </div>
          )}
        </button>
      </div>
      <div className="w-full flex justify-center items-center sm:justify-start">
        <div>
          <h1 className="text-2xl text-black text-start font-bold mr-20">
            Welcome, {user ? user.first_name : "Guest"}!
          </h1>
          <h3 className="text-black mr-40 text-start">{currentDate}</h3>
        </div>
      </div>
    </div>
  );
};

export default HackathonHeader;
