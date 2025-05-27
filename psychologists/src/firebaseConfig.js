// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXts4SrxJKYnf2zbm4fXaBYcEuy9X9qJg",
  authDomain: "fir-psychologists.firebaseapp.com",
  databaseURL: "https://fir-psychologists-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "fir-psychologists",
  storageBucket: "fir-psychologists.firebasestorage.app",
  messagingSenderId: "409833490705",
  appId: "1:409833490705:web:3f27feffc4bb8a15dca4b0",
  measurementId: "G-7R7GTL9YGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//const analytics = getAnalytics(app);
export default app;