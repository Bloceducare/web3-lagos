import AboveFold from "@/components/AboveFold";
import EventDetails from "@/components/EventDetails";
import Footer from "@/components/Footer";
const HomeView = () => {
  return (
    <div className="w-full flex flex-col overflow-clip">
      <AboveFold />
      <EventDetails />
      <Footer />
    </div>
  );
};

export default HomeView;
