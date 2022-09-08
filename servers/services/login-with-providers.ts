import connectDB, { closeDB } from "@servers/config";
import userDb from "@servers/models/participant";
import crypto from "crypto";
import { hash } from "bcryptjs";

const loginWithProviders = async (data: any) => {
  let firstTimeConnection = false;
  await connectDB();
  const { email, authWith } = data;

  if (!email) {
    throw new Error("email field is required");
  }

  try {
    const userRegistering = await userDb.findOne({ email });
    if (!userRegistering) firstTimeConnection = true;

    if (!firstTimeConnection) {
      return { status: true, message: "login successful" };
    }
    const password = crypto.randomBytes(32).toString("hex");
    const hashPassword = await hash(
      password,
      Number(process.env.BCRYPT_SALT as string)
    );

    const info = {
      ...data,
      password: hashPassword,
      email: email.toLowerCase(),
      authWith,
    };
    const userData: any = new userDb(info);
    await userData.save();
    await closeDB();

    return { ...data, id: userData.id, status: true };
  } catch (e: any) {
    console.log(e, "error in catch");
    throw new Error(e);
  }
};

export default loginWithProviders;
