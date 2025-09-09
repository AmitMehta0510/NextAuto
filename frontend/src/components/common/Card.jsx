import React from "react";

const Card = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white shadow rounded-lg p-6 ${className}`}>
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
