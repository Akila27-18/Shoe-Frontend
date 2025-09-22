// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import BannerCarousel from "../components/BannerCarousel";
import a1 from '../assets/10.png';
import a2 from '../assets/11.png';
import a3 from '../assets/58.png';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';
import { Link } from "react-router-dom";

const categories = [
  { name: "Mens", img: a3 },
  { name: "Womens", img: a1 },
  { name: "Kids", img: a2 },
];


const productData = [
  { name: "Ophelia Womens Silver Diamante Heel", price: "₹2,299", img: img1 },
  { name: "Billie Womens Silver Diamante Heel", price: "₹1,600", img: img2 },
  { name: "Drew Womens Blush Diamante Slip On Shoe", price: "₹2,599", img: img3 },
  { name: "Drew Womens Navy Diamante Slip On Shoe", price: "₹1,299", img: img4 },
  { name: "Wexner Mens Navy Lace Up Trainer", price: "₹2,799", img: img5 },
  { name: "Weaver Mens White Lace Up Trainer", price: "₹3,259", img: img6 },
  { name: "Calistia Girls Pink Daisy Print Sandal", price: "₹2,899", img: img7 },
    { name: "Drew Womens Navy Diamante Slip On Shoe", price: "₹1,299", img: img8 },

];

const Home = () => {
  const [isGreen, setIsGreen] = useState(true);

  // Promo banner blinking
  useEffect(() => {
    const interval = setInterval(() => setIsGreen((prev) => !prev), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center bg-white">

  {/* Carousel Component */}
  <BannerCarousel />

  {/* Overview Section */}
  <div className="w-full max-w-7xl text-center mt-8 flex flex-col items-center">
    <h2 className="text-4xl font-bold mb-2">Overview</h2>
    <p className="text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
      Explore our curated selection of high-quality shoes for every occasion. From durable athletic shoes to stylish office-ready heels and elegant party shoes, we offer a diverse range of footwear.
            Explore our curated selection of high-quality shoes for every occasion. From durable athletic shoes to stylish office-ready heels and elegant party shoes, we offer a diverse range of footwear.

    </p>

    {/* Categories */}
    <h3 className="text-4xl font-semibold mt-8 mb-4 text-center">What are you looking for?</h3>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 w-full">
  {categories.map((cat) => {
    let path = ""; 
    if (cat.name === "Mens") path = "/mens";
    if (cat.name === "Womens") path = "/womens";
    if (cat.name === "Kids") path = "/kids";

    return (
      <Link key={cat.name} to={path} className="relative w-full sm:w-1/3">
        <img
          src={cat.img}
          alt={cat.name}
          className="w-full h-auto rounded-lg shadow-md"
        />
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md">
          {cat.name}
        </div>
      </Link>
    );
  })}
</div>

    {/* Product Grid */}
    <h3 className="text-4xl font-semibold mt-8 mb-4">New & Trending</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full">
    {productData.map((product, idx) => (
  <div key={idx} className="product-card">
    <img src={product.img} alt={product.name} className="w-full h-auto rounded-md shadow" />
    <h3>{product.name}</h3>
    <p>{product.price}</p>
  </div>
))}

    </div>

   <div className="mt-8 ml-[900px] mb-8">
  <div className="flex justify-end w-full max-w-5xl">
    <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 transition-colors">
      View all
    </button>
  </div>
</div>
</div>


  {/* Promo Banner */}
  <div className={`w-full max-w-5xl rounded-lg shadow-lg mb-8 p-4 text-center font-bold text-lg mt-8 ${isGreen ? "bg-[#1f4037] text-white" : "bg-white text-black border border-gray-300"}`}>
    🎁 Get your first order with free gift 🎁 & 50% offer 🔸
  </div>
</div>

  );
};

export default Home;
