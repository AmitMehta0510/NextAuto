import React from "react";
import bgVideo from "../../assets/background3.mp4";
const HeroSection = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center text-white overflow-hidden bg-green-400">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover bg-red-500"
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Advanced AMF & Agriculture IoT Solutions
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-200">
          Intelligent power management for industrial and agricultural
          applications. <br />
          Optimized performance, safety, and efficiency with cutting-edge
          automation.
        </p>
        <div className="mt-8">
          <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white text-lg font-semibold rounded-full shadow-lg transition">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
