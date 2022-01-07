// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3r_62XhPfU6zj7RUCWges7BDaDZPlsTs",
  authDomain: "data-mining-form.firebaseapp.com",
  projectId: "data-mining-form",
  storageBucket: "data-mining-form.appspot.com",
  messagingSenderId: "502603085074",
  appId: "1:502603085074:web:b30ad52316b47d2e646fcb",
  databaseUrl: "https://data-mining-form-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp;