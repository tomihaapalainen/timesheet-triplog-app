import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

export const analytics = app.analytics();
export const getCredential = (email, password) =>
  firebase.auth.EmailAuthProvider.credential(email, password);
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const auth = app.auth();
export default app;
