import mongoose from "mongoose";

const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to DB successfully!");
  } catch (error) {
    console.error("Failed to connect to DB:", error);
    process.exit(1); 
  }
};

export default Connect;
