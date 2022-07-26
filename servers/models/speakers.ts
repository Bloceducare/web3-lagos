import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SpeakersSchema = new Schema(
  {
    name: {
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
   }


  },

  { timestamps: true }
);



const users =
  mongoose.models.Speakers || mongoose.model("Speakers",SpeakersSchema, "Speakers");
export default users;

// const users =  mongoose.model("User", SpeakersSchema);
// export default users;
