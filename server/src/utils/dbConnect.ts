import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = async () => {
  const URL = process.env.MONGO_URL || "";

  try {
    await mongoose.connect(URL);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
};
