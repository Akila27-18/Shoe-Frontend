import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Checkout from "./pages/Checkout";
import SearchResults from "./components/SearchResults";
import CategoryPage from "./pages/CategoryPage";





// Page components
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Kids from "./pages/Kids";
import Women from "./pages/Womens"; // Fixed to match component name
import Men from "./pages/Mens";
import Brands from "./pages/Brands";
import Offers from "./pages/Offers";
import ProductDetails from "./pages/ProductDetails";
import Success from "./pages/Success";
import TrackOrder from "./pages/TrackOrder"; // add this import
import Cart from "./pages/Cart";




function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 max-w-full">
      <Navbar />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/womens" element={<Women />} /> {/* Fixed route */}
          <Route path="/mens" element={<Men />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/cart" element={<Cart />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/:category" element={<CategoryPage />} />
          

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
