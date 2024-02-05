import Image from "next/image";
import Sponsors from "./Sponsors";
import Link from "next/link";
// import vectorPic from "../images/vector.svg";

// bg-cover bg-[url('../images/main_bg.png')] h-[calc(110vh-20rem)] w-[1440px]
const DetailsCard = () => {
  return (
    <>
      <div className="hidden md:block lg:block text-justify p-3 tr mx-auto bg-[url('../images/bridge.svg')] w-full h-[calc(130vh-13rem)] bg-top bg-no-repeat ">
        <div className="flex justify-between mt-8 gap-4 h-fit w-full items-center">
          <div className="bg-white shadow-xl w-full m-auto border border-[#807f7f] h-[70vh] flex flex-col items-center text-center rounded-3xl">
            <div className="">
              <Image
                alt="vector"
                src="/vector.svg"
                width="50"
                height="50"
              />
            </div>
            <h3 className="mb-10 mt-4 text-[#122C47] text-2xl font-semibold ">
              Our Goal
            </h3>
            <div className="text-slate-600">
              <p className="">
                At Web3bridge, we believe education is critical in the
              </p>
              <p>drive for adoption of blockchain technology.</p>
              <p className="mt-10">
                And we have set up Web3 Lagos conference to bring
              </p>
              <p>education across varying topics/subjects and</p>
              <p> comprehension of blockchain technology</p>
            </div>
          </div>

          <div className="bg-white shadow-xl m-auto w-full border border-[#807f7f] flex flex-col items-center text-center rounded-3xl">
            <div className="">
              <Image
                alt="vector"
                src="/vector.svg"
                width="50"
                height="50"
              />
            </div>
            <h3 className="mb-10 mt-4 text-2xl font-semibold">
              Event Overview
            </h3>
            <div className="text-slate-600">
              <p>Web3 Lagos Conference is a 3-day physical and virtual</p>
              <p>event comprising of hackathon, workshops, networking,</p>
              <p>career fair, panel session, talks, etc</p>

              <p className="mt-10">
                With over 1200+ attendance, 26 speakers and
              </p>
              <p>7 sponsors in the maiden event, the event focuses</p>
              <p>on onboarding and supporting the growth of individual</p>
              <p>new to the concept of blockchain and decentralisation,</p>
              <p>helping technical andnon-technical blockchain</p>
              <p>blockchain native persons realise the endless</p>
              <p>possibilities and opportunities of the Blockchain &</p>
              <p>Ethereum ecosystem.</p>
            </div>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="gap-32 block md:hidden lg:hidden my-24 p-4">
        <div className=" shadow-xl border border-[#444444] items-center text-center rounded-3xl">
          <div className="-translate-y-4">
            <Image
              alt="vector"
              src="/vector.svg"
              width="50"
              height="50"
              layout="fixed"
              objectFit="cover"
            />
          </div>
          <h3 className=" text-[#122C47] text-2xl font-semibold ">Our Goal</h3>
          <div className="text-slate-600 p-2">
            <p className="">
              At Web3bridge, we believe education is critical in the drive for
              adoption of blockchain technology.
            </p>
            <p className="">
              And we have set up Web3 Lagos conference to bring education across
              varying topics/subjects and
            </p>
            <p> comprehension of blockchain technology</p>
          </div>
        </div>

        <div className=" shadow-xl  items-center text-center rounded-3xl">
          <div className="-translate-y-4">
            <Image
              alt="vector"
              src="/vector.svg"
              width="50"
              height="50"
              layout="fixed"
              objectFit="cover"
            />
          </div>
          <h3 className="text-[#122C47] text-2xl font-semibold">
            Event Overview
          </h3>
          <div className="text-slate-600 p-4">
            <p>
              Web3 Lagos Conference is a 3-day physical and virtual event
              comprising of hackathon, workshops, networking,career fair, panel
              session, talks, etc
            </p>

            <p className="mt-5">
              With over 1200+ attendance, 26 speakers and 7 sponsors in the
              maiden event, the event focuses on onboarding and supporting the
              growth of individual new to the concept of blockchain and
              decentralisation, helping technical andnon-technical blockchain
              blockchain native persons realise the endless possibilities and
              opportunities of the Blockchain & Ethereum ecosystem.
            </p>
          </div>
        </div>
      </div>
      {/* register component */}
      {/* <div>
        <div className="hidden md:block lg:block">
        <div className="flex justify-center my-6">
          <Link href="/apply/registration">
            <button className="text-white outline outline-offset-2 outline-[#122C47] font-bold bg-red-500 w-[90%] md:w-[20%] lg:w-[20%] p-4 rounded-lg">
              Register
            </button>
          </Link>
        </div>
        </div>

        <p className="text-red-400 font-semibold text-center">
          <a
            href=" https://event-web3lagos2022.web3bridge.com/"
            target="_blank"
          >
            Web3Lagos Conference 2022
          </a>
        </p>
        <div>
          <div className="flex justify-center py-4">
            <div>
              <div className="flex space-x-2">
                <h3 className="text-3xl">Powered by</h3>
                <div>
                  <Image
                    width={150}
                    height={50}
                    src="/web3bridge-logo.png"
                    alt="web3bridge-logo"
                    className="block"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xs text-center">In conjuction with </h3>
                <div className="flex justify-center">
                  <Image
                    width={300}
                    height={50}
                    src="/aya.png"
                    alt="aya"
                    className="scale-[0.7] block border"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <section className="">
        <Sponsors />
      </section> */}
    </>
  );
};
export default DetailsCard;

// export default DetailsCard;

// const DetailsCard = () => {
//   return (
//     <>
//       <div className="text-justify max-w-6xl py-16 mx-auto ">
//         <div className="mx-4">
//           <div className="text-justify cards">
//             <div className="first-column">
//               <div className="top-section">
//                 <div className="icon">
//                   <Image
//                     src="/developer-exp.svg"
//                     width="50"
//                     height="50"
//                     layout="fixed"
//                     objectFit="cover"
//                   />
//                 </div>
//                 <h3>Our Goal</h3>
//                 <p>
//                   To organize one of the Largest Blockchain developers and
//                   Ethereum builders conference in the heart of Africa tech.
//                 </p>
//               </div>
//               <div className="bottom-section">
//                 <div className="icon">
//                   <Image
//                     src="/success-story.svg"
//                     width="50"
//                     height="50"
//                     layout="fixed"
//                     objectFit="cover"
//                   />
//                 </div>
//                 <h3>Our Success Story</h3>
//                 <p>
//                   Web3Bridge's mission is to identify Web3 passions, train them
//                   in a collaborative and supportive remote environment and
//                   create an African Web3 Community. We have over the years
//                   executed this mission through our learning series called
//                   “COHORT” from edition 1 to edition 7 and with more than 2000
//                   trained on Web2 &amp; Web3 Blockchain development for free
//                   with access to accommodation, feeding and internet access at
//                   our learning facility in Lagos.
//                 </p>
//                 <p>
//                   An initiative that started as 500 Nigerian Developers for
//                   Ethereum with results has scaled into an organization that has
//                   contributed to growth, development of leading Blockchain
//                   projects including Hydro, Nahmii and many others and have
//                   exposed not less than 10,000 Africans to Web3 and its wealth
//                   of opportunities through educational and extended learning
//                   series.
//                 </p>
//               </div>
//             </div>
//             <div className="second-column">
//               <div className="text">
//                 <div className="icon">
//                   <Image
//                     src="/eth-img.svg"
//                     width="50"
//                     height="50"
//                     layout="fixed"
//                     objectFit="cover"
//                   />
//                 </div>
//                 <h3>Event Overview</h3>
//                 <p>
//                   Web3 Lagos Conference is a 3-day event kickstarting with a
//                   hackathon and several other events including; workshop,
//                   networking, career fair, panel session, talks, main event,
//                   etc.
//                 </p>
//                 <p>
//                   With an expected attendance of 5000 participants physically
//                   and virtually, this event will focus on helping developers and
//                   other none developer blockchain enthusiasts realize the
//                   endless possibilities and opportunities of the Blockchain
//                   &amp; Ethereum ecosystem.
//                 </p>
//                 <p>
//                   Beyond celebrating three years of contributions to the
//                   Blockchain and Web3 space in Africa and international scenes,
//                   one of our core beliefs is that repeated interactions will
//                   contribute resourcefully to career growth. We are bringing
//                   together the best, value-driven industry thought leaders and
//                   speakers.
//                 </p>
//               </div>
//               <div className="image">
//                 <Image
//                   src="/event-photo-1.jpg"
//                   width="100%"
//                   height="70%"
//                   layout="responsive"
//                   objectFit="cover"
//                 />

//                 {/* <img src="./images/kobby-mendez-d0oYF8hm4GI-unsplash.jpg" alt="img" /> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DetailsCard;
