import { AboveFold, EventDetails, SpeakersCards, Schedule, Team, Sponsors, Gallery, About, YoutubeIframe } from "@/components";

const HomeView = () => {
  return (

    <div className="w-full flex flex-col overflow-clip" >
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
      {/* <SpeakersCards /> */}
      <Gallery />
      {/* <Schedule /> */}
      <Team />
    </div>
  );
};

export default HomeView;
