import React, { useState, useEffect } from "react";
import API from "../../utils/api.js";
import ProductCard from "../common/ProductCard.jsx";

export default function OurProducts() {
  const dummyProducts = [
    {
      _id: "1",
      name: "Single Phase Motor Controller",
      description: "Reliable motor control with overload and short circuit protection.",
      image: "https://tse4.mm.bing.net/th/id/OIP.-kSUNB5mCSMr6KJg9PldGAHaDX?pid=Api&P=0&h=180",
      features: [
        { icon: "⚡", text: "Power: 220V AC" },
        { icon: "🎚", text: "Motor Support: Up to 2HP" },
        { icon: "🛡", text: "Protection: Overload, Short Circuit" },
      ],
      price: 4999,
      oldPrice: 5999,
      tag: "New",
    },
    {
      _id: "2",
      name: "AMF Controller 2GS800",
      description: "Advanced MCU control with seamless switching under 100ms.",
      image: "https://assets-us-01.kc-usercontent.com/c02eb654-f40a-0080-b307-f20cbceaba2e/366dbede-bad9-481b-8c88-94ec2dccf137/iot%20product%20design.jpg?w=2000&h=1240&auto=format&q=70&fit=crop",
      features: [
        { icon: "🖥", text: "Advanced MCU Control" },
        { icon: "📡", text: "Remote Monitoring" },
        { icon: "⏱", text: "Seamless Switching: <100ms" },
      ],
      price: 4999,
      oldPrice: 6999,
      tag: "Premium",
    },
    {
      _id: "3",
      name: "Energy Storage System",
      description: "Next-gen battery backup solution with high efficiency.",
      image: "https://tse4.mm.bing.net/th/id/OIP.-kSUNB5mCSMr6KJg9PldGAHaDX?pid=Api&P=0&h=180",
      features: [
        { icon: "🔋", text: "High Capacity Lithium-ion Cells" },
        { icon: "⚡", text: "Fast Charging Support" },
        { icon: "♻️", text: "Eco-Friendly & Long Life" },
      ],
      price: 14999,
      oldPrice: 17999,
      tag: "New",
    },
    {
      _id: "4",
      name: "Smart Grid Controller",
      description: "IoT-enabled monitoring and optimization for smart grids.",
      image: "https://assets-us-01.kc-usercontent.com/c02eb654-f40a-0080-b307-f20cbceaba2e/366dbede-bad9-481b-8c88-94ec2dccf137/iot%20product%20design.jpg?w=2000&h=1240&auto=format&q=70&fit=crop",
      features: [
        { icon: "🌐", text: "IoT-Enabled Monitoring" },
        { icon: "📊", text: "Real-Time Analytics" },
        { icon: "🔌", text: "Seamless Grid Integration" },
      ],
      price: 9999,
      oldPrice: 11999,
      tag: "Premium",
    },
    {
      _id: "5",
      name: "Agriculture Technology",
      description: "Smart automation and AI-powered solutions for modern farming.",
      image: "https://tse4.mm.bing.net/th/id/OIP.-kSUNB5mCSMr6KJg9PldGAHaDX?pid=Api&P=0&h=180",
      features: [
        { icon: "🌱", text: "AI-Based Crop Monitoring" },
        { icon: "💧", text: "Automated Irrigation System" },
        { icon: "📱", text: "Mobile App Integration" },
      ],
      price: 7999,
      oldPrice: 8999,
      tag: "New",
    },
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/products")
      .then((res) => {
        setProducts(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="py-12 bg-[#020b12] text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Our <span className="text-cyan-400">Products</span>
      </h1>
      <p className="max-w-2xl mx-auto text-center text-gray-400 mb-10">
        Discover our cutting-edge solutions tailored for efficiency and reliability.
      </p>

      {loading ? (
        <p className="text-center text-gray-400">Loading products...</p>
      ) : dummyProducts.length === 0 ? (
        <p className="text-center text-gray-400">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {dummyProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
