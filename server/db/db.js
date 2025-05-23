import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongodb");
  } catch (error) {
    console.log("Fail to connect to mongodb ", error.message);
    process.exit(1);
  }
};

export default connectDB;
