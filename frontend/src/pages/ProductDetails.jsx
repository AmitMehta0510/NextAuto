import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import { useCart } from "../context/CartContext";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  // Render stars dynamically
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }

    while (stars.length < 5) {
      stars.push(<FaRegStar key={`empty-${stars.length}`} className="text-yellow-400" />);
    }

    return stars;
  };

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-400 text-lg">
        Loading product details...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 text-gray-900">
      <div className="grid md:grid-cols-2 gap-10">
        {/* ===== Left: Image Gallery ===== */}
        <div>
          <div className="border rounded-xl p-4 bg-white shadow">
            <img
              src={product.image || "https://via.placeholder.com/400"}
              alt={product.name}
              className="w-full h-[350px] object-contain"
            />
          </div>
          {/* Thumbnails (for now showing same image) */}
          <div className="flex space-x-4 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-20 h-20 border rounded-xl p-2 bg-white shadow cursor-pointer hover:border-cyan-500"
              >
                <img
                  src={product.image || "https://via.placeholder.com/100"}
                  alt={`thumb-${i}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ===== Right: Product Details ===== */}
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          {/* Ratings + count */}
          <div className="flex items-center mt-2 space-x-2">
            <div className="flex">{renderStars(product.rating || 0)}</div>
            <span className="text-gray-500 text-sm">
              ({product.ratingCount || 0} ratings)
            </span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-baseline space-x-3">
            <p className="text-3xl font-bold text-gray-800">₹{product.price}</p>
            <p className="line-through text-gray-400">₹{(product.price * 1.2).toFixed(0)}</p>
            <span className="text-green-600 font-semibold">20% off</span>
          </div>

          {/* Key Features */}
          <div className="mt-6">
            <h2 className="font-semibold text-lg">Key Features</h2>
            <ul className="mt-2 space-y-2 text-gray-700">
              <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> Smart Control with Mobile App</li>
              <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> Real-time Monitoring</li>
              <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> Overload Protection</li>
              <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" /> Easy Installation</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex space-x-4">
            <button
              onClick={() => {
                addToCart(product);
                window.location.href = "/checkout";
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
            >
              Buy Now
            </button>

            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-3 rounded-lg font-semibold shadow-md transition"
            >
              Add to Cart
            </button>
          </div>

          {/* Delivery & Payment Info */}
          <div className="mt-6 text-sm text-gray-600 space-y-2">
            <p>🚚 Free Delivery </p>
            <p>🔒 Secure Payment – 100% secure transactions</p>
          </div>
        </div>
      </div>

      {/* ===== Tabs Section ===== */}
      <div className="mt-12 border-t pt-6">
        <div className="flex space-x-8 border-b pb-3">
          <button className="text-blue-600 font-semibold">Specifications</button>
          <button className="text-gray-500 hover:text-gray-700">Description</button>
          <button className="text-gray-500 hover:text-gray-700">Warranty</button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="font-semibold">Input Voltage</p>
            <p className="text-gray-600">220V AC ±10%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="font-semibold">Motor Support</p>
            <p className="text-gray-600">Up to 2HP</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="font-semibold">Protection</p>
            <p className="text-gray-600">Overload, Short Circuit, Phase Failure</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="font-semibold">Display</p>
            <p className="text-gray-600">LED Status Indicators</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="font-semibold">Connectivity</p>
            <p className="text-gray-600">Airtel SIM with 1-year recharge</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <p className="font-semibold">Warranty</p>
            <p className="text-gray-600">6 Months</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
