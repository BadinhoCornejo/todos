import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import env from "./environment";

const firebase = initializeApp({
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
});

const db = getFirestore(firebase);

export default db;
