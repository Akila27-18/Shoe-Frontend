import axios from "axios";

// Base URL of your backend API (no trailing slash)
export const API_URL = import.meta.env.DEV ? "/api" : "https://shoe-backend-jbhb.onrender.com";

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
    // If token expired, try refreshing
    if (err.response?.status === 401 && refreshToken) {
      const res = await axios.post(`${API_URL}/api/auth/token/refresh/`, {
        refresh: refreshToken,
      });
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

// Fetch all products
export const fetchProducts = async () => {
  const res = await axios.get(`${API_URL}/api/products/`);
  // If backend returns paginated data, use: return res.data.results;
  return res.data; 
};

// Fetch single product by ID
export const fetchProductById = async (id) => {
  const res = await axios.get(`${API_URL}/api/products/${id}/`);
  return res.data;
};

// Search products by query string
export const searchProducts = async (query) => {
  const res = await axios.get(`${API_URL}/api/products/search/`, {
    params: { q: query },
  });
  return res.data;
};

// Fetch products filtered by category, fix relative image URLs
export const fetchProductsByCategory = async (category) => {
  const res = await axios.get(`${API_URL}/api/products/`, {
    params: { category: category.toLowerCase() },
  });

  return res.data.map((product) => ({
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
