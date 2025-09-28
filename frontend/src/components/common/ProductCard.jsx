/*
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-[#001F2E] rounded-lg shadow-lg overflow-hidden p-4 flex flex-col">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
      <h2 className="text-xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-400 text-sm mt-2">{product.description}</p>
      <p className="mt-3 font-semibold text-cyan-400">₹{product.price}</p>

      <div className="mt-auto flex justify-between gap-2">
        <Link
          to={`/products/${product._id}`}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded text-sm"
        >
          View Details
        </Link>
        <button
          onClick={onAddToCart}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
*/

import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-[#001F2E] rounded-lg shadow-lg overflow-hidden p-4 flex flex-col">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
      <h2 className="text-xl font-bold mt-4">{product.name}</h2>
      <p className="text-gray-400 text-sm mt-2">{product.description}</p>
      <p className="mt-3 font-semibold text-cyan-400">₹{product.price}</p>

      <div className="mt-auto flex justify-between gap-2">
        <Link
          to={`/products/${product._id}`}
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded text-sm"
        >
          View Details
        </Link>
        <button
          onClick={handleAddToCart}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
