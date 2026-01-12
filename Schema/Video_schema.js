import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Video title is required"] 
  },
  videoUrl: { 
    type: String, 
    required: [true, "Video URL is required"] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

export default mongoose.models.Video_Schema || mongoose.model("Video_Schema", VideoSchema);