import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGO_URL}`
    );
    console.log(`Database connected to ${connect.connection.host}`);
    return connect.connection.host;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
