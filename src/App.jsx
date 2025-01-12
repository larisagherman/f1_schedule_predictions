import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get, update } from 'firebase/database';
import { auth } from './firebase'; // Import your Firebase auth configuration
import Navbar from './components/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home.jsx';
import SignInForm from './components/pages/SignInWithGoogle.jsx';
import CustomPage from './components/pages/CustomPage.jsx';
import HomeCustom from './components/pages/HomeCustom.jsx';
import About from './components/pages/About.jsx';
import ViewRaceSchedule from './components/pages/ViewRaceSchedule.jsx';
import MakePrediction from './components/pages/MakePrediction.jsx';
import LeaderBoard from './components/pages/LeaderBoard.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is logged in, check if email exists in the database
        const userRef = ref(getDatabase(), `users/${user.uid}`);
        const snapshot = await get(userRef);
        
        // Check if the user exists in the database and if the email is missing
        if (!snapshot.exists() || !snapshot.val().email) {
          // Email does not exist, add or update it in the database
          await update(userRef, {
            email: user.email,
          });
          console.log("User email added/updated in database:", user.email);
        }
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribeAuth(); // Clean up on unmount
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignInForm" element={<SignInForm />} />
        <Route path="/CustomPage" element={<CustomPage />} />
        <Route path="/HomeCustom" element={<HomeCustom />} />
        <Route path="/about" element={<About />} />
        <Route path="/ViewRaceSchedule" element={<ViewRaceSchedule />} />
        <Route path="/MakePrediction" element={<MakePrediction />} />
        <Route path="/LeaderBoard" element={<LeaderBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
