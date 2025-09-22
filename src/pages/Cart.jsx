import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaGoogle, FaPaypal, FaCreditCard } from "react-icons/fa";
import { SiKlarna } from "react-icons/si";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Handle Remove Item
  const handleRemove = (id) => {
    const newCart = cartItems.filter(
      (item) => (item.product?.id || item.id) !== id
    );
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Handle Quantity Change
  const handleQuantityChange = (id, quantity) => {
    const newCart = cartItems.map((item) =>
      (item.product?.id || item.id) === id ? { ...item, quantity } : item
    );
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => {
    const product = item.product || item;
    return sum + (item.total_price || product.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="p-6 md:p-10 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

        {/* Continue Shopping */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-800 font-medium hover:underline"
          >
            Continue Shopping
          </button>
          <div className="mt-4 sm:mt-0 px-4 py-2 bg-gray-100 rounded-full text-xs text-gray-600 border border-gray-200">
            Free & Fast arriving by Monday. Order within 23 hours, 58 minutes
          </div>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-gray-700 text-center">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => {
            const product = item.product || item; // handle both shapes
            const image =
              product?.images?.[0] ||
              product?.image ||
              "https://placehold.co/100x100";
            return (
              <div
                key={`${product.id || index}`}
                className="flex flex-col sm:flex-row items-start sm:items-center mb-6 p-4 border border-gray-200 rounded-lg"
              >
                <img
                  className="w-24 h-24 object-cover rounded-lg mr-4 mb-4 sm:mb-0"
                  src={image}
                  alt={product?.name || "Product"}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {product?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {product?.description || ""}
                      </p>
                    </div>
                    <button
                      className="text-gray-400 hover:text-gray-600 transition"
                      onClick={() => handleRemove(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center mb-2">
                    <p className="text-sm font-medium text-gray-800 mr-2">
                      ₹ {item.total_price || product.price}
                    </p>
                    <select
                      className="form-select px-2 py-1 text-sm bg-gray-100 rounded-md"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(product.id, parseInt(e.target.value))
                      }
                    >
                      {[...Array(10).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          Quantity {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <hr className="my-6 border-gray-200" />

        {/* Summary */}
        <div className="mb-6">
          <div className="flex justify-between text-gray-800 font-medium text-lg mb-2">
            <span>Total</span>
            <span>₹ {totalPrice}</span>
          </div>
          <div className="flex justify-between text-gray-600 text-sm mb-4">
            <span>Delivery</span>
            <span>Free</span>
          </div>
        </div>

        {/* Checkout Buttons */}
        {/* Checkout Buttons */}
<div className="flex flex-col gap-4">
  <button
    onClick={() => navigate("/checkout")}   // 👈 navigate to checkout page
    className="flex items-center justify-center w-full px-6 py-3 bg-[#1A4B49] text-white font-medium rounded-xl shadow-md hover:bg-[#2e6260] transition"
  >
    Checkout Securely
  </button>
</div>
 {/* Express Checkout Options */}
 <h2 className="text-xl font-semibold mt-4 text-center">Express Checkout</h2>
<div className="flex flex-col gap-3">
  <button className="flex items-center justify-center w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
    <FaGoogle className="h-6 w-6 mr-2" /> GPay
  </button>
  <button className="flex items-center justify-center w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
    <FaPaypal className="h-6 w-6 mr-2" /> PayPal
  </button>
  <button className="flex items-center justify-center w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
    <FaCreditCard className="h-6 w-6 mr-2" /> Clearpay
  </button>
  <button className="flex items-center justify-center w-full px-4 py-3 border rounded-lg hover:bg-gray-100 transition">
    <SiKlarna className="h-6 w-6 mr-2" /> Klarna
  </button>
</div>
      </div>
    </div>
  );
};

export default Cart;
