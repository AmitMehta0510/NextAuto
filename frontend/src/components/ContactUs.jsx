import React, { useState } from "react";
import API from "../utils/api";

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Contact Us
          <div className="w-24 h-1 bg-green-600 mx-auto mt-2 rounded"></div>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Left - Info */}
          <div className="bg-green-700 text-white p-8">
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
            <p className="mb-6">
              01, Beside Fine Art Apartment, Bishnoi Tailor, Puna Tolly, Gondia - 441601, Maharashtra, India
            </p>
            <ul className="space-y-4">
              <li>📞 +91 8446577303, 6375036710</li>
              <li>✉️ help.nextauto@gmail.com</li>
              <li>⏰ Mon - Fri: 9:00 AM - 6:00 PM</li>
            </ul>
          </div>

          {/* Right - Form */}
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
              <select
                name="applicationType"
                value={formData.applicationType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
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
                placeholder="Message"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg"
              >
                Send Message
              </button>
            </form>
            {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
