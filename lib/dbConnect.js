import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB environment variable");
}

/**
 * Global cache prevents multiple connections during hot reloads.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // 1. If we have a connection, return it immediately
  if (cached.conn) return cached.conn;

  // 2. If we don't have a promise to connect, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("🚀 New MongoDB Connection Established");
      return mongoose;
    });
  }

  // 3. Wait for the promise and cache the connection
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;