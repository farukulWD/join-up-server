import mongoose from "mongoose";
import config from "../config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    console.info("Connected to MongoDB successfully.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
