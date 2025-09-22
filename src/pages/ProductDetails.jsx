import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../api"; // only product API
import ProductDescription from "../components/ProductDescription";
import Reviews from "../components/Reviews";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    navigate("/checkout", {
      state: {
        product: {
          ...product,
          quantity,
          color: selectedColor,
          size: selectedSize,
        },
      },
    });
  };

  useEffect(() => {
    fetchProductById(id)
      .then((prod) => {
        const images = prod.image ? (Array.isArray(prod.image) ? prod.image : [prod.image]) : [];
        setProduct({ ...prod, images });
        setMainImage(images[0] || "https://placehold.co/400x400/e5e5e5/white?text=No+Image");
        setSelectedColor(prod.colors?.[0] || "");
      })
      .catch(console.error);
  }, [id]);

  const generateStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"} fill-current`}
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21L16.54 13.91L22 9.27L14.81 8.65L12 2L9.19 8.65L2 9.27L7.46 13.91L5.82 21L12 17.27Z" />
      </svg>
    ));
  };

  if (!product) return <p className="text-center mt-10">Loading product...</p>;

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Images */}
        <div>
          <div className="flex justify-center mb-4">
            <img src={mainImage} alt={product.name} className="w-full h-auto rounded-xl shadow-lg" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                className="w-full h-auto rounded-xl shadow-md cursor-pointer hover:opacity-80 transition"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.brand}</h1>
          <h2 className="text-xl text-gray-700 mt-2">{product.name}</h2>

          <div className="flex items-center mt-4">
            <div className="flex">{generateStars(product.rating || 0)}</div>
            <span className="ml-2 text-gray-600">{product.rating || 0}/5 ({product.num_reviews || 0} reviews)</span>
          </div>

          {/* Pricing */}
          <div className="mt-4">
            {product.msrp && <p className="text-sm text-gray-500 line-through">MSRP ₹{product.msrp}</p>}
            <p className="text-3xl font-bold text-gray-900 mt-1">₹{product.price * quantity}</p>
          </div>

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="mt-6">
              <p className="font-semibold text-gray-700">Color: <span>{selectedColor}</span></p>
              <div className="flex gap-2 mt-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    className={`w-8 h-8 rounded-full border-2 border-transparent transition-all duration-200 hover:scale-110 ${c}`}
                    onClick={() => setSelectedColor(c)}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <p className="font-semibold text-gray-700">Size</p>
              <div className="flex gap-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-xl border border-gray-300 font-medium transition ${
                      selectedSize === size ? "bg-slate-600 text-white" : "text-gray-700 bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-6">
            <p className="font-semibold text-gray-700">Quantity</p>
            <div className="flex items-center mt-2">
              <button
                className="px-4 py-2 rounded-l-xl border border-gray-300 bg-gray-100 hover:bg-gray-200 font-bold"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                -
              </button>
              <span className="px-6 py-2 border-y border-gray-300 font-semibold text-gray-800">{quantity}</span>
              <button
                className="px-4 py-2 rounded-r-xl border border-gray-300 bg-gray-100 hover:bg-gray-200 font-bold"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-slate-600 text-white font-medium px-6 py-3 rounded-xl shadow-md hover:bg-slate-700 transition">
              Add to Cart
            </button>
            
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-700 text-white font-medium px-6 py-3 rounded-xl shadow-md hover:bg-green-800 transition"
            >
              Buy Now
            </button>
          </div>

          {/* Product Description */}
          <ProductDescription />
        </div>
      </div>
      {/* Reviews section */} <Reviews />
    </div>
  );
};

export default ProductDetails;
