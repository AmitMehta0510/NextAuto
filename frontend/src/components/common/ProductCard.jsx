import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-[#001F2E] rounded-lg shadow-lg overflow-hidden p-3 sm:p-4 flex flex-col min-w-[220px] max-w-md">
      <img
        src={
          product.images?.[0] ||
          product.image ||
          "https://via.placeholder.com/300"
        }
        alt={product.name}
        className="h-32 sm:h-40 w-full object-cover rounded"
      />

      <h2 className="text-base sm:text-xl font-bold mt-3 sm:mt-4 line-clamp-1">{product.name}</h2>
      <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2 line-clamp-2">{product.description}</p>
      <p className="mt-2 sm:mt-3 font-semibold text-cyan-400 text-sm sm:text-base">₹{product.price}</p>

      <div className="mt-auto flex flex-col sm:flex-row gap-2">
        <Link
          to={`/products/${product._id}`}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-center"
        >
          View Details
        </Link>
        <button
          onClick={handleAddToCart}
          className="bg-green-500 hover:bg-green-600 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ProductCard;
