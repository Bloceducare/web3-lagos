import React from "react";
import Image from "next/image";

import { IoHomeOutline } from "react-icons/io5";

function SideBar() {
  return (
    <div className="w-[317px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r bg-[#0096FF] rounded-tr-3xl rounded-br-3xl ">
      <div className="h-full px-3 py-4 text-white">
        <div className="">
          <Image
            src={"/Logo.png"}
            alt="..."
            height={10}
            width={20}
            className=" w-[215px] h-[60px]"
          />
        </div>
        <div className="mt-20 font-bold text-2xl px-12 ">
          <button
            type="button"
            className="flex rounded-md items-center justify-center text-center space-x-2"
          >
            <IoHomeOutline />
            <p className="text-center">Home</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
