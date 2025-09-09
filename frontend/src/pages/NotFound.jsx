import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="mt-2 text-gray-600">Page not found</p>
      <Link to="/" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
