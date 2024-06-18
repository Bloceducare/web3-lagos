import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import oluchi1 from '../public/oluchi.png';
import oluchi2 from '../public/oluchi.png';
import oluchi3 from '../public/oluchi.png';

const images = [oluchi1, oluchi2, oluchi3];  // Update with your image imports

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);  // Change the interval duration as needed (in milliseconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-1130 h-595 overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out transform translate-x-[calc(-100% * var(--index))]">
          {images.map((image, index) => (
            <div key={index} className="w-full">
              <Image src={image} alt={`Slide ${index}`} width={1130} height={595} />
            </div>
          ))}
        </div>
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex space-x-2">
          <button onClick={prevSlide} className="h-10 w-10 bg-gray-700 text-white">
            Prev
          </button>
          <button onClick={nextSlide} className="h-10 w-10 bg-gray-700 text-white">
            Next
          </button>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full bg-gray-400 ${currentImageIndex === index ? 'bg-gray-700' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
