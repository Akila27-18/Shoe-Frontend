// src/pages/Success.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Read the first order data from Checkout
  const { product, quantity, total, orderNumber } = location.state || {};

  if (!product || !orderNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">
          No order data found. Please go back.
        </p>
      </div>
    );
  }

  // Use proper image URL
  const productImage = product.images?.[0]
    ? product.images[0].startsWith("http")
      ? product.images[0]
      : `${import.meta.env.VITE_API_URL}${product.images[0]}`
    : "https://placehold.co/150x150";

  return (
    <div className="p-6 md:p-10 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
        {/* Success Icon */}
        <div className="relative flex justify-center mb-6">
          <div className="relative w-24 h-24 bg-[#1A4B49] rounded-full flex items-center justify-center z-10">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
        </div>

        {/* Confirmation Text */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Thank you for your order!
        </h1>
        <p className="text-gray-600 mb-4">
          We've received your order and will ship it in 3-7 business days.
        </p>
        <p className="text-gray-600 font-semibold mb-6">
          Your order number is:{" "}
          <span className="text-gray-800">{orderNumber}</span>
        </p>

        {/* Product Details */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <img
            src={productImage}
            alt={product.name}
            className="w-32 h-32 rounded-lg shadow-md object-cover"
          />
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p>Quantity: {quantity}</p>
          <p className="font-bold text-lg">Total: ₹{total}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/orders")}
            className="bg-white text-gray-800 font-medium px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition border border-gray-300"
          >
            View Order
          </button>
          <button
            onClick={() =>
              navigate("/track-order", { state: { product, quantity, total, orderNumber } })
            }
            className="bg-[#1A4B49] text-white font-medium px-6 py-3 rounded-xl shadow-md hover:bg-[#2e6260] transition"
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
