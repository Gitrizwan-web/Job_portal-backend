import mongoose from "mongoose";
const userschema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: { type: String, required: true },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "recuruitor"],
    required: true,
  },
  profile: {
    bio: { type: String },
    skills: [{ type: String }],
    resume: { type: String }, // URL to resume file
    resumeOriginalName: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    profilePhoto: {
      type: String,
      default: "",
    },
  },
});
const User = mongoose.model("User", userschema);

export default User;
