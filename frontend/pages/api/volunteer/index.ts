import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB, {conferenceStatus} from "@servers/config/index";
import volunteersDb from "@servers/models/volunteers";
import { registrationEmail } from "@servers/mailer";

connectDB();

const router = createRouter<NextApiRequest, NextApiResponse>();

// create a volunteer
router.post(async (req, res) => {

  if(conferenceStatus){
    return res.status(423).json({
      status: false,
      message: "Conference registration is currently closed",
    });
  }
  const {
    email,
    userName,
    location,
    skills,
    areaOfContribution,
  } = req.body;


  let userInfo = {
    ...req.body,
  };

  if (!email || !userName) {
    return res.status(423).json({
      status: false,
      message: `${!email ? "email field" : ""} ${
        !userName ? "name field" : ""
      } is required`,
    });
  }

  if(!location || !skills || !areaOfContribution){
    return res.status(423).json({
      status: false,
      message: `${!location ? "location field" : ""} ${
        !skills ? "skills field" : ""
      } ${
        !areaOfContribution ? "area of contribution field" : ""
      } is required`,
    });
  }

  try {
    const userRegistering = await volunteersDb.findOne({ email });
    if (userRegistering) {
      return res
        .status(423)
        .send({ status: false, message: "This user already exists" });
    }

    const data = {
      ...userInfo,
      userName: userName.toLowerCase(),
      email: email.toLowerCase(),
    };

    const userData: any = new volunteersDb(data);
    const regSpeaker = await userData.save();
    await registrationEmail(email,'volunteer', userName);

    return res.status(200).json({
      status: true,
      data: regSpeaker,
      message: `Welldone, ${userName}, Your registration was successful. We've sent you a confirmation, if you can't find it, please check your spam folder`,
    });
  } catch (e) {
    console.log('error', e)
    res.status(423).json({
      error: e,
    });
  }
});



interface IQuery {
  type?: string | string[] | undefined;
  page?: number | string;
}

router.get(async (req, res) => {
 
  try {
    const users = await volunteersDb.find();

    return res.status(200).json({
      status: true,
      data: users,
    });
  } catch (e) {
    return res.status(500).json({
      status: false,
      error: "server error",
    });
  }
});

export default router.handler({
  // @ts-ignore
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});
