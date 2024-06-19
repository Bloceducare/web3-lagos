import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import connectDB, { closeDB } from "../../servers/config/index";
import volunteersDb from "../../servers/models/volunteers";
import usersDb from  "../../servers/models/participant"
import { sendQrcodeEmail } from "../../servers/mailer";
import QRcode from "../../servers/qr-code";
import cloudinary from "../../servers/cloudinary";


const router = createRouter<NextApiRequest, NextApiResponse>();


router.get(async (req, res) => {
  const {start, max} = req.query
  
  try {
    await  connectDB();
    // const userRegistering = await volunteersDb.find();
    const userRegistering = await usersDb.find();

    const newArr = userRegistering.slice(Number(start), Number(max))

   
    const getWithPromiseAll = async () => {
       await Promise.all(
        newArr.map(async (user:any) => {
          const userType = user?.type ?? "Attendant" as string;
          // const userType =  user?.areaOfContribution ?? "Volunteer" ;

    
         await  usersDb.updateOne({email:user.email}, {
            $set: {qrCode: true}
        })

          const QrCodetemplate =`
          Web3Lagos Conference 2022
          ${user.userName}
          ${userType}`;

          const qrcode = (await QRcode(QrCodetemplate)) as string;
          const {secure_url:qrCodeUrl} = await cloudinary.uploader.upload(qrcode)
       
         if(!user.qrCode){
          const sendQrcodemail = await sendQrcodeEmail(
            user.email,
            userType,
            user.userName,
            qrCodeUrl
          );
          return sendQrcodemail
         }
        })
      );
    };
    await getWithPromiseAll();
    await  closeDB()
    res.status(200).json({
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