import Image from "next/image";

const Sponsors = () => {
  return (
    <div className="p-4 mt-12 md:px-3 md:py-16 md:mx-10 md:mt-4 lg:px-3 lg:py-16 lg:mx-10 lg:mt-4">
      <h1 className="text-4xl flex justify-center mb-20 tracking-wide">
        Our <span className="ml-2 font-bold">Sponsors</span>
      </h1>
      <div>
        {/* <h2 className="text-3xl mb-5">
          <span className="mr-1 font-bold">Lead</span>Sponsors
        </h2> */}

        <div className="hidden md:flex md:flex-wrap md:justify-between lg:flex lg:flex-wrap items-center lg:justify-between mb-14">
          <div>
            <Image
              src="/EF-ESP-logo.svg"
              width={200}
              height={100}
              alt="sponsor"
            />
          </div>
          <div>
            <Image src="/ETHOS.png" width={200} height={100} alt="sponsor" />
          </div>
          <div>
            <Image
              src="/Vert_T_Blk.png"
              width={200}
              height={100}
              alt="sponsor"
            />
          </div>
          <div>
            <Image
              src="/full-base-logo.svg"
              width={200}
              height={100}
              alt="sponsor"
            />
          </div>
        </div>
        {/*mobile  */}
        <div className=" flex items-center space-x-12 md:hidden lg:hidden">
          <div>
            <Image
              src="/EF-ESP-logo.svg"
              width={250}
              height={100}
              alt="sponsor"
            />
          </div>
          <div>
            <Image src="/ETHOS.png" width={250} height={100} alt="sponsor" />
          </div>
        </div>

        <div className="flex my-12 items-center md:hidden lg:hidden space-x-12">
          <div>
            <Image
              src="/Vert_T_Blk.png"
              width={250}
              height={100}
              alt="sponsor"
            />
          </div>
          <div>
            <Image
              src="/full-base-logo.svg"
              width={250}
              height={100}
              alt="sponsor"
            />
          </div>
        </div>
        {/*  */}

        <div className="hidden md:flex md:flex-wrap md:justify-between lg:flex lg:flex-wrap items-center lg:justify-between mb-14">
          <div>
            <Image
              src="/polytope_logo.png"
              width={200}
              height={50}
              alt="sponsor"
            />
          </div>
          <div>
            <Image src="/starkware.png" width={300} height={50} alt="sponsor" />
          </div>
          <div>
            <Image src="/onboard.png" width={200} height={150} alt="sponsor" />
          </div>
          <div>
            <Image src="/blockops.png" width={200} height={100} alt="sponsor" />
          </div>
        </div>
        {/* mobile */}
        <div className="flex items-center  space-x-12 md:hidden lg:hidden">
          <div>
            <Image
              src="/polytope_logo.png"
              width={250}
              height={50}
              alt="sponsor"
            />
          </div>
          <div>
            <Image src="/starkware.png" width={250} height={50} alt="sponsor" />
          </div>
        </div>

        <div className="flex items-center space-x-12 md:hidden lg:hidden ">
          <div>
            <Image src="/onboard.png" width={200} height={150} alt="sponsor" />
          </div>
          <div>
            <Image src="/blockops.png" width={200} height={100} alt="sponsor" />
          </div>
        </div>

        {/* last frame desktop */}
        <div className="hidden md:flex md:flex-wrap md:justify-between lg:flex lg:flex-wrap items-center lg:justify-between">
          <div className="flex self-end">
            <Image
              src="/logoiqwhite.svg"
              width={200}
              height={100}
              alt="sponsor"
            />
          </div>
          <div className="flex self-end">
            <Image
              src="/cxlogo.png"
              width={250}
              height={100}
              alt="sponsor"
              className="border-2 border-blue-500 p-2 bg-gray-200 shadow-md rounded-lg"
            />
          </div>
          <div className="flex self-end">
            <Image src="/intmax.png" width={200} height={150} alt="sponsor" />
          </div>
          <div className="flex self-end">
            <Image
              src="/quillaudit.png"
              width={200}
              height={150}
              alt="sponsor"
            />
          </div>
        </div>

        <div className="flex items-center space-x-12 md:hidden lg:hidden ">
          <div className="flex self-end">
            <Image
              src="/logoiqwhite.svg"
              width={200}
              height={150}
              alt="sponsor"
            />
          </div>
          <div className="flex center">
            <Image
              src="/cxlogo.png"
              width={100}
              height={50}
              alt="sponsor"
              className="border-2 border-blue-500 p-2 bg-gray-200 shadow-md rounded-lg"
            />
          </div>
        </div>

        <div className="flex items-center space-x-12 my-8 md:hidden lg:hidden ">
          <div className="flex self-end">
            <Image src="/intmax.png" width={200} height={150} alt="sponsor" />
          </div>
          <div className="flex self-end">
            <Image
              src="/quillaudit.png"
              width={200}
              height={150}
              alt="sponsor"
            />
          </div>
        </div>
      </div>

      <div className="mt-32">
        <h2 className="text-3xl mb-5">
          <span className="mr-1 font-bold">Media</span>Partners
        </h2>
        <div className="flex space-x-6 items-center mb-14">
          <div>
            <Image
              src="/EnteringTech.svg"
              width={200}
              height={100}
              alt="sponsor"
            />
          </div>
          <div>
            <Image src="/streamEth.png" width={200} height={50} alt="sponsor" />
          </div>
        </div>
      </div>
      {/* <div>
        <h2 className="text-3xl mb-5">
          <span className="mr-1 font-bold">Community</span>Partners
        </h2>
        <div className="flex flex-wrap items-center justify-between">
          <div className="">
            <img src="/siban-m.png" alt="siban logo" width="170px" />
          </div>
          <div className="">
            <img src="/oau-m.png" alt="oau logo" width="170px" />
          </div>
          <div className="">
            <img src="/unn-m.png" alt="unn logo" width="170px" />
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="">
            <img src="/bayero-m.png" alt="bayero logo" width="120px" />
          </div>

          <div className="">
            <img src="/lasu-m.png" alt="lasu logo" width="120px" />
          </div>

          <div className="">
            <img src="/uniben-m.png" alt="uniben logo" width="120px" />
          </div>
        </div>
        <div className="flex flex-wrap items-center ">
          <div className="mr-[400px]">
            <img src="/imo-m.png" alt="uniben logo" width="150px" />
          </div>
          <div className="">
            <img src="/web3ladies-m.png" alt="uniben logo" width="120px" />
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default Sponsors;

// const Sponsors = () => {
//   return (
//     <div className="bg-white">
//       <div className="max-w-6xl px-3 py-16 mx-auto ">
//         <div className="mb-8 border-b-2 border-b-gray-300">
//           <h2 className="text-2xl font-normal">Headline Sponsors:</h2>
//           <div className="flex flex-wrap items-center my-2 mr-6">
//             <Image src="/ETH-logo.svg" width={200} height={80} alt="sponsor" />
//             <Image
//               src="/polygon-matic.svg"
//               width={200}
//               height={100}
//               alt="sponsor"
//             />
//             <Image src="/pillow.svg" width={200} height={100} alt="sponsor" />
//           </div>
//         </div>
//         <div className="mb-8 border-b-2 ">
//           <h2 className="text-2xl font-normal">Silver Sponsors:</h2>

//           <div className="flex flex-wrap items-center ">
//             <div className="my-2 mr-6 ">
//               <img src="/starkware.png" alt="img" />
//             </div>

//             <div className="my-2 mr-6">
//               <Image
//                 src="/wakanda-inu.png"
//                 width={120}
//                 height={120}
//                 alt="sponsor"
//               />
//             </div>

//             <div className="flex items-center my-2 mr-6">
//               <Image src="/web3d.svg" width={120} height={120} alt="sponsor" />
//             </div>
//             <div className="my-2 mr-6 ">
//               <img src="/nahmi.png" alt="img" />
//             </div>
//           </div>
//         </div>
//         <div className="pb-4 mb-8 border-b-2 ">
//           <h2 className="text-2xl font-normal">Media Partners:</h2>
//           <div className="flex">
//             <div className="flex items-center my-2 mr-6">
//               <Image src="/papaya.svg" width={30} height={30} alt="sponsor" />
//               <span className="relative ml-2 text-4xl">
//                 Papayas
//                 <sub className="absolute right-0 text-xs font-semibold text-orange-500 -bottom-4">
//                   Studios
//                 </sub>
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="mb-8">
//           <h2 className="text-2xl font-normal">Community Partners:</h2>

//           <div className="flex flex-wrap items-center">
//             <div className="mr-6">
//               <img src="/siban-m.png" alt="siban logo" />
//             </div>
//             <div className="mr-6">
//               <img src="/oau-m.png" alt="oau logo" />
//             </div>
//             <div className="mr-6">
//               <img src="/unn-m.png" alt="unn logo" />
//             </div>
//             <div className="mr-6">
//               <img src="/bayero-m.png" alt="bayero logo" />
//             </div>

//             <div className="mr-6">
//               <img src="/lasu-m.png" alt="lasu logo" />
//             </div>

//             <div className="mr-6">
//               <img src="/uniben-m.png" alt="uniben logo" />
//             </div>
//             <div className="mr-6">
//               <img src="/imo-m.png" alt="uniben logo" />
//             </div>
//             <div className="mr-6">
//               <img src="/web3ladies-m.png" alt="uniben logo" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Sponsors;
