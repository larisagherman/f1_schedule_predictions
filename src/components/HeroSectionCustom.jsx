import React from 'react'
import '../App.css'
import { Button } from './Button'
import './HeroSection.css'
import { vid1 } from '../assets'

function HeroSection() {
  return (
    <div className='hero-container'>
          <video src={vid1}
              autoPlay loop muted />
        <div className='hero-btns'>
              <Button className='btns' buttonStyle='btn--outline'
                  buttonSize='btn--large'>
                  MAKE PREDICTION
              </Button> 
              <Button className='btns' buttonStyle='btn--primary'
                  buttonSize='btn--large'>
                  VIEW RACES <i className='far fa-play-circle'/>
              </Button> 
        </div>    
    </div>
  )
}

export default HeroSection
