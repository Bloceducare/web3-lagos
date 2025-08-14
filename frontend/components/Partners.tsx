import Image from 'next/image';
import { useState } from 'react';
import { partners } from '../data/partners';
import { FaTwitter } from 'react-icons/fa';

export const Partners = () => {
  const Card: React.FC<{ name: string; logo: string; twitter?: string }> = ({ name, logo, twitter }) => {
    const [imageError, setImageError] = useState(false);
    const [imageFit, setImageFit] = useState<'contain' | 'cover'>('contain');
    const initials = name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]!.toUpperCase())
      .join('');

    const cardInner = (
      <div className="rounded bg-white shadow-sm hover:shadow-md transition-shadow p-3">
        <div className="relative h-24 sm:h-28 md:h-32 lg:h-36 flex items-center justify-center rounded ring-1 ring-slate-200 overflow-hidden">
          {!imageError ? (
            <Image
              src={logo}
              alt={name}
              fill
              // className={`${imageFit === 'cover' ? 'object-cover' : 'object-contain'} drop-shadow-sm`}
              className=' object-contain  '
              // onLoadingComplete={(img) => {
              //   const ratio = img.naturalWidth / img.naturalHeight;
              //   if (ratio > 0.9 && ratio < 1.6) {
              //     setImageFit('cover');
              //   } else {
              //     setImageFit('contain');
              //   }
              // }}
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 240px"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm md:text-base font-semibold">
              {initials}
            </div>
          )}
        </div>
        <div className="mt-2 text-center">
          <h3 className="text-lg  md:text-sm font-bold truncate" title={name}>{name}</h3>
          {twitter && (
            <a
              href={`https://twitter.com/${twitter.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center mt-1 text-blue-400 hover:text-blue-500"
              aria-label={`${name} on X/Twitter`}
            >
              <FaTwitter size={14} />
            </a>
          )}
        </div>
      </div>
    );

    return twitter ? (
      <a href={`https://twitter.com/${twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="block">
        {cardInner}
      </a>
    ) : (
      cardInner
    );
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Event Partners</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {partners.map((partner, index) => (
            <Card
              key={index}
              name={partner.name}
              logo={partner.logo}
              twitter={partner.social?.twitter}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
