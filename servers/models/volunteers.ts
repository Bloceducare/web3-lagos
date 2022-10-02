import mongoose from "mongoose";
import {ISkills, AreaOfContribution} from "@models/index"

const Schema = mongoose.Schema;
const VolunteerSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
  
    location: {
      type: String,
    },
    skills: {
        type: String,
        enum:ISkills,
        default: ISkills.none,
    },
    areaOfContribution: {
        type: String,
        enum: AreaOfContribution,
        default: AreaOfContribution.none
    }
  },

  { timestamps: true }
);

const users =
  mongoose.models.Volunteer ||
  mongoose.model("Volunteer", VolunteerSchema, "Volunteer");
export default users;
