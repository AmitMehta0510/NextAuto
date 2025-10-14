import Contact from "../models/Contact.js";

// Create new contact message
export const createContact = async (req, res) => {
  try {
    const { fullName, email, phone, applicationType, message } = req.body;

    if (!fullName || !email || !phone || !applicationType || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message must be at least 10 characters long",
      });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be exactly 10 digits",
      });
    }

    // ✅ Handle IPv6 properly
    const ipAddress =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      "";

    const contactData = {
      fullName,
      email,
      phone,
      applicationType,
      message,
      ip: ipAddress,
    };

    if (req.user?._id) contactData.user = req.user._id;

    const contact = await Contact.create(contactData);

    console.log("✅ New contact message saved:", contact._id);

    // ✅ Ensure response ends immediately
    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (err) {
    console.error("❌ Create Contact Error:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

// Get all contact messages (Admin only)
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

    return res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      contacts,
    });
  } catch (err) {
    console.error("❌ Get Contacts Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

// Get contact by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }
    return res.json({ success: true, contact });
  } catch (err) {
    console.error("❌ Get Contact Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

// Delete contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    await contact.deleteOne();
    return res.json({ msg: "Contact deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Contact Error:", err);
    return res
      .status(500)
      .json({ msg: "Server error", error: err.message });
  }
};
