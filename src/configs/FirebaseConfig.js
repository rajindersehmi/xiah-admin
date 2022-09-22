import firebase from "firebase/app";
import "firebase/messaging";
const FirebaseConfig = {
  apiKey: "AIzaSyAjp5juy-NRdKQRWD11hAw66zEPJuFYzeM",
  authDomain: "telecoms-uk.firebaseapp.com",
  projectId: "telecoms-uk",
  storageBucket: "telecoms-uk.appspot.com",
  messagingSenderId: "939279495954",
  appId: "1:939279495954:web:1c871d46b596d3fd47f9cb",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

let messaging;
if (typeof window !== "undefined") messaging = firebase.messaging();

export { messaging };

export default FirebaseConfig;
