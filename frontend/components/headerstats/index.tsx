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
    <header className="fixed top-0 left-0 right-0 bg-header shadow-md z-10 p-4">
      <nav className="flex items-center lg:justify-start md:justify-between sm:justify-between w-full max-w-screen-xl mx-auto">
        <Link href="#">
          <Button className="cta_header py-2 px-6 text-[20px] leading-[24px] rounded-lg">
            Register Here
          </Button>
        </Link>

        {/* Hamburger icon for mobile */}
        <div className="lg:hidden">
          {menuOpen ? (
            <FaTimes onClick={toggleMenu} size={24} color="black" />
          ) : (
            <FaBars onClick={toggleMenu} size={24} color="black" />
          )}
        </div>

        {/* Navigation links */}
        <ul
          className={`${
            menuOpen ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row lg:space-x-10 space-y-5 lg:space-y-0 items-center lg:items-center w-full lg:w-auto`}
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
