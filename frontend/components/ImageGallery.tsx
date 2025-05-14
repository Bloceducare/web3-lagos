import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface ImageGalleryProps {
  year: number;
  images: StaticImageData[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ year, images }) => {
  return (
    <div className="px-10 py-4">
      <h1 className="text-2xl font-bold mb-4">Web3 Lagos Conference {year}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Conference ${year} Image ${index + 1}`}
            className="w-full rounded shadow-md"
            layout="responsive"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
