import Toggle from "@/components/livestream/ToggleButton";
import demoImage from "@/public/mainStream.png";
import Image from "next/image";

const HomePage = () => {
  return (
    <div>
      <Toggle />
      <section className="flex flex-col items-center pt-14">
        <div className="flex flex-col items-center gap-y-7 px-4 lg:w-[1000px] mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-medium">Highlights from W3LC 2023</h1>
          <p className=" md:w-[90%] lg:w-[75%] text-md md:text-lg">
            The 2023 edition had over 1500 enthusiasts and players in the ecosystem in attendance. With over 50 speakers in attendance and featured breakout sessions. Ayodeji Awosika, Chief Mechanic at Web3Bridge delivered the keynote address.
          </p>
        </div>
        <div className="pb-10 px-4 md:px-8">
          <Image src={demoImage} alt="" width={0} height={0} className="w-[1000px]" />
        </div>
      </section>
    </div>
  )
}

export default HomePage;
