import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {

  apiKey: "AIzaSyBRRB08fD_Lvqbj6YTfCrzO-j7ULaVfIac",

  authDomain: "react-authentication-9fdac.firebaseapp.com",

  projectId: "react-authentication-9fdac",

  storageBucket: "react-authentication-9fdac.appspot.com",

  messagingSenderId: "391552266348",

  appId: "1:391552266348:web:1dd7da009a93b337cca849"

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;