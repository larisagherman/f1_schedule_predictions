import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD8kUf0cYpNhwGxg9k48Up84puzi7sqxus",
  authDomain: "f1-schedule-predictions-6b3b8.firebaseapp.com",
  databaseURL: "https://f1-schedule-predictions-6b3b8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "f1-schedule-predictions-6b3b8",
  storageBucket: "f1-schedule-predictions-6b3b8.firebasestorage.app",
  messagingSenderId: "242143308787",
  appId: "1:242143308787:web:2caf67aefd35c3bc040086"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;