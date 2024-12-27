import React from 'react';
import './About.css';
import { img2, img3, img4 } from '../../assets';
import Footer from './Footer';

const About = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1 className="about-title">Welcome to F1 Predictor</h1>
        <p className="about-subtitle">
          The ultimate platform for Formula 1 fans to immerse themselves in the thrill of racing.
        </p>
      </header>

      <section className="about-section">
        <h2 className="section-title">What We Offer</h2>
        <div className="offer-cards">
          <div className="offer-card">
            <img src={img2} alt="Race Schedule" />
            <h3>View Race Schedules</h3>
            <p>
              Stay ahead of the action with up-to-date race schedules, including details about upcoming events.
            </p>
          </div>
          <div className="offer-card">
            <img src={img3} alt="Make Predictions" />
            <h3>Make Predictions</h3>
            <p>
              Predict race outcomes, drivers on the podium, or bonus questions like fastest laps and compete with fans.
            </p>
          </div>
          <div className="offer-card">
            <img src={img4}  style={{ width: '220px', height: '280' }} alt="Prediction History" />
            <h3>Track Your Prediction History</h3>
            <p>
              Review your past predictions and compare them with actual race results. Improve your accuracy each race.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2 className="section-title">Key Features</h2>
        <ul className="feature-list">
          <li><strong>Real-Time Updates:</strong> Instant syncing for schedules and predictions.</li>
          <li><strong>Media Content:</strong> Explore race-related images and videos.</li>
          <li><strong>Community Fun:</strong> Compete with other fans and top the leaderboard.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2 className="section-title">Our Vision</h2>
        <p className="vision-text">
          We aim to elevate the Formula 1 experience by turning every race into an interactive challenge.
          Whether you’re an F1 veteran or a new fan, we make the sport engaging and exciting for everyone.
        </p>
        <p className="vision-text">
          Join us, and may the best predictor win!
        </p>
          </section>
      </div>
  );
};

export default About;
