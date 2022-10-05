import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB, { closeDB } from "@servers/config/index";
import usersDb from  "@servers/models/participant"
import {  sendHackatonEmail } from "@servers/mailer";


const router = createRouter<NextApiRequest, NextApiResponse>();


router.get(async (req, res) => {
  const {start, max} = req.query
  
  try {
    await  connectDB();
   const userRegistering = await usersDb.find();

    const newArr = userRegistering.slice(Number(start), Number(max))

   
    const getWithPromiseAll = async () => {
       await Promise.all(
        newArr.map(async (user) => {
         

           
         if(!user.hackingEmail)
         {
          const sendEmail = await  sendHackatonEmail(
            user.email,
           
         
          );
          await  usersDb.updateOne({email:user.email}, {
            $set: {hackingEmail: true}
        })

          return sendEmail
         }
        })
      );
    };
    await getWithPromiseAll();
    await  closeDB()
    res.status(200).json({
      num:newArr.length,
      data:newArr
    })
    // return res.status(200).json({ status: 200, data: userRegistering });
  } catch (e) {
    console.log("error", e);
    res.status(423).json({
      error: e,
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