import Link from "next/link";
import React from "react";

const ResetPasswordSuccessScreen = () => {
  return (
    <>
      {/* <div className="flex flex-col items-center m-auto"> */}
      <div className=" border border-black rounded-lg w-full bg-white lg:px-8 pt-6 pb-8 mb-4 shadow-[6px_6px_0px_0px_#1ACF2C]">
        <h1 className="mb-2 bg-gradient-to-r text-[2em] text-transparent bg-clip-text text-center font-semibold from-[#895470] via-[#BD6854] to-[#3E3797]">
          Password Reset Successfully
        </h1>
        <h3>
          Congratulations! You’ve successfully registered for the Web3 Lagos 3.0
          Hackathon.
        </h3>

        <Link href="/">
          <button
            className="  w-full  p-5  bg-[#1E1E1E]  text-white  text-center shadow-[-5px_-5px_0px_0px_#0096FF]
            "
          >
            Go to Dashboard
          </button>
        </Link>
      </div>
    </>
  );
};
export default ResetPasswordSuccessScreen;
