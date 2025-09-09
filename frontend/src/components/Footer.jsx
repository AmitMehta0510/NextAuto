import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import NextAuto from '../../public/NextAuto.png'

const Footer = () => {
  return (
    <footer className="bg-[#07111f] text-gray-300 py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6">
        {/* Left Navigation */}
        <ul className="flex flex-wrap justify-center lg:justify-start gap-6 mb-6 lg:mb-0 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-green-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/features" className="hover:text-green-400 transition">
              Features
            </Link>
          </li>
          <li>
            <Link to="/applications" className="hover:text-green-400 transition">
              Applications
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-green-400 transition">
              Contact
            </Link>
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
        <div className="flex items-center space-x-2 mb-6 lg:mb-0">
          <img src={NextAuto} alt="" className="h-16" />
          <div className="text-[#2edaf1] font-semibold text-2xl tracking-wider">NextAuto</div>
        </div>

        {/* Right Navigation (Socials) */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            <FaTwitter size={18} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
          >
            <FaLinkedinIn size={18} />
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 flex items-center justify-center border border-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition"
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
