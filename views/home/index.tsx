import AboveFold from "@components/AboveFold";
import DetailsCard from "@components/DetailsCard";
import SpeakersCards from "@components/SpeakersCards";
import Schedule from "@components/Schedule";
import Team from "@components/Team";
import Image from "next/image";

const HomeView = () => {
  return (
    <div
    className="bg-white w-none md:w-[1441px] lg:w-[1441px] mx-auto"
      // style={{
      //   backgroundColor: "#FFFFFF",
      //   width: "1441px",
      //   margin: "0 auto",
      // }}
    >
      <AboveFold />
      <DetailsCard />
      {/* <SpeakersCards /> */}
      <Schedule />
      <Team />
    </div>
  );
};

export default HomeView;

// import DetailsCard from "@components/DetailsCard";
// import SpeakersCards from "@components/SpeakersCards";
// import Schedule from "@components/Schedule";
// import Team from "@components/Team";
// import AboveFold from "@components/AboveFold";

// const HomeView = () => {
//   return (
//     <>
//       <div
//         style={{
//           backgroundColor: "#122B47",
//         }}
//       >
//         <AboveFold />
//         <DetailsCard />
//         <SpeakersCards />
//         <Schedule />
//         <Team />
//       </div>
//     </>
//   );
// };

// export default HomeView;

// <div className="text-white pt-10 md:h-[calc(100vh_-_5rem)] bg-[url('/blue-bg.png')] bg-no-repeat">
// <div className="flex flex-wrap justify-center max-w-6xl mx-auto sm:justify-center md:justify-between">
//   <div className="flex flex-col max-w-md text-center md:text-left">
//     <div className="flex items-center mx-auto mt-2 md:ml-0">
//       <div className="mr-1">
//         <AddressIcon className="text-white" />
//       </div>
//       <div className="leading-5">
//         <div>October</div>
//         <div>6-8, 2022</div>
//       </div>
//     </div>
//     <div className="my-3">
//       <h1 className="mb-3 text-5xl leading-snug">
//         Web3
//         <span className="font-bold"> Lagos Conference 2022</span>
//       </h1>
//       <div className="p-3 md:p-0">
//         <p className="my-1 text-left">
//           Join the largest Web3 conference in Lagos Nigeria, where
//           stakeholders, industry experts, software developers are coming
//           together to network and discuss about the web3 ecosystem.
//         </p>

//       </div>
//     </div>
//     <div className="mt-4 md:mt-0">
//       <Button variant="primary" className="px-4">
//         <Link href="/apply/registration">
//           <a>Register</a>
//         </Link>
//       </Button>
//     </div>
//   </div>
//   <div className="relative block">
//     <img
//       src="/flying-bridge.png"
//       width={"100%"}
//       height="auto"
//       className="inline-block max-w-xs mb-2 scale-110 md:mt-8 md:max-w-md md:scale-125"
//     />

//     <div className="p-2 px-8 text-center text-white md:inline-grid place-items-center md:absolute -bottom-2 bg-gradient-to-r from-sky-500 to-indigo-500 md:-ml-24 md:p-4 md:px-14 md:-right-14">
//       <div>
//         {
//           <div
//             className={`${
//               loading ? "" : "hidden"
//             } animate-pulse w-10 h-10 bg-gray-700 mx-auto flex justify-center text-center`}
//           >
//             {" "}
//           </div>
//         }

//         <span className={`${loading ? "hidden" : ""} text-4xl`}>
//           {total}
//         </span>
//       </div>
//       <div className="flex items-center justify-center uppercase">
//         attendees
//       </div>
//     </div>
//   </div>
// </div>
// </div>

// <section className="max-w-4xl mx-auto text-center md:text-center">
// <DateCountDown />
// <div className="relative z-20 flex items-center justify-center my-4 ">
//   <h3 className="relative flex items-center justify-center p-2 pr-3 my-4 text-xl bg-green-600 bg-gradient-to-r from-gray-cgray to-red-200 md:text-3xl">
//     <img
//       src="/map-2.png"
//       className="mr-2"
//       width="20rem"
//       height="auto"
//     />
//     Funplex Resort, Magodo &nbsp; Lagos.
//   </h3>
// </div>
// </section>

// <section className="text-center my-6  p-6 py-16 md:bg-[url('/web3bridge.png')] bg-no-repeat bg-contain bg-right">
// <div className="">
//   <h1 className="mb-2 text-6xl">Apply &#38;</h1>
//   <h1 className="mb-12 text-6xl text-red-700">Join the Conversation</h1>
//   <div className="max-w-xl mx-auto">
//     <div className="grid grid-cols-1 gap-6 mt-3 md:grid-cols-2 lg:grid-cols-2 ">
//       <div className="flex items-center justify-center text-2xl brd">
//         <Link href="/apply/volunteer">
//           <a className="w-full p-4 border-2 border-red-500 cursor-pointer border:dotted hover:bg-red-200 hover:opacity-80">
//             Apply as a Volunteer
//           </a>
//         </Link>
//       </div>
//       <div className="flex items-center justify-center text-2xl brd">
//         <Link href="/apply/sponsor">
//           <a className="w-full p-4 border-2 border-red-500 cursor-pointer border:dotted hover:bg-red-200 hover:opacity-80">
//             Apply as a Sponsor
//           </a>
//         </Link>
//       </div>

//     </div>
//   </div>
// </div>
// </section>
