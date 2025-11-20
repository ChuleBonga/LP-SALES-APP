import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCSjFEbPY3fVXgR0MX4y5pRUsnLnmL12SU",
  authDomain: "lp-sales-assistant.firebaseapp.com",
  projectId: "lp-sales-assistant",
  storageBucket: "lp-sales-assistant.firebasestorage.app",
  messagingSenderId: "818293590668",
  appId: "1:818293590668:web:fd12ba99da6729ac3f89a9",
  measurementId: "G-1Y94M1NKM8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };