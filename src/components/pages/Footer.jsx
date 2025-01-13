import React, { useState } from 'react';
import './Footer.css';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import { database } from '../../firebase'; // Import the Firebase database
import { ref, set } from 'firebase/database'; // Import the necessary Firebase functions

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === '') {
      setMessage('Please enter a valid email address');
      return;
    }

    // Reference to store the email in Firebase
    const emailRef = ref(database, 'subscribers/' + Date.now()); // Using timestamp as unique key

    // Push the email into Firebase Realtime Database
    set(emailRef, {
      email: email,
      timestamp: Date.now(),
    })
      .then(() => {
        setEmail(''); // Clear the input field
        setMessage('Thank you for subscribing!');
      })
      .catch((error) => {
        console.error('Error subscribing:', error);
        setMessage('There was an error subscribing. Please try again.');
      });
  };

  return (
    <div className="footer-container">
      {/* Newsletter Subscription */}
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join our newsletter for the latest race updates and predictions!
        </p>
        <div className="input-areas">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="footer-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle email input change
              required
            />
            <Button buttonStyle="btn--outline">Subscribe</Button>
          </form>
          {/* Display success or error message */}
          {message && <p>{message}</p>}
        </div>
      </section>

      {/* Footer Links */}
      <div className="footer-links">
        <div className="footer-link-items">
          <h2><Link to="/About">About Us</Link></h2>
        </div>
        <div className="footer-link-items">
          <h2><Link to="/ContactPage">Contact Us</Link></h2>
        </div>
      </div>

      {/* Social Media Section */}
      <section className="social-media">
        <div className="social-media-wrap">
          <small className="website-rights">F1 Predictions © 2024</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
