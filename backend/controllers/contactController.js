import Contact from "../models/Contact.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createContact = async (req, res) => {
  try {
    const { fullName, email, phone, applicationType, message } = req.body;

    // ===== Validation =====
    if (!fullName || !email || !phone || !applicationType || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits",
      });
    }

    // ===== Save to DB =====
    const contact = await Contact.create({
      fullName,
      email,
      phone,
      applicationType,
      message,
      ip: req.ip,
    });

    if (req.user?._id) contact.user = req.user._id;

    // ===== Admin Email =====
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminSubject = `📩 New Contact Message from ${fullName}`;
    const adminHtml = `
      <h2>New Contact Message Received</h2>
      <p><b>Name:</b> ${fullName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Application Type:</b> ${applicationType}</p>
      <p><b>Message:</b><br/>${message}</p>
      <hr/>
      <p>IP: ${req.ip}</p>
      <p>Sent on: ${new Date().toLocaleString()}</p>
    `;

    await sendEmail(adminEmail, adminSubject, adminHtml);

    // ===== Acknowledgement Email to User =====
    const userSubject = "✅ We’ve received your message – NextAuto";
    const userHtml = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Hi ${fullName},</h2>
        <p>Thank you for reaching out to <b>NextAuto</b>!</p>
        <p>We’ve successfully received your message and our team will get back to you soon.</p>

        <h4>Your Message Summary:</h4>
        <ul>
          <li><b>Application Type:</b> ${applicationType}</li>
          <li><b>Message:</b> ${message}</li>
        </ul>

        <p>If you have any urgent queries, feel free to reply to this email.</p>
        <br/>
        <p>Warm regards,</p>
        <p><b>NextAuto Team</b></p>
        <p><a href="https://nextauto.in" style="color: #008cff;">Visit our website</a></p>
      </div>
    `;

    await sendEmail(email, userSubject, userHtml);

    // ===== Response =====
    res.status(201).json({
      success: true,
      message: "Message sent successfully. Check your email for confirmation.",
      contact,
    });
  } catch (err) {
    console.error("Create Contact Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

// Get all contact messages (with filters & pagination) , Admin only
export const getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, email, applicationType } = req.query;

    const filter = {};
    if (email) filter.email = email;
    if (applicationType) filter.applicationType = applicationType;

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      contacts,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

// controllers/contactController.js
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }
    res.json({ success: true, contact });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

// @desc Delete a contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    await contact.deleteOne();
    res.json({ msg: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
