import Link from "next/link";
import { useState } from "react";
import  Streams  from  "../Archive"
import demoImage from "@/public/mainStream.png"

const  Toggle = () => {
  const [toggle, setToggle] = useState(false);

  const button = "py-2 px-4 rounded-sm hover:bg-[#ccc]";

  return (
    <div className="flex flex-col items-center py-14 justify-center">
      <div className="flex shadow-sm rounded-md border-[1px]">
        <button onClick={()=>setToggle(false)} className={`${button}`}>
          <p>Archived</p>
        </button>
        <button onClick={()=>setToggle(true)} className={`${button}`}>
          <p>Livestream</p>
        </button>
      </div>


      <div className="w-full flex lg:w-[1000px] justify-center mt-16">
        {toggle === false && (
          <Streams image1={demoImage.src} image2={demoImage.src} link1="" link2="" label1="Hall 2" label2="Main Hall" />
        )}

        {toggle === true && (
          <Streams image1="" image2="" link1="" link2="" label1="Main Hall" label2="Hall 2" />
        )}
      </div>
    </div>
  )
}

export default Toggle
