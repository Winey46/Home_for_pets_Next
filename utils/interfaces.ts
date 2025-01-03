import { ObjectId } from "mongoose";

export interface IPostData {
  userId?: string;
  _id?: string;
  animalType: string;
  title: string;
  text: string;
  date?: string;
  contacts: string;
  image?: {
    imageName: string | null;
    imageLink: string | null;
  };
}

export interface IUser {
  data: {
    expires: string;
    user: {
      email: string;
      id: string;
      image: {
        imageName: string;
        imageLink: string;
      };
      name: string;
    };
  } | null;
  status: string;
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
