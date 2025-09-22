// src/pages/Kids.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { fetchProductsByCategory } from "../api";

export default function Kids() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    style: "",
    size: "",
    brand: "",
    color: "",
    sort: "Featured",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Fetch kids products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchProductsByCategory("kids");
        setAllProducts(data);
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch kids products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter + Sort
  useEffect(() => {
    let filtered = [...allProducts];

    if (filters.style)
      filtered = filtered.filter(
        (p) => p.style && p.style.toLowerCase() === filters.style.toLowerCase()
      );

    if (filters.size)
      filtered = filtered.filter(
        (p) => p.size && p.size.toLowerCase() === filters.size.toLowerCase()
      );

    if (filters.brand)
      filtered = filtered.filter(
        (p) => p.brand && p.brand.toLowerCase() === filters.brand.toLowerCase()
      );

    if (filters.color)
      filtered = filtered.filter((p) => p.colors && p.colors.includes(filters.color));

    switch (filters.sort) {
      case "Price:Low-High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price:High-Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "New Arrivals":
        filtered.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "Overall Rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    setProducts(filtered);
  }, [filters, allProducts]);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? "" : value,
    }));
  };

  // Extract unique filter values
  const uniqueStyles = Array.from(new Set(allProducts.map((p) => p.style).filter(Boolean)));
  const uniqueSizes = Array.from(new Set(allProducts.map((p) => p.size).filter(Boolean)));
  const uniqueBrands = Array.from(new Set(allProducts.map((p) => p.brand).filter(Boolean)));
  const uniqueColors = Array.from(new Set(allProducts.flatMap((p) => p.colors)));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="p-6 relative">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-gray-200 rounded flex items-center gap-2 shadow"
        >
          <span className="font-bold">Filters</span>
          <span>{showFilters ? "←" : "➜"}</span>
        </button>

        {showFilters && (
          <>
            {/* Style Dropdown */}
            {uniqueStyles.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "style" ? null : "style")}
                  className="px-4 py-2 border rounded bg-white shadow flex items-center gap-2"
                >
                  Style ▼
                </button>
                {openDropdown === "style" && (
                  <div className="absolute mt-2 bg-white border shadow-lg rounded z-20 max-h-60 overflow-auto">
                    {uniqueStyles.map((style) => (
                      <div
                        key={style}
                        className={`p-2 cursor-pointer hover:bg-gray-100 ${
                          filters.style === style ? "bg-blue-500 text-white" : ""
                        }`}
                        onClick={() => handleFilterChange("style", style)}
                      >
                        {style}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Size Dropdown */}
            {uniqueSizes.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "size" ? null : "size")}
                  className="px-4 py-2 border rounded bg-white shadow flex items-center gap-2"
                >
                  Size ▼
                </button>
                {openDropdown === "size" && (
                  <div className="absolute mt-2 bg-white border shadow-lg rounded z-20 max-h-60 overflow-auto">
                    {uniqueSizes.map((size) => (
                      <div
                        key={size}
                        className={`p-2 cursor-pointer hover:bg-gray-100 ${
                          filters.size === size ? "bg-blue-500 text-white" : ""
                        }`}
                        onClick={() => handleFilterChange("size", size)}
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Brand Dropdown */}
            {uniqueBrands.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "brand" ? null : "brand")}
                  className="px-4 py-2 border rounded bg-white shadow flex items-center gap-2"
                >
                  Brand ▼
                </button>
                {openDropdown === "brand" && (
                  <div className="absolute mt-2 bg-white border shadow-lg rounded z-20 max-h-60 overflow-auto">
                    {uniqueBrands.map((brand) => (
                      <div
                        key={brand}
                        className={`p-2 cursor-pointer hover:bg-gray-100 ${
                          filters.brand === brand ? "bg-blue-500 text-white" : ""
                        }`}
                        onClick={() => handleFilterChange("brand", brand)}
                      >
                        {brand}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Color Dropdown */}
            {uniqueColors.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "color" ? null : "color")}
                  className="px-4 py-2 border rounded bg-white shadow flex items-center gap-2"
                >
                  Color ▼
                </button>
                {openDropdown === "color" && (
                  <div className="absolute mt-2 bg-white border shadow-lg rounded z-20 max-h-60 overflow-auto">
                    {uniqueColors.map((color) => (
                      <div
                        key={color}
                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleFilterChange("color", color)}
                      >
                        <span
                          className={`w-5 h-5 rounded-full border-2 ${
                            filters.color === color ? "border-blue-500" : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                        ></span>
                        {color}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Sort Dropdown */}
        <div className="relative ml-auto">
          <button
            onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
            className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2"
          >
            Sort ▼
          </button>
          {openDropdown === "sort" && (
            <div className="absolute right-0 mt-2 bg-white border shadow-lg rounded z-20 w-40 max-h-60 overflow-auto">
              {["Featured", "New Arrivals", "Price:Low-High", "Price:High-Low", "Overall Rating"].map(
                (sort) => (
                  <div
                    key={sort}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      filters.sort === sort ? "bg-blue-500 text-white" : ""
                    }`}
                    onClick={() => handleFilterChange("sort", sort)}
                  >
                    {sort}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {loading && <p className="text-center col-span-full">Loading products...</p>}
        {!loading && products.length === 0 && <p className="text-center col-span-full">No products found.</p>}
        {!loading &&
          products.map((product) => (
            <motion.div key={product.id} variants={cardVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
}
