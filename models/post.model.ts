import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  animalType: {
    type: String,
    required: [true, "Type is required."],
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  text: {
    type: String,
    required: [true, "Text is required."],
  },
  date: {
    type: String,
    required: true,
  },
  contacts: {
    type: String,
    required: [true, "Contacts is required."],
  },
  image: {
    imageName: { type: String, required: false },
    imageLink: { type: String, required: false },
  },
});

export const Post = mongoose.models.Post ?? mongoose.model("Post", PostSchema);
