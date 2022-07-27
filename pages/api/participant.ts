import type { NextApiRequest, NextApiResponse } from "next";
import  { createRouter } from "next-connect";
import connectDB from "@servers/config/index";
import participantsDb from "@servers/models/participant";

connectDB();

const router = createRouter<NextApiRequest, NextApiResponse>();

// create a participant
router.post(async (req, res) => {
  const { email, userName, type, pitchStory, presentationTitle,spokenAtWeb3Before, Im, location, ...others } = req.body;

  if(!type) {
    return res.status(423).json({
      status: false,
      message: "Participant type field is required",
    })
  }

  let userInfo = {
    ...req.body
  }


  if(type==='speaker') {
    userInfo= {
      ...userInfo,
      location:'',
      Im:''
    }
    if(!pitchStory || !presentationTitle){
      return  res.status(423).json({
        status: false,
        message: `${!pitchStory ? 'pitch story': ''} ${!presentationTitle ? 'presentation title': ''} is required`
      })
    }
  }
  if(type==='volunteer') {
    userInfo= {
      ...userInfo,
      pitchStory:'',
      presentationTitle:''
    }
    if(!location || !Im){
      return  res.status(423).json({
        status: false,
        message: `${!location ? 'location field': ''} ${!Im ? 'current working status': ''} is required`
      })
    }
  }

  
  if(!email || !userName) {
    return  res.status(423).json({
      status: false,
      message: `${!email ? 'email field': ''} ${!userName ? 'userName field': ''} is required`
    })
  }

  if (req.method === "POST") {    
    try {
        const userRegistering = await   await participantsDb.findOne({ email })
        if( userRegistering) {
            return res
            .status(423)
            .send({ status: false, message: "This user already exists" });
        }

        const data = {
          ...userInfo,
            userName:userName.toLowerCase(),
            email:email.toLowerCase(),
        }

        
        const userData:any = new participantsDb(data);
        const regSpeaker =  await userData.save()
            return res.status(200).json({
              status: true,
              data:regSpeaker,
              message: `Weldone, ${userName}, Your registration was successful`,
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
