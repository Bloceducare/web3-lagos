import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ParticipantSchema = new Schema(
  {
    userName: {
      type: String,
      required:true
    },
   email:{
    type:String,
    required:true
   },
   
   telegramID:{
    type:String
   },
   twitterHandle:{
    type:String
   },
   companyName:{
    type:String
   },
   presentationTitle:{
    type:String
   },
    pitchStory:{
    type:String
   },
   spokenAtWeb3Before:{
    type:Boolean
   },
   gender:{
    type:String,
    enum : ['female','male', 'others'],
   },
   Im:{
     type:String
   },
   location:{
    type:String
   },
   type:{
    type:String,
    enum : ['speaker','volunteer', 'media-partner', 'sponsor'],
   },
  companyLocation:{
  type:String
 },
whyAcceptAsSponsor:{
  type:String
}, 
sponsorAmtRange:{
  type:String,
  enum:['50k-100k', '100k-300k', '300k-500k', '500k above']
},
otherWaysOfSponsoring:{
  type:String
},
whatToSponsor:{
  type:String,
  enum:['main-event', 'trip', 'hackatons', 'others']
},
typeOfMedia:{
  type:String,
  enum:["print", "broadcast", 'digital', 'others']
},
mediaHowToContribute:{
  type:String, 
}

  },

  { timestamps: true }
);



const users =
  mongoose.models.Participant || mongoose.model("Participant",ParticipantSchema, "Participant");
export default users;

