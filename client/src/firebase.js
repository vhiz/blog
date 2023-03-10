import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCs_41NHcfODi1Vzt_FxWVLmcB4DkhOGLM",
  authDomain: "blog-2888d.firebaseapp.com",
  projectId: "blog-2888d",
  storageBucket: "blog-2888d.appspot.com",
  messagingSenderId: "670303805242",
  appId: "1:670303805242:web:79ac1e2a33c3320c8c3a03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
