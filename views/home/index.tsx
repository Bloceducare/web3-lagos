import AboveFold from "@components/AboveFold";
import DetailsCard from "@components/DetailsCard";
import SpeakersCards from "@components/SpeakersCards";
import Schedule from "@components/Schedule";
import Team from "@components/Team";
import Image from "next/image";
import Sponsors from "@components/Sponsors";
import Gallery from "@components/Gallery";
import Hero from "@components/Hero";
import About from "@components/About";
import Slider from "@components/Carousel";
import YoutubeIframe from "@components/Iframe";

const HomeView = () => {
  return (
    // <div>
    //   <Hero />
    //   <About />
    //   {/* <Slider /> */}

    //   <YoutubeIframe>
    //     The 2023 edition had over 1500 enthusiasts and players in the ecosystem
    //     in attendance.
    //     <br />
    //     With over 50 speakers in attendance and featured breakout sessions.
    //     Ayodeji Awosika, Chief Mechanic at Web3Bridge delivered the keynote
    //     address.
    //   </YoutubeIframe>
    //   <Sponsors/>
    //   <SpeakersCards/>
    //   <Gallery/>
    // </div>
    <div
      className="bg-white w-full overflow-clip mx-auto" >
      <AboveFold />
      <DetailsCard />
      <Sponsors />
      <SpeakersCards />
      <Gallery />
      <Schedule />
      <Team />
    </div>
  );
};

export default HomeView;
