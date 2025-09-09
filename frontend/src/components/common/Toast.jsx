import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 text-white rounded shadow ${colors[type]}`}
    >
      {message}
    </div>
  );
};

export default Toast;
