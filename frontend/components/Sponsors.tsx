import Image from 'next/image';
import { useState } from 'react';
import { sponsors } from "../data/sponsors";

type UIProps = {
  title: string;
};

const SponsorUI: React.FC<UIProps> = ({ title }) => {
  const Card: React.FC<{ name: string; logo: string; link?: string }> = ({ name, logo, link }) => {
    const [imageError, setImageError] = useState(false);
    const initials = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]!.toUpperCase())
      .join('');

    const cardContent = (
      <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-32 h-24 sm:h-28 md:h-32 flex items-center justify-center rounded ring-1 ring-slate-200 overflow-hidden">
          {!imageError ? (
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              className="object-contain drop-shadow-sm"
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 128px, (max-width: 768px) 144px, 160px"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm md:text-base font-semibold">
              {initials}
            </div>
          )}
        </div>
        <p className="text-sm md:text-base font-semibold text-gray-700 text-center mt-4">
          {name}
        </p>
      </div>
    );

    return (
      <div className={link ? "hover:scale-105 transition-transform duration-200" : ""}>
        {link ? (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
            aria-label={`Visit ${name} website`}
          >
            {cardContent}
          </a>
        ) : (
          cardContent
        )}
      </div>
    );
  };

  return (
    <div className="py-8 md:py-12 xl:py-16 px-4 md:px-8 xl:px-12 mx-auto max-w-7xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold text-gray-800 mb-8 md:mb-12 tracking-tight">
        {title}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
        {sponsors.map((sponsor, index) => (
          <Card
            key={index}
            name={sponsor.name}
            logo={sponsor.logo}
            link={sponsor.link}
          />
        ))}
      </div>
    </div>
  );
};

export const Sponsors = () => {
  return (
    <section className="container py-10 mx-auto">
      <SponsorUI title="Event Sponsors" />
    </section>
  );
};
