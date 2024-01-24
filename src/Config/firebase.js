import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: `${process.env.REACT_APP_API_KEY}`,
//   authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
//   projectId: `${process.env.REACT_APP_PROJECT_ID}`,
//   storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
//   messagingSenderId: `${process.env.REACT_APP_MESSAGING_SENDER_ID}`,
//   appId: `${process.env.REACT_APP_APP_ID}`,
//   measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`,
// };

// Note: It is ok to expose the firebase config publicly
const firebaseConfig = {
  apiKey: "AIzaSyB8PtV-Q5GpCBBC1zttTuYvqI9TKSXPYo0",
  authDomain: "daily-workouts-513ce.firebaseapp.com",
  projectId: "daily-workouts-513ce",
  storageBucket: "daily-workouts-513ce.appspot.com",
  messagingSenderId: "268620151926",
  appId: "1:268620151926:web:0289a08fdf4b8845b8b357",
  measurementId: "G-MDBLE7V8Y8"
};

// console.log("firebase config", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Create a ReCaptchaEnterpriseProvider instance using your reCAPTCHA Enterprise
// site key and pass it to initializeAppCheck().
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider("6Lc5llopAAAAAJlR_PXK3ZgTE0wOFPD0ezczzSz8"),
  isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
});

export { db, auth, provider }
