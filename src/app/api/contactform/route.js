import { NextResponse } from "next/server";
import mongoose from "mongoose";
import contactModel from "../../../../Schema/Contact_Schema.js";

let isConnected = false;
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB);
    console.log("✅ Connected to MongoDB");
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, phone, guestCount, eventDetails, location, eventDate, services } = body;

    // Connect to MongoDB
    await connectDB();

    const newContact = new contactModel({
      name,
      email,
      phone,
      guestCount,
      eventDetails,
      location,
      eventDate,
      services,
    });

    await newContact.save();

    return NextResponse.json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error("❌ Error saving contact:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const contacts = await contactModel
      .find()
      .sort({ createdAt: -1 }); // latest first

    return NextResponse.json(
      { success: true, data: contacts },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ GET Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}


