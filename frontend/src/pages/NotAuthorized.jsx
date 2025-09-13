import React from "react";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <h2 className="text-2xl font-semibold mt-4">Not Authorized</h2>
      <p className="text-gray-600 mt-2 text-center">
        You don’t have permission to view this page.
      </p>
      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotAuthorized;
