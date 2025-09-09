import React, { useState } from "react";
import API from "../../utils/api";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    applicationType: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await API.post("/contact", formData);
      setStatus(res.data.msg);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        applicationType: "",
        message: "",
      });
    } catch (err) {
      setStatus(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <section className="py-16 bg-[#020b12] text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Get In Touch And Let's Collaborate With{" "}
          <span className="text-cyan-400">NextAuto</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left - Info */}
          <div className="space-y-8">
            <div className="bg-[#041421]/80 p-6 rounded-xl shadow-lg border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="bg-cyan-500 w-12 h-12 flex items-center justify-center rounded-full text-2xl">
                  📍
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Office Location</h4>
                  <p className="text-gray-400">
                    01, Beside Fine Art Apartment, Bishnoi Tailor, Puna Tolly,
                    Gondia - 441601, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#041421]/80 p-6 rounded-xl shadow-lg border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="bg-cyan-500 w-12 h-12 flex items-center justify-center rounded-full text-2xl">
                  📞
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Phone Number</h4>
                  <p className="text-gray-400">+91 8446577303, 6375036710</p>
                </div>
              </div>
            </div>

            <div className="bg-[#041421]/80 p-6 rounded-xl shadow-lg border border-gray-700">
              <div className="flex items-center gap-4">
                <div className="bg-cyan-500 w-12 h-12 flex items-center justify-center rounded-full text-2xl">
                  ✉️
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Drop Us A Line</h4>
                  <p className="text-gray-400">help.nextauto@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-[#041421]/80 p-8 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone"
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
                required
              />
              <select
                name="applicationType"
                value={formData.applicationType}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
                required
              >
                <option value="">Select Application</option>
                <option value="industrial">Industrial</option>
                <option value="agriculture">Agriculture</option>
                <option value="residential">Residential</option>
              </select>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition"
              >
                Send Message
              </button>
            </form>
            {status && (
              <p className="mt-4 text-sm text-center text-gray-300">{status}</p>
            )}
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 text-center">
          <h4 className="text-lg font-medium mb-4">Official Social Media :</h4>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition"
            >
              <FaFacebookF className="text-white text-lg" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition"
            >
              <FaTwitter className="text-white text-lg" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition"
            >
              <FaInstagram className="text-white text-lg" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition"
            >
              <FaLinkedinIn className="text-white text-lg" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition"
            >
              <FaYoutube className="text-white text-lg" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
