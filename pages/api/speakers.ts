import type { NextApiRequest, NextApiResponse } from "next";
import  { createRouter } from "next-connect";
import connectDB from "@servers/config/index";
import speakersDb from "@servers/models/speakers";

connectDB();

const router = createRouter<NextApiRequest, NextApiResponse>();

// create a speaker
router.post(async (req, res) => {
  const { email, name, ...others } = req.body;
  
  if (req.method === "POST") {
    !email
      ? res.status(423).json({
          status: false,
          message: "Email field is required",
        })
      : !name ?  res.status(423).json({
        status: false,
        message: "Name field is required",
      }):"";

    try {
        const userRegistering = await   await speakersDb.findOne({ email })
        if( userRegistering) {
            return res
            .status(423)
            .send({ status: false, message: "This user already exists" });
        }
    
        const data = {
            name:name.toLowerCase(),
            email:email.toLowerCase(),
            ...others
        }

        
        const userData = new speakersDb(data);
        const regSpeaker =  await userData.save()
            return res.status(200).json({
              status: true,
              data:regSpeaker,
              message: `Hi, ${name}, Your registration was successful`,
            });

    } catch (e) {
      res.status(423).json({
        error:e,

      })
    }
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
