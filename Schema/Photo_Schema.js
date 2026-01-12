import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Project name is required"] 
  },
  imageUrl: { 
    type: String, 
    required: [true, "Image is required"] 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Important: This handles the model cache in Next.js
export default mongoose.models.Photo_Schema || mongoose.model("Photo_Schema", PhotoSchema);