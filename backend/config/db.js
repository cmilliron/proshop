import mongoose from "mongoose";

const connectDB = async () => {
  const dbLink =
    process.env.NODE_ENV === "development"
      ? "mongodb://localhost:27017/proshop"
      : process.env.MONGO_URI;
  try {
    const conn = await mongoose.connect(dbLink);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
