import React from 'react'
import '../App.css'
import { Button } from './Button'
import './HeroSection.css'
import { vid1 } from '../assets'
import { useNavigate } from 'react-router-dom'

function HeroSection() {
  const navigate = useNavigate();

  const handleRaceViewClick = () => {
    navigate('/ViewRaceSchedule');
  };
  const handleMakePredictionClick = () => {
    navigate('/SignInForm');
  }
  return (
    <div className='hero-container'>
          <video src={vid1}
              autoPlay loop muted />
        <h1>Drive to Predict</h1>
        <p> What are you waiting for? SIGN IN and make a prediction now!</p>
        <div className='hero-btns'>
              <Button className='btns' buttonStyle='btn--outline'
                  buttonSize='btn--large' onClick={handleMakePredictionClick}>
                  MAKE PREDICTION
              </Button> 
              <Button className='btns' buttonStyle='btn--primary'
                  buttonSize='btn--large' onClick={handleRaceViewClick}>
                  VIEW RACES <i className='far fa-play-circle'/>
              </Button> 
        </div>    
    </div>
  )
}

export default HeroSection
