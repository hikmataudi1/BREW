import mongoose from "mongoose";

export const connectDB = () => {
  mongoose.connect(
    'mongodb+srv://brewadmin:ufJVfJdIZwT4G5Xg@cluster1.jy0x3.mongodb.net/brewdb?retryWrites=true&w=majority&appName=Cluster1'
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("DB connection error:", error);
    process.exit(1)
  });
};
