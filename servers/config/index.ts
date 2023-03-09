import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGO_URL}`);
    // console.log(`Database connected to ${connect.connection.host}`);
    return connect.connection.host;
  } catch (error) {
    console.log(error);
  }
};

export const mailSenderConfig = {
  from: "events@web3bridge.com",
  emailSubject: "Web3 Lagos Conference 2023",
  replyTo: "events@web3bridge.com",
};

export const closeDB = async () => {
  try {
    return await mongoose.connection.close();
  } catch {}
};


export const conferenceStatus = false;

export default connectDB;
