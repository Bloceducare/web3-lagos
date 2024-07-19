import Link from "next/link";
import React from "react";

const HackathonSuccessScreen = () => {
  return (
    <>
      <div className="flex flex-col items-center m-auto">
        <h1 className="mb-2 bg-gradient-to-r text-[2em] text-transparent bg-clip-text text-center font-semibold from-[#895470] via-[#BD6854] to-[#3E3797]">
          Registration Successful
        </h1>
        <h3>
        Congratulations! You’ve successfully registered for the Web3 Lagos 3.0 Hackathon. 
        </h3>

        <Link href="/">
          <button
            className="  w-1/3  m-10 bg-[#1E1E1E]  text-white px-3 py-1.5 text-center shadow-[-6px_-6px_0px_0px_#0096FF]
  "
          >
            Go to Dashboard
          </button>
        </Link>
      </div>
    </>
  );
};

export default HackathonSuccessScreen;
