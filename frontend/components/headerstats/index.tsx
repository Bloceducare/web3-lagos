import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger and close icons from react-icons
import { headerLink } from "@/data";
import Button from "../button";
import { useRouter } from "next/router";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const route = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#fdfefff6] shadow-md z-10 py-2  border-[2px]">
      <nav className="flex items-center justify-between w-full lg:max-w-screen-lg xl:max-w-screen-xl mx-auto md:px-6">
        
        <div className="bg-gradient-to-r from-[#3E3797] to-[#111022] p-4 rounded-md lg:hidden  z-[100]" >
          {menuOpen ? (
            <FaTimes onClick={toggleMenu} size={24} color="white" />
          ) : (
            <FaBars onClick={toggleMenu} size={24} color="white" />
          )}
        </div>

        {/* Navigation links */}
        <ul
          className={`${
            menuOpen ? "flex flex-col space-y-6 leading-3 flex-4 h-screen absolute -left-1 top-20 bg-[#fff] py-3 " : "md:justify-between md:space-x-1 hidden lg:flex lg:w-[30%] lg:justify-between"
          } `}
        >
          {headerLink.map((item) => (
            <Link href={item.route} key={item.name}>
              <li
                className={`text-[20px] leading-[24px hover:text-[#3E3797] p-5 lg:px-0 lg:py-2 rounded-md ${
                  route.pathname === item.route ? "font-semibold text-[#3E3797]" : "font-normal"
                }`}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
        <div className="md:w-[50%] lg:w-[38%] xl:w-[30%] md:justify-between  flex justify-end">
          {/* Nav Buttons */}
          <Link href="#">
            <Button className="border-[2px] border-solid border-[#756EE97D] py-2 rounded-lg px-5 hidden md:flex">
              Register as a Speaker
            </Button>
          </Link>
          <Link href="/apply/registration">
            <Button className="bg-gradient-to-r from-[#3E3797] to-[#111022] text-white ring-[2px] border-[#756EE97D] rounded-lg px-5">
              Register Here
            </Button>
          </Link>
        </div>
        {/* Hamburger icon for mobile */}
      </nav>
    </header>
  );
}

export default Header;
