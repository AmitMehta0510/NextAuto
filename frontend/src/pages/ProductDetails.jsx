import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    API.get(`/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="font-semibold text-lg">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
