import AboveFold from "@/components/AboveFold";
import EventDetails from "@/components/EventDetails";
import SchedulePreview from "@/components/SchedulePreview";
import Footer from "@/components/Footer";

interface HomeViewProps {
  archiveMode?: boolean;
}

const HomeView = ({ archiveMode = false }: HomeViewProps) => {
  return (
    <div className="w-full flex flex-col overflow-clip">
      <AboveFold archiveMode={archiveMode} />
      <EventDetails archiveMode={archiveMode} />
      <SchedulePreview />
      <Footer />
    </div>
  );
};

export default HomeView;
