import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-[#041421]/95 group flex flex-col">
      {/* Tag (New / Premium etc.) */}
      {product?.tag && (
        <span className="absolute top-3 right-3 bg-cyan-500 text-xs font-semibold text-white px-3 py-1 rounded-full shadow">
          {product.tag}
        </span>
      )}

      {/* Product Image */}
      <div className="w-full h-48 overflow-hidden">
        {product?.image ? (
          <img
            src={product.image}
            alt={product.name || "Product"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow p-4 text-white">
        <h2 className="text-lg font-bold mb-1">
          {product?.name || "Unnamed Product"}
        </h2>
        <p className="text-gray-300 text-sm line-clamp-2 mb-2">
          {product?.description || "No description available."}
        </p>

        {/* Features */}
        {product?.features?.length > 0 && (
          <ul className="mb-3 space-y-1 text-sm text-gray-300">
            {product.features.map((f, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-cyan-400">{f.icon}</span>
                {f.text}
              </li>
            ))}
          </ul>
        )}

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-green-400">
            ₹{product?.price?.toLocaleString() || "N/A"}
          </span>
          {product?.oldPrice && (
            <span className="text-gray-400 line-through text-sm">
              ₹{product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-4">
          <Link
            to={product?._id ? `/product/${product._id}` : "#"}
            className="text-cyan-400 font-medium hover:underline"
          >
            View Details →
          </Link>
          <button className="ml-auto bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
