// src/api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// -------------------
// Generic POST with token refresh
// -------------------
export const apiPost = async (endpoint, data) => {
  let accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (!accessToken && !refreshToken) throw new Error("User not logged in");

  const makeRequest = async (token) => {
    return axios.post(`${API_URL}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };

  try {
    return await makeRequest(accessToken);
  } catch (err) {
    if (err.response?.status === 401 && refreshToken) {
      // Refresh token
      const res = await axios.post(`${API_URL}/api/auth/token/refresh/`, { refresh: refreshToken });
      accessToken = res.data.access;
      localStorage.setItem("access_token", accessToken);
      return await makeRequest(accessToken); // Retry original request
    }
    throw err;
  }
};

// -------------------
// Products
// -------------------
export const fetchProducts = async () => {
  const res = await axios.get(`${API_URL}/api/products/`);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_URL}/api/products/${id}/`);
  return res.data;
};

export const searchProducts = async (query) => {
  const res = await axios.get(`${API_URL}/api/products/search/`, {
    params: { q: query },
  });
  return res.data;
};

// Fetch products by category (mens, womens, kids, brands)
export const fetchProductsByCategory = async (category) => {
  const res = await fetch(`${API_URL}/api/products/?category=${category}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.map((product) => ({
    ...product,
    image:
      product.image && !product.image.startsWith("http")
        ? `${API_URL}${product.image}`
        : product.image,
  }));
};

// -------------------
// Cart
// -------------------
export const fetchCart = async (userId) => {
  const res = await axios.get(`${API_URL}/api/cart/${userId}/`);
  return res.data;
};

// -------------------
// Orders
// -------------------
export const fetchOrder = async (orderId) => {
  const res = await axios.get(`${API_URL}/api/orders/${orderId}/`);
  return res.data;
};

export const fetchUserOrders = async (accessToken) => {
  const res = await axios.get(`${API_URL}/api/orders/my-orders/`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

// -------------------
// Offers & Brands
// -------------------
export const fetchOffers = async () => {
  const res = await axios.get(`${API_URL}/api/offers/`);
  return res.data;
};

export const fetchBrands = async () => {
  const res = await axios.get(`${API_URL}/api/brands/`);
  return res.data;
};
