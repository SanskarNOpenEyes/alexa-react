import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA-mO42xflHt-Z9Wmf-rOLI3MsaxT6iwxY",

  authDomain: "test2-27375.firebaseapp.com",

  projectId: "test2-27375",

  storageBucket: "test2-27375.firebasestorage.app",

  messagingSenderId: "642192363613",

  appId: "1:642192363613:web:0b3d3ab44944e0dcf8fdb4",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
