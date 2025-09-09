import Contact from "../models/Contact.js";

// @desc Create new contact message
export const createContact = async (req, res) => {
  try {
    const { fullName, email, phone, applicationType, message } = req.body;

    if (!fullName || !email || !phone || !applicationType || !message) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const contact = new Contact({
      fullName,
      email,
      phone,
      applicationType,
      message,
    });

    await contact.save();
    res.status(201).json({ msg: "Message sent successfully", contact });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// @desc Get all contact messages (Admin only)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
