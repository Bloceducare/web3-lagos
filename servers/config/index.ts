import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGO_URL}`
    );
    // console.log(`Database connected to ${connect.connection.host}`);
    return connect.connection.host;
  } catch (error) {
    console.log(error);
  }
};

export const mailSenderConfig ={
  from:"eth-lagos@sandbox6c3d0653cf6f40f8bd343b3dab567016.mailgun.org",
  emailSubject:"Eth Lagos 2022 Application"
}

export default connectDB;
