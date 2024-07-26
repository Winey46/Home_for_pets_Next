import mongoose from "mongoose";

const {Schema} = mongoose;

const UserSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  password: {
    required: true,
    type: String,
  }
})

export const User = mongoose.models.User ?? mongoose.model('User', UserSchema)