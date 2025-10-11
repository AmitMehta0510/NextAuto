import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { useCart } from "../context/CartContext";
import AuthContext from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCheckCircle,
} from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(() => toast.error("Failed to load product details"));
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;

    for (let i = 0; i < full; i++)
      stars.push(<FaStar key={`f-${i}`} className="text-yellow-400" />);
    if (half)
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    while (stars.length < 5)
      stars.push(
        <FaRegStar key={`e-${stars.length}`} className="text-yellow-400" />
      );
    return stars;
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please login to proceed to checkout");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    addToCart(product);
    navigate("/checkout");
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500 text-lg">
        Loading product details...
      </div>
    );
  }

  // ✅ Handle both Cloudinary and local placeholder images
  const mainImage =
    product.images?.[0] || product.image || "https://via.placeholder.com/500";

  const imageList = product.images?.length
    ? product.images
    : [product.image || "https://via.placeholder.com/100"];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* ===== Left: Image Gallery ===== */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-center">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[400px] object-contain rounded-xl hover:scale-105 transition-transform"
              onError={(e) => (e.target.src = "https://placehold.co/500x400")}
            />
          </div>

          {/* ===== Thumbnails ===== */}
          <div className="flex space-x-4 justify-center flex-wrap">
            {imageList.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() =>
                  setProduct((prev) => ({
                    ...prev,
                    images: [img, ...prev.images.filter((im) => im !== img)],
                  }))
                }
                className="w-20 h-20 rounded-lg border hover:border-cyan-500 object-contain cursor-pointer"
                onError={(e) => (e.target.src = "https://placehold.co/100x100")}
              />
            ))}
          </div>
        </div>

        {/* ===== Right: Info Panel ===== */}
        <div className="sticky top-6 self-start">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mt-3 space-x-2">
            <div className="flex">{renderStars(product.rating || 0)}</div>
            <span className="text-gray-500 text-sm">
              ({product.ratingCount || 0} ratings)
            </span>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-baseline space-x-3">
            <span className="text-4xl font-extrabold text-gray-900">
              ₹{product.price}
            </span>
            <span className="line-through text-gray-400 text-lg">
              ₹{(product.price * 1.2).toFixed(0)}
            </span>
            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
              20% off
            </span>
          </div>

          {/* Features */}
          <div className="mt-6 space-y-2">
            {[
              "Smart Control with Mobile App",
              "Real-time Monitoring",
              "Overload Protection",
              "Easy Installation",
            ].map((feature, i) => (
              <div key={i} className="flex items-center text-gray-700">
                <FaCheckCircle className="text-green-500 mr-2" /> {feature}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-8 flex space-x-4">
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold shadow-md hover:scale-[1.02] transition"
            >
              Buy Now
            </button>
            <button
              onClick={() => {
                addToCart(product);
                toast.success(`${product.name} added to cart!`, {
                  icon: "🛒",
                });
              }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 rounded-xl font-semibold shadow-md transition"
            >
              Add to Cart
            </button>
          </div>

          {/* Delivery Info */}
          <div className="mt-6 text-sm text-gray-600 space-y-1">
            <p>🚚 Free Delivery within 3–5 days</p>
            <p>🔒 Secure Payment – 100% secure transactions</p>
            <p>📦 7-Day Easy Returns</p>
          </div>
        </div>
      </div>

      {/* ===== Tabs Section ===== */}
      <div className="mt-12">
        <div className="flex border-b">
          {["description", "specs", "warranty"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 -mb-px border-b-2 font-medium transition ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "description"
                ? "Description"
                : tab === "specs"
                ? "Specifications"
                : "Warranty"}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "description" && (
            <p className="text-gray-700 leading-relaxed">
              {product.description || "No description available."}
            </p>
          )}

          {activeTab === "specs" && (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "Input Voltage", value: "220V AC ±10%" },
                { label: "Motor Support", value: "Up to 2HP" },
                {
                  label: "Protection",
                  value: "Overload, Short Circuit, Phase Failure",
                },
                { label: "Display", value: "LED Status Indicators" },
                {
                  label: "Connectivity",
                  value: "Airtel SIM with 1-year recharge",
                },
                { label: "Warranty", value: "6 Months" },
              ].map((spec, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg shadow">
                  <p className="font-semibold">{spec.label}</p>
                  <p className="text-gray-600">{spec.value}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "warranty" && (
            <div className="bg-gray-50 p-6 rounded-lg shadow text-gray-700">
              <p>
                All products come with a{" "}
                <strong>6-month standard warranty</strong>. Extended warranty
                plans are available at checkout.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
