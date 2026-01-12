import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import cloudinary from "../../../../lib/cloudinary";
import Video_schema from "../../../../Schema/Video_schema";

export async function GET() {
  try {
    await dbConnect();
    const videos = await Video_schema.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: videos });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title");

    if (!file || !title) {
      return NextResponse.json({ success: false, message: "Title and Video are required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ 
        resource_type: "video", // CRITICAL for video files
        folder: "kanya_studio_videos" 
      }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }).end(buffer);
    });

    const newVideo = await Video_schema.create({
      title,
      videoUrl: uploadResponse.secure_url,
    });

    return NextResponse.json({ success: true, data: newVideo });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    await Video_schema.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Video deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}