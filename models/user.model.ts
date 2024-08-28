import mongoose from "mongoose";
import { IImage } from "@/utils/interfaces";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  password: {
    type: String,
    required: false,
  },
  image: {
    imageName: { type: String, required: false },
    imageLink: { type: String, required: false },
  },
});

export const User = mongoose.models.User ?? mongoose.model("User", UserSchema);
