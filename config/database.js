import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  let connectionString = process.env.MONGO_URI;
  const { connection } = await mongoose.connect(connectionString);
  console.log(`MongoDB connected with ${connection.host}`);
};
