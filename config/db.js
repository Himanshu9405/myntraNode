import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://piyushmanglani45:ReKxeZCXGemexS4W@testcluster.sqifl.mongodb.net');
    console.log(`connected to mongodb database ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error while Connecting Database ${error}`);
  }
};

export default connectDB;