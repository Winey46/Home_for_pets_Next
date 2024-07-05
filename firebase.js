import {initializeApp} from "firebase/app";
// import {getAnalytics} from "firebase/analytics";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDInHDIEXrL5AKQ_4v1AeR9tGCieWJ4V58",
  authDomain: "find-pets-d8559.firebaseapp.com",
  databaseURL: "https://find-pets-d8559-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "find-pets-d8559",
  storageBucket: "find-pets-d8559.appspot.com",
  messagingSenderId: "1043744462547",
  appId: "1:1043744462547:web:30c36cc3d6ce802456e626",
  measurementId: "G-M826NME7KB"
}

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)

// const analytics = getAnalytics(app)
