import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkrt2tXNhgwRw6tAWmSaPkZXGxRkB6eII",
  authDomain: "erp-certification.firebaseapp.com",
  projectId: "erp-certification",
  storageBucket: "erp-certification.firebasestorage.app",
  messagingSenderId: "676723204618",
  appId: "1:676723204618:web:cdff0f301564ded948f5f3",
  measurementId: "G-XFCFF52LHZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);