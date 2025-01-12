import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import app from "../firebase"; // Adjust the path to your Firebase config

const AuthListener = () => {
  const auth = getAuth(app);
  const database = getDatabase(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;

        if (email) {
          const userRef = ref(database, `users/${uid}/email`);
          set(userRef, email)
            .then(() => console.log(`Email ${email} added/updated for UID ${uid}.`))
            .catch((error) => console.error("Error updating database:", error));
        }
      }
    });

    return () => unsubscribe();
  }, [auth, database]);

  return null; // This component does not render anything
};

export default AuthListener;
