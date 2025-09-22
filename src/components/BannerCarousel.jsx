// src/components/BannerCarousel.jsx
import React, { useState, useEffect } from "react";

const slidesData = [
 
  {
    id: 1,
    bg: "/assets/c1.jpg",
    title: "Flat 50% Sale on kids shoes",
    align: "center",
  },
  {
    id: 2,
    bg: "/assets/c2.jpg",
    title: "Womens High Heels - 30% off for first order",
    align: "left",
  },
   {
    id: 3,
    bg: "/assets/c3.jpg",
    title: "Men's wear high heel office shoe - 40% off today!",
    align: "right",
  },
  
  {
    id: 4,
    bg: "/assets/c4.jpg",
    title: "Womens red high heels for party - free gift included",
    align: "right",
  },
];

const BannerCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentIndex(index);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slidesData.length);

  return (
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-lg shadow-lg">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slidesData.map((slide) => (
          <div
            key={slide.id}
            className="flex-shrink-0 w-full h-64 sm:h-80 md:h-96 relative flex items-center justify-center text-white"
            style={{
              backgroundImage: `url(${slide.bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className={`absolute inset-0  bg-opacity-30 flex items-center ${
                slide.align === "right"
                  ? "justify-end pr-6 md:pr-12"
                  : "justify-start pl-6 md:pl-12"
              }`}
            >
              <div className="p-4 md:p-6  bg-opacity-70 rounded-lg max-w-xs text-right">
                <p className="text-lg sm:text-2xl md:text-3xl font-bold">{slide.title}</p>
                <button className="mt-4 px-6 py-2 bg-white text-black font-bold rounded-lg shadow-md hover:bg-gray-200 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slidesData.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              currentIndex === idx ? "bg-gray-800 scale-125" : "bg-white opacity-50"
            }`}
            onClick={() => goToSlide(idx)}
          ></span>
        ))}
      </div>

      
    </div>
  );
};

export default BannerCarousel;
