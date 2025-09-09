import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";
import HeroSection from "../components/HomeComponents/HeroSection.jsx";  
import KeyFeatures from "../components/HomeComponents/KeyFeatures.jsx";
import OurProducts from "../components/HomeComponents/OurProducts.jsx";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products").then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      <HeroSection />
      <KeyFeatures/>
      <OurProducts/>
    <div>
      <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border rounded-lg p-4 shadow hover:shadow-lg">
            <img src={p.image} alt={p.name} className="h-40 w-full object-cover mb-4" />
            <h2 className="font-semibold">{p.name}</h2>
            <p>${p.price}</p>
            <Link to={`/product/${p._id}`} className="text-blue-600 mt-2 block">View Details</Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;
