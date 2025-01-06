import React from 'react'
import '../App.css'
import { Button } from './Button'
import './HeroSection.css'
import { vid1 } from '../assets'
import { useNavigate } from 'react-router-dom'
import { getAuth } from "firebase/auth"
import { useState, useEffect } from 'react'

function HeroSection() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleViewRacesClick = () => {
    if (isSignedIn) {
      navigate('/ViewRaceSchedule');
    } else {
      navigate('/');
    }
  };

  return (
    <div className='hero-container'>
      <video src={vid1} autoPlay loop muted />
      <div className='hero-btns'>
        <Button className='btns' buttonStyle='btn--outline' buttonSize='btn--large'>
          MAKE PREDICTION
        </Button> 
        <Button 
          className='btns' 
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={handleViewRacesClick}
        >
          VIEW RACES <i className='far fa-play-circle'/>
        </Button> 
      </div>    
    </div>
  );
}

export default HeroSection
