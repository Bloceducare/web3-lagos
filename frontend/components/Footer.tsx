import React from "react";
import Link from "next/link";
import Image from "next/image";
import x from "@/assets/fonts/landingpage/x.png";
const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-[#98A2B3]">Enquiries/Details:</span>
            <Link
              href="mailto:event@web3bridge.com"
              className="text-[#98A2B3] hover:text-blue-300 transition-colors"
            >
              event@web3bridge.com
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-300 transition-colors"
            >
              <Image src={x} alt="Twitter" width={20} className="" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
