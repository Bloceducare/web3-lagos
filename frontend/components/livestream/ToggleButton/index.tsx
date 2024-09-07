import Link from "next/link";
import { useState } from "react";
import Streams from "../Archive";
import demoImage from "@/public/mainStream.png";

const Toggle = () => {
  const button = "py-2 px-4 rounded-sm hover:bg-[#ccc]";

  return (
    <div className="flex flex-col py-4 justify-center">
      <div className="flex ">
        <Link href="/livestream/ruby" className={`${button}`}>
          <p>Main Stage</p>
        </Link>
        <Link href="/livestream/emerald" className={`${button}`}>
          <p>Emerald Hall</p>
        </Link>
      </div>

      <div className="w-full flex lg:w-[1000px] mt-4">
        <Streams
          image1={demoImage.src}
          image2={demoImage.src}
          link1=""
          link2=""
          label1="Hall 2"
          label2="Main Hall"
        />
      </div>
    </div>
  );
};

export default Toggle;
