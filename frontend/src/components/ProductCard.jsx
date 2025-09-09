import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-40 object-cover rounded-md mb-3"
      />

      {/* Product Info */}
      <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
      <p className="text-gray-600 text-sm flex-1">{product.description}</p>
      <p className="font-bold text-blue-600 mt-2">₹{product.price}</p>

      {/* Actions */}
      <div className="mt-3 flex justify-between items-center">
        <Link
          to={`/product/${product.id}`}
          className="text-sm text-blue-500 hover:underline"
        >
          View Details
        </Link>
        <button className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-600">
          <ShoppingCart className="w-4 h-4" />
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
