import Link from "next/link";
import useTotalParticipants from "@views/home/hooks/useTotalParticipants";

import { BsFillPeopleFill } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import DateCountDown from "./dateCountDown";
import Sponsors from "./Sponsors";

const AboveFold = () => {
  return (
    <>
      <nav
        className="flex items-center justify-center gap-20 p-4 bg-[#FFFFFF] text-lg  text-[#122C47] font-sans font-normal max-w-[1440px] shadow-lg 
      "
      >
        <button className="border-b-4 border-[#122C47]">
          <Link href="#"> Home </Link>
        </button>
        {/* <button className=" "> */}
          {/* <Link href="/apply/registration"> Register </Link> */}
          {/* <Link href="#"> Register </Link> */}
        {/* </button> */}
        {/* <button className=" "> */}
          {/* <Link href="#"> Sponsor </Link> */}
        {/* </button> */}
        {/* <button className=" "> */}
          <Link href="/apply/speaker">Speaker </Link>
        {/* </button> */}
      </nav>

      <section className="w-250 h-255">
        <div className="w-80 h-37 text-5xl mx-auto mt-28 text-center">
          <h1>
            <span className="bg-[#122C47] text-[#FFFFFF]">Web3</span> Lagos
            <span className="block mt-4">Conference 2</span>
          </h1>
        </div>
        <div className="w-2/5 mx-auto text-center mt-2 mb-9">
          <p>
            Web3 Lagos Conference is the largest Web3 Event in Lagos Nigeria
          </p>
          <p>Where community and technology meets for a three day intensive</p>
          <p>conference, learning and networking</p>
        </div>
        <div className="relative bg-top bg-no-repeat bg-[url('../images/main_bg.png')] h-[calc(110vh-20rem)] w-[1440px] mb-[23px]">
          <div className=" absolute top-[400px] left-[50%] translate-x-[-50%] w-[1060px]">
            <DateCountDown className="mx-auto mt-10 text-center " />
          </div>
          <div className="bg-[#122C47] absolute top-[500px] w-[1441px] h-[32px]"></div>
        </div>
      </section>
    </>
  );
};

export default AboveFold;

// const AboveFold = () => {
//   const { total, loading } = useTotalParticipants();

//   return (
//     <>
//       <div className="flex items-center justify-center text-center text-white h-[calc(100vh-20rem)] bg-[url('../images/main_bg.png')] ">
//         <div className="max-w-lg mx-auto mt-10">
//           {/* <p
//             className="text-6xl mt-36"
//             style={{
//               lineHeight: "4rem",
//             }}
//           >
//             {" "}
//             Web3 <span className="font-bold ">Lagos Conference 2022</span>
//           </p>
//           <p className="my-2 mt-6 text-xl">
//             Join the largest Web3 conference in Lagos Nigeria, where stake
//             holders, industry experts, software developers are coming together
//             to network and discuss about web3 ecosystem
//           </p> */}
//           <div className="flex justify-center text-xl">
//             {/* <div>
//             <button className="p-2 px-8 bg-red-500 rounded-sm">
//             <Link href="/apply/registration">
//             Register
//             </Link>
//             </button>
//           </div> */}
//           </div>

//           {/* <div className="inline-block mt-4">
//           <p className="relative z-50 w-full text-3xl text-capitalize">October 6-8 </p>
//           <div className="z-20 w-full h-3 -mt-4 bg-red-500 opacity-60">
//           </div>
//         </div> */}
//           <div className="mt-0 md:hidden">
//             <img src="/lagos-stadium-re.svg" alt="img" />
//           </div>
//         </div>
//       </div>

//       <div className="mt-20 bg-no-repeat hidden md:bg-[url('/lagos-stadium-re.svg')] h-72 md:grid place-items-center">
//         {/* <div className="flex items-center justify-between w-full max-w-xl p-0 px-2 pt-2 mt-2 bg-white ">
//         <div className="text-2xl font-bold">

//           <div className="flex items-center mb-3 mr-3 text-sm text-red-500">
//             Venue
//             <FaPaperPlane className="ml-2 text-2xl" />
//           </div>
//           <div className="text-blue-c1 ">Funplex Resort, Magodo, Lagos.</div>
//         </div>
//         <div className="text-2xl font-bold">

//           <div className="flex items-center mb-3 mr-3 text-sm text-red-500">Attendees
//             <BsFillPeopleFill className="ml-2 text-2xl" />
//           </div>
//           <div className="text-center text-blue-c1 ">
//             {
//               loading ? (<div
//                 className={`animate-pulse w-10 h-10 bg-gray-700 mx-auto flex justify-center text-center`}
//               >
//                 {" "}
//               </div>) :
//                 total
//             }

//           </div>
//         </div>
//       </div> */}
//       </div>

//       <div className="text-center">
//         <h1 className="text-white text-2xl md:mt-0  mt-24 md:pt-4">
//           Next Date To Be In Announced In
//         </h1>
//         <DateCountDown className="mx-auto mt-10 text-center " />
//       </div>

//       {/* <div className="p-6 bg-white">
//             <div className="max-w-6xl mx-auto">
//               <div className="max-w-md text-5xl text-center text-red-500 md:text-right"  style={{ lineHeight:"4rem"}}>
//                 <span className="text-blue-c1"> Apply &amp; {" "} </span> Join the Conversation
//               </div>

//               <div className="container mx-auto mt-8">
//                 <div className="grid grid-cols-1 gap-2 md:grid-cols-2     lg:grid-cols-2">
//                   <div className="flex justify-center px-4">
//                     <button className="w-full p-3 text-xl border border-red-500 rounded-md">
//                       <Link href="/apply/volunteer">
//                         Apply As a Volunteer
//                       </Link>
//                     </button>
//                   </div>

//                   <div className="flex justify-center px-4">
//                     <button className="w-full p-3 text-xl text-white bg-red-500 rounded-md">
//                       <Link href="/apply/sponsor">
//                         Apply As a Sponsor
//                       </Link>
//                     /button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div> */}

//       <section>
//         <Sponsors />
//       </section>
//     </>
//   );
// };

// export default AboveFold;
