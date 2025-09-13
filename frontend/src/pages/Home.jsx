import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";
import HeroSection from "../components/HomeComponents/HeroSection.jsx";
import KeyFeatures from "../components/HomeComponents/KeyFeatures.jsx";
import OurProducts from "../components/HomeComponents/OurProducts.jsx";
import ContactUs from "../components/HomeComponents/ContactUs.jsx";

const Home = () => {
  return (
    <>
      <HeroSection />
      <div id='features'>
        <KeyFeatures /> 
      </div>
      <div id="our-products">
        <OurProducts />
      </div>
      <div id="contact-us">
        <ContactUs /> 
      </div>
    </>
  );
};

export default Home;
