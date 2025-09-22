import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");       
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = "http://localhost:8000/api/auth/";

  // ---------------- Login ----------------
  const loginUser = async (email, password) => {
    const res = await axios.post(`${API_URL}login/`, { email, password });
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    return res.data;
  };

  // ---------------- Register ----------------
  const registerUser = async (username, email, password) => {
    const res = await axios.post(`${API_URL}register/`, {
      username,
      email,
      password,
      password2: password, // confirm password
    });
    return res.data;
  };

  // ---------------- Form Submit ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const data = await loginUser(email, password);
        localStorage.setItem("username", data.username); 
        window.dispatchEvent(new Event("userLoggedIn"));
        alert(`Login successful! Welcome, ${data.username}`);
        window.dispatchEvent(new Event("storage")); 
        navigate("/"); // ✅ go to home page after login
      } else {
        const data = await registerUser(username, email, password);
        alert("Registration successful! You can now log in.");
        setIsLogin(true);
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      const errors = err.response?.data;
      let message = "Something went wrong!";
      if (errors) {
        if (errors.error) {
          message = errors.error;
        } else {
          message = Object.values(errors).flat().join("\n");
        }
      }
      alert(message);
    }
    setLoading(false);
  };



  return (
    <div className="flex items-center justify-center mt-8 mb-8 bg-gray-50 font-inter">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-8">
        {/* Toggle Buttons */}
        <div className="flex rounded-lg overflow-hidden mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 font-bold text-lg transition-colors ${
              isLogin ? "bg-green-800 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Log in
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 font-bold text-lg transition-colors ${
              !isLogin ? "bg-green-800 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-sm font-semibold mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-800"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-800"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="focus:ring-green-800 h-4 w-4 text-green-800 border-gray-300 rounded"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a> and{" "}
                  <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
                </label>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-800 text-white py-2 rounded-lg font-semibold hover:bg-green-900 transition-colors disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Log In" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
