import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB from "@servers/config/index";
import participantsDb from "@servers/models/participant";
import { registrationEmail } from "@servers/mailer";

connectDB();

const router = createRouter<NextApiRequest, NextApiResponse>();

// create a participant
router.post(async (req, res) => {
  const {
    email,
    userName,
    type,
    pitchStory,
    presentationTitle,
    spokenAtWeb3Before,
    Im,
    location,
    ...others
  } = req.body;

  if (!type) {
    return res.status(423).json({
      status: false,
      message: "Participant type field is required",
    });
  }

  let userInfo = {
    ...req.body,
  };

  if (type === "speaker") {
    userInfo = {
      ...userInfo,
      location: "",
      Im: "",
    };
    if (!pitchStory || !presentationTitle) {
      return res.status(423).json({
        status: false,
        message: `${!pitchStory ? "pitch story" : ""} ${
          !presentationTitle ? "presentation title" : ""
        } is required`,
      });
    }
  }
  if (type === "volunteer") {
    userInfo = {
      ...userInfo,
      pitchStory: "",
      presentationTitle: "",
    };
    if (!location || !Im) {
      return res.status(423).json({
        status: false,
        message: `${!location ? "location field" : ""} ${
          !Im ? "current working status" : ""
        } is required`,
      });
    }
  }

  if (!email || !userName) {
    return res.status(423).json({
      status: false,
      message: `${!email ? "email field" : ""} ${
        !userName ? "name field" : ""
      } is required`,
    });
  }

  try {
    const userRegistering = await participantsDb.findOne({ email });
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

    const userData: any = new participantsDb(data);
    const regSpeaker = await userData.save();
    await registrationEmail(email, type, userName);

    return res.status(200).json({
      status: true,
      data: regSpeaker,
      message: `Welldone, ${userName}, Your registration was successful. We've sent you a confirmation, if you can't find it, please check your spam folder`,
    });
  } catch (e) {
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
  const { type }: IQuery = req.query;

  try {
    const users = await participantsDb.find({
      ...(!!type && { type }),
    });

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
