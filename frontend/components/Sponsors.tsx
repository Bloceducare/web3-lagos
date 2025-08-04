import { sponsors } from "../data/sponsors";

type UIProps = {
  title: string;
};

const SponsorUI: React.FC<UIProps> = ({ title }) => {
  return (
    <div className="py-8 md:py-12 xl:py-16 px-4 md:px-8 xl:px-12 mx-auto max-w-7xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold text-gray-800 mb-8 md:mb-12 tracking-tight">
        {title}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {sponsors.map((partner, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-32 h-20 mb-4">
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm md:text-base font-semibold text-gray-700 text-center">
              {partner.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Sponsors = () => {
  return (
    <section className="container py-10 mx-auto">
      <SponsorUI title="Our Sponsors" />
    </section>
  );
};
