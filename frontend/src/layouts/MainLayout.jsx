// import React, { useState } from "react";
// import { Outlet, Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react"; // icons

// const MainLayout = () => {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);

//   const navLinks = [
//     { to: "/", label: "Home" },
//     { to: "/cart", label: "Cart" },
//     { to: "/orders", label: "Orders" },
//     { to: "/profile", label: "Profile" },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Navbar */}
//       <header className="bg-white shadow sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           {/* Logo */}
//           <Link to="/" className="text-2xl font-bold text-blue-600">
//             NextAuto
//           </Link>

//           {/* Desktop Nav */}
//           <nav className="hidden md:flex space-x-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.to}
//                 to={link.to}
//                 className={`text-gray-700 hover:text-blue-600 ${
//                   location.pathname === link.to ? "font-semibold text-blue-600" : ""
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Auth Buttons */}
//           <div className="hidden md:flex space-x-3">
//             <Link
//               to="/login"
//               className="px-4 py-2 border rounded-lg hover:bg-gray-100"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               Register
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden focus:outline-none"
//           >
//             {isOpen ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>

//         {/* Mobile Drawer */}
//         {isOpen && (
//           <div className="md:hidden bg-white shadow-lg">
//             <nav className="flex flex-col space-y-4 px-6 py-4">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.to}
//                   to={link.to}
//                   className={`text-gray-700 hover:text-blue-600 ${
//                     location.pathname === link.to ? "font-semibold text-blue-600" : ""
//                   }`}
//                   onClick={() => setIsOpen(false)} // close drawer after navigation
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//               <div className="flex flex-col space-y-2 pt-4 border-t">
//                 <Link
//                   to="/login"
//                   className="px-4 py-2 border rounded-lg text-center hover:bg-gray-100"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Register
//                 </Link>
//               </div>
//             </nav>
//           </div>
//         )}
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 bg-gray-50">
//         <Outlet />
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 mt-10">
//         <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
//           {/* About */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-white">About NextAuto</h3>
//             <p className="text-sm">
//               NextAuto is your trusted platform for the best automotive devices
//               and accessories. We provide high-quality products with fast delivery.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
//             <ul className="space-y-2">
//               {navLinks.map((link) => (
//                 <li key={link.to}>
//                   <Link to={link.to} className="hover:text-blue-400">
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-white">Contact Us</h3>
//             <p>Email: support@nextauto.com</p>
//             <p>Phone: +91 98765 43210</p>
//           </div>
//         </div>
//         <div className="bg-gray-800 py-4 text-center text-sm">
//           © {new Date().getFullYear()} NextAuto. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default MainLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
