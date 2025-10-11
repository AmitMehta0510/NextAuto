import React, { useState, useRef } from "react";

const OtpInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    onChange(newOtp.join(""));

    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  return (
    <div className="flex justify-center gap-2 mt-4">
      {otp.map((value, idx) => (
        <input
          key={idx}
          ref={(el) => (inputsRef.current[idx] = el)}
          type="text"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(e.target.value, idx)}
          className="w-10 h-12 text-lg text-center bg-transparent border border-gray-600 rounded-lg text-white 
                     focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
        />
      ))}
    </div>
  );
};

export default OtpInput;
