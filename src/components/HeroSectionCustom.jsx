import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import { vid1 } from '../assets';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';

function HeroSectionCustom() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsSignedIn(true);
        setUser(user); // Update the user state when signed in
      } else {
        setIsSignedIn(false);
        setUser(null); // Clear the user state if not signed in
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth]);

  const handleViewRacesClick = () => {
    if (isSignedIn) {
      navigate('/ViewRaceSchedule');
    } else {
      navigate('/');
    }
  };

  const handleMakePredictionClick = () => {
    if (isSignedIn) {
      navigate('/MakePrediction');
    } else {
      navigate('/SignInForm');
    }
  };

  return (
    <div className='hero-container'>
      <video src={vid1} autoPlay loop muted />
      <div class="welcome-message">
        {user ? (
          <h1>Welcome back to the Pit Stop, {user.displayName}</h1>
        ) : (
          <h1>Welcome back to the Pit Stop</h1> // Default text if no user is logged in
        )}
        </div>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={handleMakePredictionClick}
        >
          MAKE PREDICTION
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={handleViewRacesClick}
        >
          VIEW RACES <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSectionCustom;
