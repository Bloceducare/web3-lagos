import mongoose from "mongoose";

// enum IGender {
//   male,
//   female,
//   others,
// }

enum Irole{
beginner,
developer,
designer,
content,
community,
others
}

const Schema = mongoose.Schema;
const ParticipantSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone:{
      type:String,
      required:true
    },
    password: {
      type: String,
    },
    authWith: {
      type: String,
    },
    telegramID: {
      type: String,
    },
    twitterHandle: {
      type: String,
    },
    companyName: {
      type: String,
    },
    presentationTitle: {
      type: String,
    },
    pitchStory: {
      type: String,
    },
    spokenAtWeb3Before: {
      type: Boolean,
    },
    // gender: {
    //   type: String,
    //   enum: IGender,
    //   // enum : ['female','male', 'others'],
    // },
    role:{
      type:String,
      enum:Irole
    },
    Im: {
      type: String,
    },
    location: {
      type: String,
    },
    type: {
      type: String,
      enum: ["speaker", "attendant", "media-partner", "sponsor", "volunteer"],
    },
    companyLocation: {
      type: String,
    },
    whyAcceptAsSponsor: {
      type: String,
    },
    // reasonForAttending: {
    //   type: String,
    // },
    attendingOtherDays: {
      type: Boolean,
    },
    // reasonForOtherDays: {
    //   type: String,
    // },
    sponsorAmtRange: {
      type: String,
      enum: ["2000-4999", "5000-9999", "10000-above"],
    },
    otherWaysOfSponsoring: {
      type: String,
    },
    whatToSponsor: {
      type: String,
      enum: ["main-event", "trip", "hackathons", "others"],
    },
    typeOfMedia: {
      type: String,
      enum: ["print", "broadcast", "digital", "others"],
    },
    mediaHowToContribute: {
      type: String,
    },
    qrCode:{
      type:Boolean
    },
    hackingEmail:{
      type:Boolean
    }
  },

  { timestamps: true }
);

const users =
  mongoose.models.Participant ||
  mongoose.model("eventParticipants", ParticipantSchema, "eventParticipants");
export default users;
// qrJaqFY4ojlYpMBp
// AD4npgLxEA1zBhY8