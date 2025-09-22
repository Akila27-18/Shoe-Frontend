import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../api";

const TrackOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const successData = location.state; // { product, quantity, total, orderNumber }

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      const data = await res.json();
      localStorage.setItem("access_token", data.access);
      return data.access;
    } catch {
      return null;
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    let accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      let apiOrders = await fetchUserOrders(accessToken);

      apiOrders = apiOrders.map((order) => ({
        ...order,
        product: {
          ...order.product,
          images:
            order.product?.images?.length > 0
              ? order.product.images
              : order.product?.image
              ? [order.product.image]
              : [],
        },
      }));

      if (successData && !apiOrders.some((o) => o.order_id === successData.orderNumber)) {
        apiOrders = [
          {
            order_id: successData.orderNumber,
            product: {
              ...successData.product,
              images: successData.product?.images?.length
                ? successData.product.images
                : ["https://placehold.co/150x150"],
            },
            total_price: successData.total,
            quantity: successData.quantity,
            status: "Placed",
            created_at: new Date().toISOString(),
            payment: { method: "N/A" },
          },
          ...apiOrders,
        ];
      }

      setOrders(apiOrders);
    } catch (err) {
      if (err.message.includes("Failed to fetch")) {
        accessToken = await refreshAccessToken();
        if (accessToken) fetchOrders();
        else navigate("/login");
      } else {
        setError("Failed to fetch orders.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "placed": return "🛒";
      case "dispatched": return "🏠";
      case "in transit": return "🚚";
      case "delivered": return "👍";
      default: return "❓";
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="max-w-xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6">Track Your Orders</h1>

      {orders.map((order, index) => {
        const { product, order_id, total_price, payment, status, created_at, quantity } = order;
        const imageUrl = product?.images?.[0] || "https://placehold.co/60x60";

        return (
          <div key={`${order_id}-${index}`} className="bg-white shadow rounded-lg mb-8 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={imageUrl.startsWith("http") ? imageUrl : `${import.meta.env.VITE_API_URL}${imageUrl}`}
                  alt={product?.name || "Product"}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">{product?.name || "Unknown Product"}</p>
                  <p className="text-sm text-gray-500">Order no #{order_id}</p>
                  {quantity && <p className="text-sm text-gray-500">Quantity: {quantity}</p>}
                </div>
              </div>
              <p className="font-semibold text-green-700">
                {payment?.method || "COD"} ₹{total_price ?? 0}
              </p>
            </div>

            {/* Timeline */}
            <div className="relative ml-4">
              {["Placed", "Dispatched", "In Transit", "Delivered"].map((stage, idx) => {
                const completed = status?.toLowerCase().includes(stage.toLowerCase());
                return (
                  <div key={idx} className="flex items-start mb-6 relative">
                    {idx < 3 && <div className="absolute left-4 top-6 w-px h-full bg-gray-300"></div>}
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white ${completed ? "bg-green-700" : "bg-gray-400"}`}>
                      {getStatusIcon(stage)}
                    </div>
                    <div className="ml-4">
                      <p className={`font-semibold ${completed ? "text-green-700" : "text-gray-500"}`}>{stage}</p>
                      <p className="text-sm text-gray-500">
                        {stage === "Placed" ? new Date(created_at).toLocaleString() : "Pending"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackOrder;
