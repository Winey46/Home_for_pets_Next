import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.NEXT_FIREBASE_DATABASEURL,
  projectId: process.env.NEXT_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_FIREBASE_APPID,
  measurementId: process.env.NEXT_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
