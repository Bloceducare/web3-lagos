import AboveFold from "@/components/AboveFold";
import EventDetails from "@/components/EventDetails";
import SchedulePreview from "@/components/SchedulePreview";
import Footer from "@/components/Footer";
const HomeView = () => {
  return (
    <div className="w-full flex flex-col overflow-clip">
      <AboveFold />
      <EventDetails />
      <SchedulePreview />
      <Footer />
    </div>
  );
};

export default HomeView;
