// /* eslint-disable react/no-unescaped-entities */
// import Link from "next/link";
// import Image from "next/image";
// import Logo from "@/public/hackathon/Logo.png";

// const container = " lg:max-w-screen-lg xl:max-w-screen-xl";
// function BackgroundColor() {
//   return (
//     // <main className="flex flex-col w-full ">
//       <section className="flex justify-center w-full md:pb-10 md:px-5 pt-3 md:pt-0 bg-[#0096FFCC] bg-[url('/hackathon/Hero2.png')] bg-cover bg-center">
//         <div
//           className={`flex flex-col justify-between space-y-[3rem] md:space-y-[3rem] w-full items-center p-2 md:p-4 lg:p-8 text-[#fff] ${container}`}
//         >
//           <header className="flex justify-between items-center w-full">
//             <Link href="/">
//               <Image
//                 src={Logo}
//                 alt=""
//                 width={0}
//                 height={0}
//                 className="w-[140px] md:w-[160px] lg:w-[200px] xl:w-[220px]"
//               />
//             </Link>
//           </header>
//         </div>
//       </section>
//     // </main>
//   );
// }
// export default BackgroundColor;

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/hackathon/Logo.png";

const container = "lg:max-w-screen-lg xl:max-w-screen-xl";

function BackgroundColor() {
  return (
    <div className="absolute inset-0 bg-[#0096FFCC] bg-[url('/hackathon/Hero2.png')] bg-cover bg-center z-[-1]">
      <div
        className={`flex flex-col justify-between space-y-[3rem] md:space-y-[3rem] w-full items-center p-2 md:p-4 lg:p-8 text-[#fff] ${container}`}
      >
        <header className="flex justify-between items-center w-full">
          <Link href="/">
            <Image
              src={Logo}
              alt=""
              width={0}
              height={0}
              className="w-[140px] md:w-[160px] lg:w-[200px] xl:w-[220px]"
            />
          </Link>
        </header>
      </div>
    </div>
  );
}

export default BackgroundColor;
