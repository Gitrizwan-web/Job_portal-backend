import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log(error);
  }
};
