import OTP from "../models/OTP.js";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import twilio from "twilio";

// (optional) configure Twilio for SMS
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ✅ Send OTP to email or phone
export const sendOtp = async (req, res) => {
  try {
    const { identifier } = req.body; // email or phone

    if (!identifier)
      return res.status(400).json({ message: "Email or phone is required" });

    // Delete old OTPs for this identifier
    await OTP.deleteMany({ identifier });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await OTP.create({ identifier, otp, expiresAt });

    // If email
    if (identifier.includes("@")) {
      const subject = "🔐 Your NextAuto verification code is : ";
      const html = `
        <h2>Your OTP </h2>
        <p>Use this code to verify your account:</p>
        <h3>${otp}</h3>
        <p>This code expires in 30 minutes.</p>
      `;
      await sendEmail(identifier, subject, html);
    } else {
      // If phone, send via Twilio
      await client.messages.create({
        body: `Your NextAuto verification code is ${otp}`,
        from: process.env.TWILIO_PHONE,
        to: `+91${identifier}`,
      });
    }

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { identifier, otp } = req.body;

    // Find OTP record for this identifier
    const record = await OTP.findOne({ identifier });

    if (!record) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    // Compare OTP manually
    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check expiration
    if (record.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: record._id });
      return res.status(400).json({ message: "OTP expired" });
    }

    // OTP verified — remove record
    await OTP.deleteOne({ _id: record._id });

    res.json({ success: true, message: "OTP verified successfully" });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
