// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "firebase api key",
  authDomain: "carte-de-retete-cdba3.firebaseapp.com",
  projectId: "carte-de-retete-cdba3",
  storageBucket: "carte-de-retete-cdba3.firebasestorage.app",
  messagingSenderId: "************",
  appId: "************************"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

// Export the initialized Firebase app as "fire"
export default fire;
