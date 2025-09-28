import React, { useState, useEffect } from "react";
import API from "../../utils/api.js";
import ProductCard from "../common/ProductCard.jsx";
import { useCart } from "../../context/CartContext.jsx"; // ✅ hook

export default function OurProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

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
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onAddToCart={() => addToCart(p)} // ✅
            />
          ))}
        </div>
      )}
    </div>
  );
}
