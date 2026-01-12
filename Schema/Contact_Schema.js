import mongoose from "mongoose";

const Contact_Schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    guestCount: String,
    eventDetails: String,
    location: String,
    eventDate: String,
    services: [String],
  },
  { timestamps: true }
);

// 🔑 Prevent OverwriteModelError
const contactModel =
  mongoose.models.contacts_data ||
  mongoose.model("contacts_data", Contact_Schema);

export default contactModel;
