import Toggle from "@/components/livestream/ToggleButton";
import Archives from '../../../public/archive.png'
import Image from "next/image";
import Link from "next/link";



const Archiveses = [
  {
      id:0 ,
      vid: Archives,
      title: "Hall 2",
  },
  {
      id: 1 ,
      vid: Archives,
      title: "Main Hall",
  },
]

const HomePage = () => {
  return (
    <div>
      {/* <Toggle /> */}
      <section className="flex justify-center mt-10"> 
        <section>
          <div className="flex justify-center items-center gap-10">
            <Link href="/livestream/archive" className="px-6 py-3 hover:bg-[#E8ECF4] rounded-lg text-2xl text-[#1E1E1E]">Archive</Link>
            <Link href="/livestream/live" className="px-6 py-3 hover:bg-[#E8ECF4] rounded-lg text-2xl text-[#1E1E1E]">Live Stream</Link>
          </div>
      <div className='flex gap-10 mt-10 justify-center flex-wrap md:flex-nowrap px-10 md:px-0' >
                    {Archiveses.map((archive, index) => (
                        <div key={index} className=' w-full md:w-[25%] cursor-pointer'>
                            <Image src={archive.vid} alt='live_video'/>
                            <p className='mt-5 font-semibold text-[#263238]'>{archive.title} </p>
                        </div>
                    ))}
                </div>
                </section>
      </section>









      <section className="flex flex-col items-center pt-14">
        <div className="flex flex-col items-center gap-y-7 px-4 lg:w-[1000px] mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-medium">
            Highlights from W3LC 2023
          </h1>
          <p className=" md:w-[90%] lg:w-[75%] text-md md:text-lg">
            The 2023 edition had over 1500 enthusiasts and players in the
            ecosystem in attendance. With over 50 speakers in attendance and
            featured breakout sessions. Ayodeji Awosika, Chief Mechanic at
            Web3Bridge delivered the keynote address.
          </p>
        </div>
        <div className="pb-10 px-4 md:px-8">
          <Image
            src={Archives}
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
