import React, { useState } from "react";
import API from "../../utils/api";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    applicationType: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/contact", formData);
      console.log("Contact us data : ", res.data);
      toast.success(res.data.message || "Message sent successfully ✅");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        applicationType: "",
        message: "",
      });

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-[#020b12] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Get In Touch With <span className="text-cyan-400">NextAuto</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left Info */}
          <div className="space-y-8">
            {[
              {
                icon: "📍",
                title: "Office Location",
                text: "01, Beside Fine Art Apartment, Puna Tolly, Gondia - 441601",
              },
              {
                icon: "📞",
                title: "Phone Number",
                text: "+91 8446577303, +91 6375036710",
              },
              {
                icon: "✉️",
                title: "Drop Us A Line",
                text: "help.nextauto@gmail.com",
              },
            ].map((info, idx) => (
              <div
                key={idx}
                className="bg-[#041421]/80 p-6 rounded-xl shadow-lg border border-gray-700 flex gap-4"
              >
                <div className="bg-cyan-500 w-12 h-12 flex items-center justify-center rounded-full text-2xl">
                  {info.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{info.title}</h4>
                  <p className="text-gray-400">{info.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Form */}
          <div className="bg-[#041421]/80 p-8 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              {["fullName", "email", "phone"].map((field) => (
                <input
                  key={field}
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "tel"
                      : "text"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Your ${
                    field.charAt(0).toUpperCase() + field.slice(1)
                  }`}
                  className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
                  required
                />
              ))}
              <select
                name="applicationType"
                value={formData.applicationType}
                onChange={handleChange}
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
                required
              >
                <option value="">Select Application</option>
                <option className="text-gray-600" value="industrial">Industrial</option>
                <option className="text-gray-600" value="agriculture">Agriculture</option>
                <option className="text-gray-600" value="residential">Residential</option>
              </select>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 text-center">
          <h4 className="text-lg font-medium mb-4">Official Social Media :</h4>
          <div className="flex justify-center gap-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-600 transition"
                >
                  <Icon className="text-white text-lg" />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;