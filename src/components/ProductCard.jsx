import React from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(`/product/${product.id}`);
  };

  const addToCart = (e) => {
    e.stopPropagation(); // Prevent triggering parent clicks if card clickable in future

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const generateStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"} fill-current`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M12 17.27l6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73-1.64 7.03L12 17.27z" />
        </svg>
      );
    }
    return stars;
  };

  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${API_URL}${product.image}`
    : "https://placehold.co/400x400/e5e5e5/white?text=No+Image";

  return (
    <div
      className="product-card bg-white p-4 rounded-xl flex flex-col items-center text-center cursor-pointer shadow-md hover:shadow-lg transition"
      aria-label={`Product: ${product.name || "Unnamed Product"}`}
    >
      <img
        src={imageUrl}
        alt={product.name || "Product image"}
        className="w-full h-auto rounded-lg mb-4"
      />
      <div className="text-left w-full">
        <h2 className="font-medium text-gray-800">{product.brand}</h2>
        <p className="text-sm text-gray-600">{product.name}</p>

        {/* Ratings */}
        <div className="flex items-center mt-1">{generateStars(product.rating || 0)}</div>

        {/* Price */}
        <div className="mt-2 text-gray-500">
          {product.msrp && (
            <span className="text-xs font-semibold line-through">₹{product.msrp}</span>
          )}
          <span className="text-sm font-bold text-gray-800 ml-2">₹{product.price}</span>
        </div>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-2 text-sm text-gray-600 flex gap-1">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-4 flex gap-2 w-full justify-center">
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-800 transition"
          >
            Buy Now
          </button>
          <button
            onClick={addToCart}
            className="flex-1 bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
