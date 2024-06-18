import { AboveFold, EventDetails, SpeakersCards, Schedule, Team, Sponsors, Gallery, Hero, About, Slider, YoutubeIframe } from "@/components";
import Image from "next/image";

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
    <div className="w-full overflow-clip mx-auto" >
      <AboveFold />
      <EventDetails />
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
