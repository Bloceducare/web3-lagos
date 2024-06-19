import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import handlebars from "handlebars";
import fs from "fs";
import { mailSenderConfig } from "../config";
import sendGridMail  from '@sendgrid/mail'

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY as string)

const emailTemplateSource = fs.readFileSync(
  `${process.cwd()}/servers/template/application-resp.hbs`,
  "utf8"
);

const QrEmailTemplateSource = fs.readFileSync(
  `${process.cwd()}/servers/template/application-qr.hbs`,
  "utf8"
);

const hackatonTemplateSource = fs.readFileSync( `${process.cwd()}/servers/template/hackaton-email.hbs`,
"utf8")

const volunteerTemplateSource=fs.readFileSync( `${process.cwd()}/servers/template/volunteer-email.hbs`,
"utf8")

const ticketTemplateSource=fs.readFileSync( `${process.cwd()}/servers/template/ticket-email.hbs`,
"utf8")


interface ImailgunAuth {
  auth: {
    api_key: string | undefined;
    domain: string | undefined;
  };
}
const mailgunAuth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY as string,
    domain: process.env.MAILGUN_DOMAIN as string,
  },
} as ImailgunAuth;

const template = handlebars.compile(emailTemplateSource);
const qrtemplate = handlebars.compile(QrEmailTemplateSource);
const hackatonTemplate =handlebars.compile(hackatonTemplateSource)
const volunteerTemplate =handlebars.compile(volunteerTemplateSource)
const ticketTemplate =handlebars.compile(ticketTemplateSource)



async function wrappedSendMail(options: any) {
  return new Promise((res, rej) => {
    // @ts-ignore
    let transport = nodemailer.createTransport(mg(mailgunAuth));
    transport.sendMail(options, function (error, response) {
      if (error) return rej(error);

      return res(response);
    });
  });
}


export const registrationEmail = async (
  to: string,
  typeOfUser: string,
  name: string
) => {
  const { from, emailSubject, replyTo } = mailSenderConfig;


  const sendApplicationResp = template({
    type: typeOfUser,
    name,
    application: typeOfUser == "speaker" || typeOfUser == "sponsor" || typeOfUser == "volunteer",
    replyTo,
  });
  
  const regMailOptions = {
    from,
    to,
    subject: emailSubject,
    html: sendApplicationResp,
  };


 

  try {
    // const response = await wrappedSendMail(regMailOptions);
    const response =   await sendGridMail.send(regMailOptions)
      console.log('regitration successful', response)
    return {
      status: true,
      to,
      message: "Successfully sent email",
      data: response,
    };


  } catch (e) {
    console.log(e, 'error mailing')
    return {
      status: false,
      error: e,
    };
  }
};

export const sendQrcodeEmail = async (
  to: string,
  typeOfUser: string,
  name: string,
  qrCodeUrl:string
) => {
  const { from,  replyTo } = mailSenderConfig;
  const sendApplicationResp = qrtemplate({
    type: typeOfUser,
    qrCodeUrl,
    name,
    application: typeOfUser == "speaker" || typeOfUser == "sponsor" || typeOfUser == "volunteer",
    replyTo,
  });
  const regMailOptions = {
    from,
    to,
    subject: 'qrcode',
    html: sendApplicationResp,
  };
  try {
    // const response = await wrappedSendMail(regMailOptions);
    const response =   await sendGridMail.send(regMailOptions)

    // console.log('server response', response)
    return {
      status: true,
      to,
      message: "Successfully sent email",
      data: response,
    };
  } catch (e) {
    console.log('catch error', e)
    return {
      status: false,
      error: e,
    };
  }
};

export const sendTicketEmail = async (
  to: string,
  typeOfUser: string,
  name: string
) => {
  const { from, emailSubject, replyTo } = mailSenderConfig;


  const sendApplicationResp = ticketTemplate({
    type: typeOfUser,
    name,
    application: typeOfUser == "speaker" || typeOfUser == "sponsor" || typeOfUser == "volunteer",
    replyTo,
  });
  
  const ticketMailOptions = {
    from,
    to,
    subject: emailSubject,
    html: sendApplicationResp,
  };


 

  try {
    // const response = await wrappedSendMail(regMailOptions);
    const response =   await sendGridMail.send(ticketMailOptions)
      console.log('ticket sent successful', response)
    return {
      status: true,
      to,
      message: "Successfully sent email",
      data: response,
    };


  } catch (e) {
    console.log(e, 'error mailing')
    return {
      status: false,
      error: e,
    };
  }
};


export const sendHackatonEmail = async(email='',)=>{

  const { from,  replyTo } = mailSenderConfig;
  const regMailOptions = {
    from,
    to:email,
    subject: 'Web3Lagos Hackathon ',
    html:hackatonTemplate({}),
  };
  try {

    const response =   await sendGridMail.send(regMailOptions)


    return {
      status: true,
      to:email,
      message: "Successfully sent email",
      data: response,
    };
  } catch (e) {
    console.log('catch error', e)
    return {
      status: false,
      error: e,
    };
  }

}


export const sendVolunteerEmail = async(email='',)=>{

  const { from,  replyTo } = mailSenderConfig;
  const regMailOptions = {
    from,
    to:email,
    subject: 'Web3Lagos Volunteer WhatsApp Group ',
    html:volunteerTemplate({}),
  };
  try {

    const response =   await sendGridMail.send(regMailOptions)


    return {
      status: true,
      to:email,
      message: "Successfully sent email",
      data: response,
    };
  } catch (e) {
    console.log('catch error', e)
    return {
      status: false,
      error: e,
    };
  }

}



