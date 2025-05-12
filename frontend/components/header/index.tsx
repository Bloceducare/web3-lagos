/* eslint-disable @next/next/no-html-link-for-pages */
import { ReactNode, useState } from "react";
import { HiSpeakerphone, HiOutlineNewspaper, HiCalendar } from "react-icons/hi";
import Link from "next/link";

interface IiconWrapperProps {
  children: ReactNode;
  className?: string;
}
export const IconWrapper = ({
  children,
  className = "text-blue-900",
}: IiconWrapperProps) => {
  return <span className={`text-3xl  ${className}`}>{children}</span>;
};
const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* This example requires Tailwind CSS v2.0+ */}
      <div className="relative bg-white border-b-2 border-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6">
          <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <a className="flex items-center">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="w-auto h-8 mr-1 sm:h-10"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/01/Ethereum_logo_translucent.svg"
                    alt=""
                  />
                  <span className="font-mono text-xl font-semibold ">
                    Lagos
                  </span>
                </a>
              </Link>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                onClick={() => setOpen(!open)}
              >
                <span className="sr-only">Open menu</span>
                {/* Heroicon name: outline/menu */}
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <nav className="hidden space-x-10 md:flex">
              <Link href="/agenda">
                <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Agenda
                </a>
              </Link>

              <Link href="/speakers">
                <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Speakers
                </a>
              </Link>
              <Link href="/eventbrite">
                <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Event Brite
                </a>
              </Link>
            </nav>
            <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
              <button
                disabled
                className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm whitespace-nowrap hover:bg-red-700"
              >
                Buy Tickets
              </button>
            </div>
          </div>
        </div>
        {/*
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: ""
      To: ""
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  */}

        <div
          className={
            open
              ? "opacity-100 scale-100 transition ease-out duration-200 absolute top-0 inset-x-0 p-2  transform origin-top-right md:hidden "
              : "opacity-0 scale-0 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          }
        >
          <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
              <div>
                  <img
                    alt="logo"
                    className="w-auto h-8"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/01/Ethereum_logo_translucent.svg"
                  />
                </div>  
                <div className="-mr-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="sr-only">Close menu</span>
                    {/* Heroicon name: outline/x */}
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <IconWrapper>
                    <Link href="/speakers">
                      <a className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50">
                        <HiSpeakerphone />
                        <span className="ml-3 text-base font-medium text-gray-900">
                          Speakers
                        </span>
                      </a>
                    </Link>
                  </IconWrapper>

                  <IconWrapper>
                    <Link href="/agenda">
                      <a className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50">
                        <HiOutlineNewspaper />
                        <span className="ml-3 text-base font-medium text-gray-900">
                          Agenda
                        </span>
                      </a>
                    </Link>
                  </IconWrapper>

                  <IconWrapper>
                    <Link href="/eventbrite">
                      <a className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50">
                        <HiCalendar />
                        <span className="ml-3 text-base font-medium text-gray-900">
                          EventBrite
                        </span>
                      </a>
                    </Link>
                  </IconWrapper>
                </nav>
              </div>
            </div>
            <div className="px-5 py-6 space-y-6">
              <div>
                <button
                  disabled
                  className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700"
                >
                  Buy Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
