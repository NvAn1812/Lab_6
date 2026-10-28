import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCV6J10zsoYkhrI9DFiOvXWTTsPU2GZPzE",
  authDomain: "orchid-980a9.firebaseapp.com",
  projectId: "orchid-980a9",
  storageBucket: "orchid-980a9.firebasestorage.app",
  messagingSenderId: "860372361266",
  appId: "1:860372361266:web:351b6c2d0b7e0419761c2b",
  measurementId: "G-3R74RL2YS1"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();