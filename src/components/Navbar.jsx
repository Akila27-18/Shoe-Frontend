import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';


const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);

  // --- Search handler ---
  const handleSearch = (e) => {
  e.preventDefault();
  const query = e.target.search.value.trim();
  if (query) {
    navigate(`/womens?search=${encodeURIComponent(query)}`);
  }
};

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalQuantity);
    };
    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);

    const handleUserChange = () => {
      setUsername(localStorage.getItem('username'));
    };
    window.addEventListener('userLoggedIn', handleUserChange);
    window.addEventListener('storage', handleUserChange);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserChange);
      window.removeEventListener('storage', handleUserChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    setUsername(null);
    setMobileMenuOpen(false);
    window.dispatchEvent(new Event('userLoggedIn'));
  };

  return (
    <nav className="relative bg-[#214145] p-6 flex items-center justify-between w-full">
      {/* Logo + Search */}
      <div className="flex items-center space-x-4 w-full md:w-auto">
       <img
  src={logo}
  alt="Logo"
  className="h-20 w-20 rounded-full"
/>
      
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-6 text-white font-medium text-xl">
        <a href="/" className="hover:text-gray-300 transition-colors duration-300">
          Home
        </a>
        <a href="/About" className="hover:text-gray-300 transition-colors duration-300">
          About Us
        </a>
        <a href="/Contact" className="hover:text-gray-300 transition-colors duration-300">
          Contact Us
        </a>

        {username ? (
          <div className="flex items-center space-x-4">
            <span>Hello, {username}</span>
            <button onClick={handleLogout} className="underline">
              Logout
            </button>
          </div>
        ) : (
          <a
            href="/Login"
            className="hover:text-gray-300 transition-colors duration-300"
          >
            Login
          </a>
        )}

    <div
  onClick={() => navigate("/cart")}
  className="relative cursor-pointer hover:text-gray-300 transition-colors duration-300"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.198 1.408.707 1.408H18"
    />
  </svg>
 <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs font-bold rounded-full bg-red-500 text-white">
  {cartCount}
</span>

</div>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
{isMobileMenuOpen && (
  <div className="w-full bg-[#1f526b] text-white md:hidden">
    <div className="flex flex-col space-y-2 p-4">
      <a href="/" className="w-full py-2 px-4 hover:bg-[#16515b] rounded">Home</a>
      <a href="/About" className="w-full py-2 px-4 hover:bg-[#16515b] rounded">About Us</a>
      <a href="/Contact" className="w-full py-2 px-4 hover:bg-[#16515b] rounded">Contact Us</a>

      {username ? (
        <div className="flex flex-col space-y-2 w-full">
          <span className="px-4">Hello, {username}</span>
          <button
            onClick={handleLogout}
            className="w-full text-left py-2 px-4 hover:bg-[#16515b] rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <a href="/Login" className="w-full py-2 px-4 hover:bg-[#16515b] rounded">Login</a>
      )}

      <div
        onClick={() => navigate("/cart")}
        className="relative flex items-center gap-2 py-2 px-4 hover:bg-[#16515b] rounded cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.198 1.408.707 1.408H18"
          />
        </svg>
        <span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 text-xs font-bold rounded-full bg-red-500 text-white">
          {cartCount}
        </span>
        <span>Cart</span>
      </div>
    </div>
  </div>
)}

    </nav>
  );
};

export default Navbar;
