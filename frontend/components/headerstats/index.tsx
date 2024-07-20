import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
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
      <nav className="flex items-center justify-between w-full px-4 lg:max-w-screen-lg xl:max-w-screen-xl mx-auto md:px-6">
        <div className="ring-[2px] ring-[#000] p-3 rounded-md lg:hidden z-[100]">
          {menuOpen ? (
            <FaTimes onClick={toggleMenu} size={22} color="black" />
          ) : (
            <FaBars onClick={toggleMenu} size={22} color="black" />
          )}
        </div>

        {/* Navigation links */}
        <ul onClick={() => {setMenuOpen(false)}}
          className={`${
            menuOpen

              ? "flex flex-col space-y-6 leading-3 flex-4 h-screen absolute -left-1 top-20 bg-[#fff] py-3 "
              : "md:justify-between md:space-x-1 hidden lg:flex lg:w-[30%] lg:justify-between"
          } `}
        >

          {headerLink.map((item) => (
            <Link href={item.route}  key={item.name}>
              <li
                className={`text-[20px] leading-[24px hover:text-[#0D2033] p-5 lg:px-0 lg:py-2 rounded-md ${
                  route.pathname === item.route
                    ? "font-semibold text-[#0D2033]"
                    : "font-normal"

                }`}
              >

                {item.name}
              </li>
            </Link>
          ))}
            <Link href="/apply/speaker">
              <li
                className={`text-[20px] leading-[24px hover:text-[#0D2033]  flex lg:hidden p-5 lg:px-0 lg:py-2 rounded-md ${
                  route.pathname === "/apply/speaker"
                    ? "font-semibold text-[#0D2033]"
                    : "font-normal"
                }`}>
                Speaker Registration
              </li>
            </Link>
        </ul>
        <div className="md:w-[55%] lg:w-[43%] xl:w-[33%] md:justify-between  flex justify-end">
          {/* Nav Buttons */}
           <Link href="/hackathon/registration">
            <Button className="border-[2px] border-solid border-[#000] py-2 rounded-lg px-5 text-lg hidden md:flex">
              Hackaton Registration
            </Button>
          </Link>
          <Link href="/apply/speaker">
            <Button className="border-[2px] border-solid border-[#000] py-2 rounded-lg px-5 text-lg hidden md:flex">
              Register as a Speaker
            </Button>
          </Link>
          <Link href="/apply/registration">
            <Button className="bg-[#000] text-white lg:text-xl rounded-lg px-5 md:py-[0.6rem]">
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
