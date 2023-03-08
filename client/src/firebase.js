import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB2XAe3JJRGDd7VpY02eyRG_dtCt6zJLKk",
  authDomain: "video-de607.firebaseapp.com",
  projectId: "video-de607",
  storageBucket: "video-de607.appspot.com",
  messagingSenderId: "941135156130",
  appId: "1:941135156130:web:b7d5c1314d03ed2ea258fb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
