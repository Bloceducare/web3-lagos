import Link from "next/link";
import Image from "next/image";
import DateCountDown from "@/components/dateCountDown";

import envelope from "@/public/hackathon/Group.png"
import twitter from "@/public/hackathon/Vector (2).png"
import footerLogo from "@/public/hackathon/Group545.png"
import footerImage from "@/public/hackathon/Group17.png"
import firstPrice from "@/public/hackathon/Frame 8.png"
import secondPrice from "@/public/hackathon/Frame 12.png"
import thirdPrice from "@/public/hackathon/Frame7.png"
import bestPrice from "@/public/hackathon/Frame11.png"
import innovativePrice from "@/public/hackathon/Frame9.png"

import Logo from "../../public/hackathon/Logo.png"

const overview = [
  {
    id: 1,
    title: "Open Governance",
    content:
      "Applications in open governance involving smart contracts in the African Electoral process; voter registration, casting, and collation of votes, diaspora voting, using zk technology to anonymize casted votes, etc",
  },
  {
    id: 2,
    title: "Financial Inclusion and Education",
    content:
      "Exploring the role of blockchain technology in enhancing financial inclusion and education. Applications include decentralized finance (DeFi) platforms for microloans and savings, blockchain-based identity solutions for the unbanked, and educational tools leveraging smart contracts to create transparent and verifiable certification processes. This also encompasses financial literacy programs powered by blockchain to empower individuals with the knowledge to manage their finances and investments securely.",
  },  
  {
    id: 3,
    title: "E-Identity and Verification",
    content:
      "Applications in e-identity and verification; with use cases in digital stamps for e-commerce platforms, cross-border trade & exports, traceability to stem gun running, and supply chain tracking for petroleum products.",
  },
  {
    id: 4,
    title: "Entertainment and Media",
    content:
      "Applications in entertainment and media; artist management, music, and content distribution, copyrights, IP, etc",
  },
  {
    id: 5,
    title: "Digital",
    content:
      "Applications in digital collectibles; preservation of African artifacts and promotion of digital tourism, etc.",
  },
];

const eventSchedule = [
  {
    id: 1,
    time: "11am WAT",
    date: "15th July, 2024",
    title: "Registration Begins",
    color: "bg-[#080D46]",
  },
  {
    id: 2,
    time: "11:59pm WAT",
    date: "20th August, 2024",
    title: "Registration Ends",
    color: "bg-[#333866]",
  },
  {
    id: 3,
    time: "10am - 4pm WAT",
    date: "5th August, 2024",
    title: "Workshop for Hackers",
    color: "bg-[#080D46]",
  },
  {
    id: 4,
    time: "7am WAT",
    date: "1st September, 2024",
    title: "HackerHouse Resumption",
    color: "bg-[#1B27B7]",
  },
  {
    id: 5,
    time: "7am WAT",
    date: "2nd September, 2024",
    title: "Hackerthon Kickstart",
    color: "bg-[#1B27B7]",
  },
  {
    id: 6,
    time: "11:59pm WAT",
    date: "4th September, 2024",
    title: "Submission Deadline",
    color: "bg-[#080D46]",
  },
  {
    id: 7,
    time: "9am WAT",
    date: "5th September, 2024",
    title: "Web3 Lagos Grand Opening",
    color: "bg-[#333866]",
  },
  {
    id: 8,
    time: "2pm WAT",
    date: "6th September, 2024",
    title: "Judging Begins",
    color: "bg-[#080D46]",
  },
  {
    id: 9,
    time: "12pm WAT",
    date: "7th September, 2024",
    title: "Submission of Results",
    color: "bg-[#080D46]",
  },
  {
    id: 10,
    time: "TBC",
    date: "7th September, 2024",
    title: "Announcement of Winners",
    color: "bg-[#333866]",
  },
];

const Hackathon = () => {
  type headingProps = {
    title: string;
    src: string;
    alt: string;
    style: string;
  };

  const Heading: React.FC<headingProps> = ({ title, src, alt, style }) => (
    <div className={`flex items-center space-x-4 ${style}`}>
      <Image src={src} height={25} width={60} alt={alt} className="" />
      <h1 className="text-[26px] md:text-[32px] lg:text-[44px] xl:text-[48px] font-semibold">
        {title}
      </h1>
    </div>
  );

  const container = " lg:max-w-screen-lg xl:max-w-screen-xl";

  const textSize =
    "text-[18px] md:text-[19px] lg:text-[24px] xl:text-[26px] py-3";

  return (
      <main className="flex flex-col w-full">
        <section className="flex justify-center w-full md:pb-10 md:px-5 pt-3 md:pt-0 bg-[#0096FFCC] bg-[url('/hackathon/hero.png')] bg-cover bg-center">
          <div className={`flex flex-col justify-between space-y-[3rem] md:space-y-[3rem] w-full items-center p-2 md:p-4 lg:p-8 text-[#fff] ${container}`}>
            <header className="flex justify-between items-center w-full">
              <Link href="/">
              <Image src={Logo} alt="" width={0} height={0} className="w-[140px] md:w-[160px] lg:w-[200px] xl:w-[220px]" />
              </Link>
              <nav className="flex items-center md:gap-10">
                <Link href="/hackathon/registration" className="invisible md:visible">
                  <button className=" border-[1px] bg-[#fff] text-black border-black shadow-[-5px_-5px_0px_0px_rgba(0,0,0)] px-4 py-[6px] md:py-[8px] lg:px-6 lg:py-3">
                    Register Today
                  </button>
                </Link>
                <Link href="/hackathon/login">
                  <button className="border-[1px] bg-[#fff] text-black border-black shadow-[-5px_-5px_0px_0px_rgba(0,0,0)] px-4 py-[6px] md:py-[8px] lg:px-6 lg:py-3">
                    Login
                  </button>
                </Link>
              </nav>
            </header>

            {/* Hero Section */}
            <div className="flex flex-col space-y-[3rem] lg:pt-14 justify-center items-center h-full w-full">
              <div className="text-center space-y-4 md:space-y-6">
                <h1 className="text-[40px] font-bold md:text-[50px] lg:py-5 lg:text-[70px] xl:text-[90px]">
                  Web 3.0 <span className="text-[#1ACF2C]">Lagos</span> Hackathon{" "}
                </h1>
                <p className="text-[17px] md:px-16 lg:text-[26px] xl:text-[28px]">
                  Innovate, Collaborate, and Transform: Build Cutting-Edge
                  Blockchain Solutions with Global Impact and Win Incredible
                  Prizes!
                </p>
              </div>
              <div className="flex flex-col items-center space-y-5 md:flex-row md:space-y-0 md:space-x-[3rem] ">
                <Link href="/hackathon/registration">
                  <button className="border-[1px] bg-[#fff] text-black border-black shadow-[-5px_-5px_0px_0px_rgba(0,0,0)] px-6 py-3">
                    Register Today
                  </button>
                </Link>
                <Link href="#learnmore">
                  <button className="border-[1px] bg-[#fff] text-black border-black shadow-[-5px_-5px_0px_0px_rgba(0,0,0)] px-6 py-3">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center text-black w-full space-y-7 border-[1px] bg-[#fff] border-[#1E1E1E] shadow-[-5px_5px_0px_0px_rgba(0,0,0)] p-6">
              <p className="font-semibold md:text-[24px] lg:text-[34px]">Registration Ends In:</p>
              <DateCountDown />
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center items-center w-full">
          <div className={`md:p-7  lg:py-8 xl:py-20 ${container} p-4`}>
            <article>
              <Heading style="my-5" src="/hackathon/Group16.png" alt="" title="Overview" />
              <p id="learnmore" className={`${textSize}`}>
                The Web3 Lagos 3.0 Hackathon is a 3-day in-person event designed
                to bring together the brightest minds in blockchain technology.
                Participants will collaborate in teams to build impactful
                projects that address real-world challenges.
              </p>
              <p className={`${textSize}`}>
                The hackathon aims to build projects with real-world impact.
                Teams of 3 to 5 members will tackle problems in various
                categories.
              </p>
            </article>

            <article>
              <Heading style="my-5" src="/hackathon/Group9.png" alt="" title="Categories" />
              <p className={`${textSize}`}>
                The hackathon aims to build projects with real-world impact.
                Teams of 3 to 5 members will tackle problems in various
                categories.
              </p>
            </article>

            <section className="flex flex-wrap gap-x-10 justify-strat">
              {overview.map((card) => (
                <article
                  key={card.id}
                  className="space-y-7  p-7 mb-7 md:m-5 md:ml-0 md:h-[400px] md:max-w-[310px] lg:h-[370px] lg:min-w-[250px] lg:flex-auto lg:max-w-[270px] xl:max-w-[360px] xl:pr-20 text-[#fff] bg-[#0096FF] border-[1px] rounded-lg border-[#fff] shadow-[5px_5px_0px_0px_#1ACF2C]"
                >
                  <h3 className="text-[22px] font-medium h-[60px] flex items-center">
                    {card.title}
                  </h3>
                  <p className="text-[17px]">{card.content}</p>
                </article>
              ))}
            </section>
          </div>
        </section>

        <section className="flex flex-col w-full items-center bg-[#0096FF]">
          <div
            className={`flex flex-col justify-between p-4 md:space-y-10 md:p-7 lg:pb-20  ${container}`}
          >
            <header className="text-[#fff]">
              <Heading style="my-5"
                src="/hackathon/Vector.png"
                alt=""
                title="Event Schedule"
              />
            </header>

            <section className="flex justify-start items-center w-full flex-wrap">
              {eventSchedule.map((card) => (
                <article
                  key={card.id}
                  className={`space-y-2 border-b-[1px] border-[#fff] px-7 py-12 w-full md:h-[200px] md:w-[230px] lg:h-[230px] lg:min-w-[250px] lg:max-w-[300px]  lg:flex-1 xl:w-[280px] text-[#fff] ${card.color}`}
                >
                  <p className="text-[14px] bg-[#1ACF2C] w-fit px-2 py-1 rounded-md">
                    {card.time}
                  </p>
                  <p className="text-[17px]">{card.date}</p>
                  <h3 className="text-[22px] pt-8 font-medium h-[60px] flex items-center">
                    {card.title}
                  </h3>
                </article>
              ))}
            </section>
          </div>
        </section>

      <section className="flex flex-col items-center">
        <div className={`flex flex-col w-full ${container} bg-[url('/hackathon/Vector3.png')] bg-auto bg-right-bottom md:bg-right-top bg-no-repeat p-4 md:mt-10 md:px-7 pb-14 lg:pb-20`}>
         <div className="mb-7 lg:pb-8">
            <Heading style="my-2" src="/hackathon/Group15.png" alt="" title="Prizes and Awards" />
            <p className="text-[20px] lg:text-[26px]">Unlock your potential and win big</p>
         </div>
         <div className="flex flex-wrap w-full gap-7">
            <div className="flex flex-col h-full w-full lg:w-[51.5%] gap-7">
              <Image src={firstPrice} width={0} height={0} alt="" className="w-full"/>
              <div className="flex w-full gap-7">
              <Image src={innovativePrice} width={0} height={0} alt="" className="w-[45%] md:w-[48%]" />
              <Image src={bestPrice} width={0} height={0} alt="" className="w-[45%] md:w-[48%]" />
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-[45%] h-full gap-7">
              <Image src={secondPrice} width={0} height={0} alt="" className="h-full w-full" />
              <Image src={thirdPrice} width={0} height={0} alt=""className="h-full lg:h-[45%] w-full" />
            </div>
         </div>
        </div>
      </section>

      <footer className="flex flex-col items-center w-full">
        <span className="w-full h-[40px] bg-[url('/hackathon/Group544.png')] bg-cover bg-center "></span>
        <main className={`flex flex-col w-full px-10 items-center pb-3 ${container}`}>
          <div className="flex flex-wrap flex-col-reverse md:flex-row gap-5 md:gap-0 md:flex-nowrap justify-between items-center w-full">
            <div className="flex flex-col items-center md:items-start gap-2 md:gap-0 pb-20 md:p-0 space-y-10">
              <Image src={footerLogo} alt="" width={0} height={0} />
              <div className="space-y-2">
                <Link href="mailto:event@web3bridge.com" className="flex font-medium text-[#1E1E1E] items-center gap-2 text-[18px] lg:text-[24px]">
                  <Image src={envelope} alt="" width={26} height={0} className=""/>
                event@web3bridge.com
                </Link>
                <Link href="#" className="flex font-medium text-[#1E1E1E] items-center gap-2 text-[18px] lg:text-[24px]">
                  <Image src={twitter} alt="" width={26} height={0} className=""/>
                  event@web3bridge.com
                </Link>
              </div>
            </div>
            <Image src={footerImage} alt="" width={0} height={0} className="w-[250px] md:w-[350px] lg:w-[400px]" />
          </div>
          <div className="text-[17px] lg:text-[20px] py-1">Copyright© Web3.0 Lagos</div>
        </main>
      </footer>
    </main>
  );
};

export default Hackathon;

        //  <div className={` ${container}`}>
        //   <div className="flex justify-between py-5 w-full">
        //       <div className="flex flex-col justify-center space-y-8">
        //         <Image src={footerLogo} alt="" width={0} height={0} />
        //        
        //       </div>
        //       <Image src={footerImage} alt="" width={0} height={0} className="w-[450px]" />
        //     </div>
        //     <div>Copyright© Web3.0 Lagos</div>
        //  </div>