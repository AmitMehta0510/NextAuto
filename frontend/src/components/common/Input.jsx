import React from "react";

const Input = ({ label, type = "text", ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      {...props}
      className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-300"
    />
  </div>
);

export default Input;
