import mongoose, { Schema, models } from "mongoose"

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  name: String,
  email: String,
  about: String,
  github: String,
  linkedin: String,
  portfolio: String,
  education: String,
  degree: String,
}, { timestamps: true })

export const User = models.User || mongoose.model("User", UserSchema)
