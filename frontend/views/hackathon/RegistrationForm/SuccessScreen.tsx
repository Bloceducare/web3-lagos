import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HackathonSuccessScreen() {
  return (
    <div className=" w-fit md:w-1/2 flex items-center m-auto justify-self-auto justify-center">
      <div className=" border flex py-4 flex-col items-center justify-center m-auto  border-black rounded-lg w-full bg-white shadow-[6px_6px_0px_0px_#1ACF2C]">
        <div className="w-fit">

        <Image
          src={"/polygon-success.svg"}
          alt="..."
          height={30}
          width={70}
          className=""
        />
        </div>
  
        <h1 className="mt-10  text-[2em]  text-center font-bold">
          Registration Successful
        </h1>
        <h3 className="px-4 text-center">
          Congratulations! You’ve successfully registered for the Web3 Lagos 3.0
          Hackathon. Secure your spot by creating or joining an existing team.
        </h3>


        <h3 className="px-4 font-bold text-center">
          But first, You need to Join the Telegram group using the link below
        </h3>
        
        <Link href="https://t.me/+mQ4RF188nBo5ZThk">
          <button className=" text-center  p-5 mt-14 bg-[#1E1E1E]  text-white shadow-[-5px_-5px_0px_0px_#0096FF]">
            Join Telegram
          </button>
        </Link>
      </div>
    </div>
  );
}
