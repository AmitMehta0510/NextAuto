import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import NextAuto from "../../public/NextAuto.png";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <footer className="bg-[#07111f] text-gray-300 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between px-4 md:px-6">
        {/* Left Navigation */}
        <ul className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mb-6 md:mb-0 text-sm font-medium w-full md:w-auto order-2 md:order-1">
          <li>
            <a
              href="/"
              onClick={handleHomeClick}
              className="hover:text-green-400 transition"
            >
              Home
            </a>
          </li>
          <li>
            <HashLink
              smooth
              to="/#features"
              className="hover:text-green-400 transition"
            >
              Features
            </HashLink>
          </li>
          <li>
            <HashLink
              smooth
              to="/#our-products"
              className="hover:text-green-400 transition"
            >
              Products
            </HashLink>
          </li>
          <li>
            <HashLink
              smooth
              to="/#contact-us"
              className="hover:text-green-400 transition"
            >
              Contact
            </HashLink>
          </li>
          <li>
            <Link
              to="/privacy-policy"
              className="hover:text-green-400 transition"
            >
              Privacy Policy
            </Link>
          </li>
        </ul>

        {/* Logo + Brand */}
        <div className="flex items-center mb-6 md:mb-0 order-1 md:order-2 w-full md:w-auto justify-center md:justify-start">
          <img src={NextAuto} alt="NextAuto" className="h-12 w-12 object-contain mr-3" />
          <div className="text-[#2edaf1] font-semibold text-2xl tracking-wider">
            NextAuto
          </div>
        </div>

        {/* Right Navigation (Socials) */}
        <div className="flex gap-3 md:gap-4 order-3 md:order-3 w-full md:w-auto justify-center md:justify-end">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 flex items-center justify-center border border-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 flex items-center justify-center border border-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            <FaTwitter size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 flex items-center justify-center border border-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            <FaLinkedinIn size={18} />
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 flex items-center justify-center border border-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            <FaWhatsapp size={18} />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400">
        © {new Date().getFullYear()} NextAuto. All rights reserved.
      </div>
    </footer>
  );
};
export default Footer;
