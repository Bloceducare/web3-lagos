/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { headerLink } from "@/data";
import Button from "../button";
import { useRouter } from "next/router";
import Image from "next/image";
import Event from "@/public/web3event.png"

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const route = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  return (
    <header className="fixed top-0 left-0 right-0 bg-[#fdfefff6] shadow-md z-10 py-4  border-[2px] font-dmSans px-5 lg:px-14 w-full">

      <nav className="flex justify-between items-center max-w-screen-2xl mx-auto">
      <div className="shadow-xl text-[#188BE0] px-3">
        <Link href="/" className="flex items-center gap-4">
        <Image src={Event} alt="event" />
        <p className="text-[20px] font-semibold">Web3lagos Event</p>
        </Link>
      </div>

      <div className="justify-between gap-5 items-center hidden md:flex">
        <a href="/apply/registration" className="text-[16px]  font-semibold ">
        Event
        </a>

        <a href="/livestream" className="text-[16px]  font-semibold ">
        Live Stream
        </a>

        <Link href="#" className="text-[16px]  font-semibold ">
        Resources
        </Link>
      </div>


      <div className="justify-between gap-7 items-center hidden md:flex">
        <a href="/apply/registration" className="text-[16px] bg-[#0096FF] text-white px-6 py-2 rounded-md font-semibold ">
        Register
        </a>

        <a href="/apply/speaker"  className="text-[16px] text-[#0096FF] border px-6 py-2 rounded-md font-semibold">
        Register as a Speaker
        </a>
      </div>


      <div className="ring-[2px] ring-[#000] p-3 rounded-md md:hidden z-[100]">
      {menuOpen ? (
        <FaTimes onClick={toggleMenu} size={22} color="black" />
      ) : (
        <FaBars onClick={toggleMenu} size={22} color="black" />
      )}
    </div>
      </nav>

      {menuOpen ? (
        <div className="flex flex-col justify-center gap-5 items-center mt-10">
             <Link href="" className="text-[16px] ">
        Register
        </Link>

        <Link href="" className="text-[16px] ">
        Become a Sponsor
                </Link>
        </div>
      ) : (
        <div></div>
      )
      }
    
    </header>
  );
}

export default Header;


{/* <nav className="flex items-center justify-between w-full px-4 lg:max-w-screen-lg xl:max-w-screen-xl mx-auto md:px-6">
<div className="ring-[2px] ring-[#000] p-3 rounded-md lg:hidden z-[100]">
  {menuOpen ? (
    <FaTimes onClick={toggleMenu} size={22} color="black" />
  ) : (
    <FaBars onClick={toggleMenu} size={22} color="black" />
  )}
</div>

{/* Navigation links */}
{/* <ul onClick={() => {setMenuOpen(false)}}
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
</ul> */}
{/* <div className="md:w-[55%] lg:w-[43%] xl:w-[33%] md:justify-between  flex justify-end">
  // {/* Nav Buttons */}
  // <Link href="/apply/speaker">
  //   <Button className="border-[2px] border-solid border-[#000] py-2 rounded-lg px-5 text-lg hidden md:flex">
  //     Register as a Speaker
  //   </Button>
  // </Link>
  // <Link href="/apply/registration">
  //   <Button className="bg-[#000] text-white lg:text-xl rounded-lg px-5 md:py-[0.6rem]">
  //     Register Here
  //   </Button>
  // </Link>

 
// </div> */}
// {/* Hamburger icon for mobile */}
// </nav> */}
