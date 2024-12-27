import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // For redirecting
import { auth } from '../../firebase';  // Ensure you're importing auth from your firebase.js file
import { onAuthStateChanged } from 'firebase/auth';  // Firebase function to track auth state
import HeroSectionCustom from '../HeroSectionCustom';  // Assuming your home page section
import Footer from './Footer';
import './CustomPage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);  // If user is signed in, store user data
      } else {
        setUser(null);  // If no user is signed in, set user to null
        navigate('/signin');  // Redirect to the sign-in page if not signed in
      }
    });

    return () => unsubscribe();  // Clean up subscription on component unmount
  }, [navigate]);

  return (
    <div>
      <div className="profile-greeting">
        {user ? (
          <h2>Welcome back to the Pit Stop, {user.displayName}!</h2>  // Show the user's name if signed in
        ) : (
          <h2>Loading...</h2>  // Show loading while checking auth state
        )}
          </div>
          <HeroSectionCustom />

      <Footer />
    </div>
  );
};

export default ProfilePage;
