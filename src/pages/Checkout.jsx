// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiPost } from "../api";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get product or cartItems from state/localStorage
  const productFromState = location.state?.product;
  const cartItemsFromState = location.state?.cartItems;

  const cartItems = cartItemsFromState
    ? cartItemsFromState
    : productFromState
    ? [{ ...productFromState, quantity: 1 }]
    : JSON.parse(localStorage.getItem("cart")) || [];

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || item.total_price) * item.quantity,
    0
  );

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      alert("Please login first!");
      navigate("/login", { state: { from: "/checkout" } });
    }
  }, [token, navigate]);

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateAddr, setStateAddr] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cod, setCod] = useState(false);

  // Place orders
  const handleOrderNow = async () => {
    // Validation
    if (!firstName || !lastName || !email || !phone) return alert("Fill personal details!");
    if (!address || !city || !stateAddr || !pincode) return alert("Fill shipping address!");
    if (!cod && (!cardName || !cardNumber || !cvv || !expiry)) return alert("Fill card details or select COD!");

    try {
      const placedOrders = [];

      for (let item of cartItems) {
        const orderData = {
          product: item.id,
          quantity: item.quantity,
          total_price: (item.price || item.total_price) * item.quantity,
          customer: { first_name: firstName, last_name: lastName, email, phone },
          address: { address, city, state: stateAddr, landmark, pincode },
          payment: cod
            ? { method: "COD" }
            : { method: "Card", card_name: cardName, card_number: cardNumber, cvv, expiry },
        };

        const response = await apiPost("/api/orders/", orderData);
        const orderNumber = response.data.order_id; // Adjust based on your backend response

        placedOrders.push({
          product: item,
          quantity: item.quantity,
          total: orderData.total_price,
          orderNumber,
        });
      }

      alert("✅ Orders placed successfully!");
      localStorage.removeItem("cart"); // Clear cart

      // Navigate to Success page using the first item as representative
      navigate("/success", { state: placedOrders[0] });

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to place order.");
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-8 md:p-12 bg-white rounded-xl shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        {/* ORDER SUMMARY */}
        <div className="order-2 lg:order-1 bg-[#1a4b49] text-gray-100 p-6 md:p-8 rounded-xl shadow-inner">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-white">Order Summary</h2>
          {cartItems.map((item, idx) => (
            <div className="flex items-center gap-4 mb-6" key={idx}>
              <img src={item.image || item.images?.[0] || "https://placehold.co/100x100"} alt={item.name} className="w-24 h-24 rounded-lg shadow-md"/>
              <div>
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-gray-300">Qty: {item.quantity}</p>
                <p className="text-sm font-medium text-gray-100">₹{(item.price || item.total_price) * item.quantity}</p>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-500 pt-6 mt-6 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>

        {/* FORM */}
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Complete Your Order</h2>
          
          {/* Personal Details */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="border rounded-lg p-2"/>
              <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} className="border rounded-lg p-2"/>
              <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border rounded-lg p-2"/>
              <input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="border rounded-lg p-2"/>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h3>
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" checked={cod} onChange={e => setCod(e.target.checked)}/>
              <label>Cash on Delivery</label>
            </div>
            {!cod && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Card Holder Name" value={cardName} onChange={e => setCardName(e.target.value)} className="border rounded-lg p-2 col-span-2"/>
                <input placeholder="Card Number" value={cardNumber} onChange={e => setCardNumber(e.target.value)} className="border rounded-lg p-2"/>
                <input placeholder="CVV" value={cvv} onChange={e => setCvv(e.target.value)} className="border rounded-lg p-2"/>
                <input placeholder="Expiry MM/YY" value={expiry} onChange={e => setExpiry(e.target.value)} className="border rounded-lg p-2 col-span-2"/>
              </div>
            )}
          </div>

          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-xl shadow-md mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} className="col-span-2 border rounded-lg p-2"/>
              <input placeholder="City" value={city} onChange={e => setCity(e.target.value)} className="border rounded-lg p-2"/>
              <input placeholder="State" value={stateAddr} onChange={e => setStateAddr(e.target.value)} className="border rounded-lg p-2"/>
              <input placeholder="Landmark" value={landmark} onChange={e => setLandmark(e.target.value)} className="border rounded-lg p-2"/>
              <input placeholder="Pincode" value={pincode} onChange={e => setPincode(e.target.value)} className="border rounded-lg p-2"/>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button onClick={() => navigate(-1)} className="flex-1 bg-gray-400 text-white font-medium px-6 py-3 rounded-xl shadow-md hover:bg-gray-500 transition">Cancel</button>
            <button onClick={handleOrderNow} className="flex-1 bg-green-700 text-white font-medium px-6 py-3 rounded-xl shadow-md hover:bg-green-800 transition">Order Now</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
