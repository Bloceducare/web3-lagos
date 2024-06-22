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
    <header className="fixed top-0 left-0 right-0 bg-header shadow-md z-10 p-2">
      <nav className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        <Link href="/apply/register">
          <Button className="cta_header py-2 px-6 text-[20px] leading-[24px] rounded-lg">
            Register Here
          </Button>
        </Link>
        <Link href="/apply/speaker">
          <Button className="cta_header py-2 px-6 text-[20px] leading-[24px] rounded-lg">
            Register as a Speaker
          </Button>
        </Link>
        {/* Hamburger icon for mobile */}
        <div className="lg:hidden z-[100]" >
          {menuOpen ? (
            <FaTimes onClick={toggleMenu} size={24} color="black" />
          ) : (
            <FaBars onClick={toggleMenu} size={24} color="black" />
          )}
        </div>

        {/* Navigation links */}
        <ul
          className={`${
            menuOpen ? "flex flex-col space-y-10 justify-between leading-3 absolute right-1 px-3 bg-[#fff] py-3 top-2 " : "sm:flex sm:justify-between sm:space-x-5 hidden"
          } `}
        >
          {headerLink.map((item) => (
            <Link href={item.route} key={item.name}>
              <li
                className={`text-[20px] leading-[24px] ${
                  route.pathname === item.route ? "font-bold" : "font-normal"
                }`}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
