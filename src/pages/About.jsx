import React from "react";
import img9 from '../assets/65.jpg';
import img10 from '../assets/64.jpg';

const About = () => {
  return (
    <div className="bg-white font-inter">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Main Content */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 items-start">

          {/* Text Content Section */}
          <div className="md:w-3/5">
            <h2 className="text-4xl font-bold mb-6 text-center md:text-left">About StepUp</h2>
            <p className="text-gray-700 leading-relaxed text-center md:text-left">
              StepUp is India’s largest sports and athletic footwear brand. Incorporated in 2006, StepUp Activewear is one of the leading players in organized sports & casual footwear sector in India. Since 2016, the flagship brand ‘StepUp’ has been the largest sports and athleisure footwear brand in India, in both volume and value terms. The company’s products are available via an expansive Pan-India network of over 15,000 geo-tagged multi-brand retail stores, 35+ company-owned exclusive outlets, large format stores such as Walmart, Vishal Retail and Reliance Smart among others and all the leading e-commerce portals.
            </p>

            <h2 className="text-4xl font-bold my-8 text-center md:text-left">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-center md:text-left">
              At StepUp we craft shoes with care for everyone—men, women and kids, with an equal attention to detail, letting each shoe speak for itself. The world-class quality, trendy designs and affordable prices have captured the imagination of millions of people, across the country—making StepUp an aspirational brand especially for young adults, everyday performers and fashionistas.
            </p>
          </div>

          {/* Image Section */}
          <div className="md:w-2/5 flex flex-col items-center">
            <img
              src={img9}
              alt="Sneakers"
              className="w-full rounded-full border-4 border-white shadow-lg transform -rotate-12 md:rotate-0 mb-8 md:mb-0"
            />
          </div>
        </div>

        {/* Mid-page Images */}
        <div className="flex justify-center my-12">
          <div className="w-2/3 md:w-1/3">
            <img
              src={img10}
              alt="Kids Shoes"
              className="rounded-full border-4 border-white shadow-lg mx-auto"
            />
          </div>
        </div>

        {/* Three Pillars Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">Simplicity In Design</h3>
            <p className="text-gray-600">
              No flashy logos. No senseless details. Just the world's most comfortable shoes, made naturally and designed practically. It's that simple.
            </p>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">Confidence in Comfort</h3>
            <p className="text-gray-600">
              Trying is believing. Give our shoes a shot for 30 days, and if you're not walking on cloud nine, we'll take them back—no questions asked.
            </p>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4">Made from Nature</h3>
            <p className="text-gray-600">
              The footwear industry often overlooks mother nature's materials in favor of cheaper, synthetic alternatives. We think it's time to change that.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
