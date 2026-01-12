import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Photo_Schema from "../../../../Schema/Photo_Schema";
import cloudinary from "../../../../lib/cloudinary";

export async function GET() {
  try {
    await dbConnect();
    const photos = await Photo_Schema.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: photos });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    
    const file = formData.get("file");
    const name = formData.get("name");

    if (!file || !name) {
      return NextResponse.json({ success: false, message: "Name and File are required" }, { status: 400 });
    }

    // 1. Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Upload to Cloudinary using a Promise
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "kanya_studio" }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(buffer);
    });

    // 3. Save to MongoDB (Notice eventDate is NOT here)
    const newPhoto = await Photo_Schema.create({
      name,
      imageUrl: uploadResponse.secure_url,
    });

    return NextResponse.json({ success: true, data: newPhoto });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    
    const id = formData.get("id");
    const name = formData.get("name");
    const file = formData.get("file");

    if (!id) return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });

    let updateData = { name };

    // Update image only if a new file is provided
    if (file && typeof file !== "string") {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "kanya_studio" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(buffer);
      });
      updateData.imageUrl = uploadResponse.secure_url;
    }

    const updatedPhoto = await Photo_Schema.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedPhoto) return NextResponse.json({ success: false, message: "Photo not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: updatedPhoto });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });

    const deletedPhoto = await Photo_Schema.findByIdAndDelete(id);
    if (!deletedPhoto) return NextResponse.json({ success: false, message: "Photo not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Photo deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}