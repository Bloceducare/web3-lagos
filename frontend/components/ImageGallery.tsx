import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { X } from 'lucide-react';

interface ImageGalleryProps {
  year: number;
  images: StaticImageData[];
  onClose: () => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ year, images, onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="relative w-full max-w-6xl p-6 bg-white rounded-lg shadow-lg max-h-[700px] flex flex-col">
          {/* Close gallery button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
            aria-label="Close gallery"
          >
            <X className="w-6 h-6 text-black" />
          </button>

          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold mb-2">Web3 Lagos Conference {year}</h1>
            <p className="text-gray-700">Check out the gallery from the previous event</p>
          </div>

          <div className="overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[650px]">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-64 overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={image}
                  alt={`Conference ${year} Image ${index + 1}`}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  layout="fill"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedIndex !== null && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
    onClick={() => setSelectedIndex(null)} // Close on overlay click
  >
    <div
      className="relative max-w-4xl max-h-[90vh] w-full flex items-center justify-center"
      onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
    >
      <button
        onClick={() => setSelectedIndex(null)}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 z-50"
        aria-label="Close image preview"
      >
        <X className="w-6 h-6 text-black" />
      </button>

      <button
        onClick={() =>
          setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : prev))
        }
        disabled={selectedIndex === 0}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-40 z-50"
        aria-label="Previous image"
      >
        &#8249;
      </button>

      <button
        onClick={() =>
          setSelectedIndex((prev) =>
            prev! < images.length - 1 ? prev! + 1 : prev
          )
        }
        disabled={selectedIndex === images.length - 1}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-40 z-50"
        aria-label="Next image"
      >
        &#8250;
      </button>

      <Image
        src={images[selectedIndex]}
        alt={`Conference ${year} Image ${selectedIndex + 1}`}
        className="object-contain rounded max-h-[85vh] mx-auto"
        width={900}
        height={600}
        priority
      />
    </div>
  </div>
)}



    </>
  );
};

export default ImageGallery;


