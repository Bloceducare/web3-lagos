import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import oluchi1 from '../public/oluchi.png';
import oluchi2 from '../public/oluchi.png';
import oluchi3 from '../public/oluchi.png';

const images = [oluchi1, oluchi2, oluchi3];

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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-full pb-[5rem]">
      <div className="relative w-[85vw] h-[450px] overflow-hidden rounded-[20px]">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <Image src={image} alt={`Slide ${index}`} layout="responsive" width={530} height={595} />
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
        <div className="bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full bg-gray-400 ${currentImageIndex === index ? 'bg-gray-700' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
