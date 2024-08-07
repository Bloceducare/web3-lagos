import React from "react";
import Link from "next/link";
import Image from "next/image";
import BackgroundColor from "@/components/hackathon-bg";


export default function ResetPasswordSuccessScreen() {
  return (
    <main className=" relative flex flex-col min-h-screen w-full overflow-hidden ">

      <BackgroundColor />
    <div className=" w-1/2 mt-40 items-center m-auto">
      <div className=" border border-black rounded-lg w-full bg-[#fff] lg:px-8 pt-6 pb-8 mb-4 shadow-[6px_6px_0px_0px_#1ACF2C]">
        <Image
          src={"/Polygon 23.png"}
          alt="..."
          height={30}
          width={70}
          className="  ml-80 mt-10 "
        />
        <div className="ml-80 relative ">
          <Image
            src={"/Vector (5).png"}
            alt="..."
            height={10}
            width={30}
            className=" -mt-12 ml-5"
          />
        </div>
        <h1 className="mt-10  text-[2em]  text-center font-bold">
          Password Reset Successfully
        </h1>
        <h3 className="px-40 text-center">
          Congratulations! You’ve successfully registered for the Web3 Lagos 3.0
          Hackathon.
        </h3>

        <Link href="/">
          <button className="ml-60  text-center w-1/3  p-5 m-20  bg-[#1E1E1E]  text-white shadow-[-5px_-5px_0px_0px_#0096FF]">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
    </main>
  );
}


