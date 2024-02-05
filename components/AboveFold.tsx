import Link from "next/link";
import useTotalParticipants from "@views/home/hooks/useTotalParticipants";

import { BsFillPeopleFill } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";
import DateCountDown from "./dateCountDown";
import Sponsors from "./Sponsors";
import Image from "next/image";
import Location from "../images/location.svg";
import Date from "../images/date-icon.svg";

const AboveFold = () => {
  return (
    <div className="w-full p-4 bg-hero">
      <section className=" w-full  ">
        <div className="w-fit flex text-white m-auto justify-between">
<div className="flex flex-col w-full sm:w-1/2" >

        <div className="text-4xl ">
          <h1 className=" flex flex-col font-bold gap-2">
            <span className="font-bold ">Web3 Lagos</span> 
            <span className="">Conference 2024</span>
          </h1>
        
        </div>
        <div className="w-fit text-[1.3em] mt-2 leading-10">
          <p>
            The Web3 Lagos Conference is the largest Web3 Event in Lagos,
            Nigeria.
          </p>
          <p>
            This conference will bring together Web3 enthusiasts from all over
            Nigeria and beyond.
          </p>
          <p>
            Here, community meets technology for three days of intensive
            Networking and Learning experiences.
          </p>
        </div>
        <div className=" w-fit mt-16 flex flex-col gap-4">
            <DateCountDown />

            <div className="flex flex-col items-center w-fit m-auto justify-center gap-3">
              <div className="flex justify-between w-fit  items-center text-[1.2em] font-bold">
                <div>
                  <Image
                    src={Location}
                    alt={"location"}
                    width={20}
                    height={10}
                  />
                </div>
                <div>The Zone, Gbagada, Lagos State.</div>
              </div>
              <div className="flex justify-between">
                <div>
                  <Image src={Date} alt={"date"} width={20} height={10} />
                </div>
                <div>September 05 - September 07, 2024</div>
              </div>
            </div>
           
          </div>

          <div className="flex items-center space-x-4 my-2">
            <div className="flex items-center space-x-2">
              <div>
                <img alt="stats-icon" fetchpriority="high" width="49" height="49" decoding="async" data-nimg="1" style="color:transparent" src="/.svg"></div>
                <div><span className="block text-[#F0EFDA] text-2xl md:text-3xl leading-tight font-semibold">1.5k+</span><span className="font-normal text-sm md:text-base leading-tight text-[#F0EFDA]">Attendees</span></div></div><div className="flex items-center space-x-2"><div><img alt="stats-icon" fetchpriority="high" width="45" height="45" decoding="async" data-nimg="1" style="color:transparent" src="/_next/static/media/speakers.97a5a79a.svg"></div><div><span className="block text-[#F0EFDA] text-2xl md:text-3xl leading-tight font-semibold">50+</span><span className="font-normal text-sm md:text-base leading-tight text-[#F0EFDA]">Speakers</span></div></div><div className="flex items-center space-x-2"><div><img alt="stats-icon" fetchpriority="high" width="45" height="45" decoding="async" data-nimg="1" style="color:transparent" src="/_next/static/media/sponsor.d4156c98.svg"></div>
                <div>
                  <span className="block text-[#F0EFDA] text-2xl md:text-3xl leading-tight font-semibold">15+</span>
                <span className="font-normal text-sm md:text-base leading-tight text-[#F0EFDA]">Sponsors</span>
                </div></div></div>
</div>
        <Image src='/bgimage.webp' width={300} height={300} alt='bgimg' />
        </div>

        
     {/* // looks wierd on mobile please fix  */}
        {/* <div className="md:hidden lg:hidden grid justify-center mb-24">
          <div className="flex">
            <div>
              <Image src={Location} alt={"location"} width={20} height={10} />
            </div>
            <div>The Zone, Gbagada, Lagos State.</div>
          </div>
          <div className="flex">
            <div>
              <Image src={Date} alt={"date"} width={20} height={10} />
            </div>
            <div>September 05 - September 07, 2024</div>
          </div>
        </div> */}
      </section>
    </div>
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
