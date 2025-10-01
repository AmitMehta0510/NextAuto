import Contact from "../models/Contact.js";

// Create new contact message
export const createContact = async (req, res) => {
  try {
    const { fullName, email, phone, applicationType, message } = req.body;

    // Check required fields
    if (!fullName || !email || !phone || !applicationType || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check message length
    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 10 characters long",
      });
    }

    // Validate phone: only digits, exactly 10 characters
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits",
      });
    }

    // Prepare contact data
    const contactData = { fullName, email, phone, applicationType, message, ip: req.ip };
    if (req.user?._id) contactData.user = req.user._id;

    const contact = await Contact.create(contactData);

    console.log("New contact message created:", contact);
    res.status(201).json({ success: true, message: "Message sent successfully", contact });
  } catch (err) {
    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }

    console.error("Create Contact Error:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
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
