import AboveFold from "frontend/components/AboveFold";
import DetailsCard from "frontend/components/DetailsCard";
import SpeakersCards from "frontend/components/SpeakersCards";
import Schedule from "frontend/components/Schedule";
import Team from "frontend/components/Team";
import Image from "next/image";
import Sponsors from "frontend/components/Sponsors";
import Gallery from "frontend/components/Gallery";
import Hero from "frontend/components/Hero";
import About from "frontend/components/About";
import Slider from "frontend/components/Carousel";
import YoutubeIframe from "frontend/components/Iframe";

const HomeView = () => {
  return (
    // <div>
    //   <Hero />
    //   <About />
    //   {/* <Slider /> */}

    //   <Sponsors/>
    //   <SpeakersCards/>
    //   <Gallery/>
    // </div>
    <div
    className="bg-white w-full overflow-clip mx-auto" >
      <AboveFold />
      <DetailsCard />
          <YoutubeIframe>
          The 2023 edition had over 1500 enthusiasts and players in the ecosystem
          in attendance.
          <br />
          With over 50 speakers in attendance and featured breakout sessions.
          Ayodeji Awosika, Chief Mechanic at Web3Bridge delivered the keynote
          address.
        </YoutubeIframe>
      <Sponsors />
      <SpeakersCards />
      <Gallery />
      <Schedule />
      <Team />
    </div>
  );
};

export default HomeView;
