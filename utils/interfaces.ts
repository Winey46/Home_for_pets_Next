import { ObjectId } from "mongoose";

export interface IPostData {
  userId?: string;
  _id?: string;
  animalType: string;
  title: string;
  text: string;
  date?: string;
  contacts: string;
  imageLink?: string | null;
  imageName?: string | null;
  image?: File | null;
}

export interface UserInterface {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
}

export interface IImage {
  imageName: string;
  imageLink: string;
}

export interface ISessionUser {
  name?: string;
  email?: string;
  password?: string;
  image?: IImage;
  id?: string;
}
