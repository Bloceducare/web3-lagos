import Image from 'next/image';
import { partners } from '../data/partners';
import { FaTwitter } from 'react-icons/fa';

export const Partners = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Community Partners</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white rounded p-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-16 mb-2">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium truncate" title={partner.name}>{partner.name}</h3>
                {partner.social.twitter && (
                  <a
                    href={`https://twitter.com/${partner.social.twitter.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-1 text-blue-400 hover:text-blue-500"
                  >
                    <FaTwitter size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
