import mongoose from "mongoose";

const dbConnection = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URL);

  if (connection) {
    console.log("MongoDB Connected Successfully");
  } else {
    console.log("MongoDB not Connected");
  }
};

export default dbConnection;
