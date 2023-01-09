// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9AWZHGw8ZbN-z4jvOsP1S61bKt_TqmQ4",
  authDomain: "chatapp-2f98c.firebaseapp.com",
  databaseURL: "https://chatapp-2f98c-default-rtdb.firebaseio.com",
  projectId: "chatapp-2f98c",
  storageBucket: "chatapp-2f98c.appspot.com",
  messagingSenderId: "586490135001",
  appId: "1:586490135001:web:96ac7b8f99e554768dd9c8",
  measurementId: "G-M9197NBXRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)

export default app;