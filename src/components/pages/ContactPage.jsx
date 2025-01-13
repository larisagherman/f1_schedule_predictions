import React, { useState } from 'react';
import './ContactPage.css';
import { getDatabase, ref, set } from "firebase/database"; // Import the required Firebase functions
import { database } from '../../firebase'; // Import the initialized database

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reference to the "messages" node in the database
    const messagesRef = ref(database, 'messages/');

    // Push the new message into the database
    set(messagesRef, {
      name: name,
      email: email,
      message: message,
      timestamp: Date.now() // Store the current timestamp for ordering messages later
    })
      .then(() => {
        // Clear form after successful submission
        setName('');
        setEmail('');
        setMessage('');
        alert('Message sent successfully!');
      })
      .catch((error) => {
        console.error('Error sending message:', error);
        alert('There was an error sending your message. Please try again.');
      });
  };

  return (
    <div className="contact-page">
      <section className="contact-heading">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Whether you have a question or just want to chat about the latest F1 predictions, drop us a message.</p>
      </section>
      
      <section className="contact-form">
        <h2>Send Us a Message</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Your Name" 
            className="input-field" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Your Email" 
            className="input-field" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <textarea 
            placeholder="Your Message" 
            className="input-field" 
            rows="5" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            required 
          ></textarea>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </section>
      {/* Social Media Icons Section */}
      <section className="social-media-section">
        <h2>Follow Us on Social Media</h2>
        <div className="social-icons">
          <a href="https://www.instagram.com/f1/" target="_blank" rel="noopener noreferrer">
            <i className='fab fa-instagram' />
          </a>
          <a href="https://web.facebook.com/Formula1/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">
            <i className='fab fa-facebook-f' />
          </a>
          <a href="https://www.youtube.com/channel/UCB_qr75-ydFVKSF9Dmo6izg" target="_blank" rel="noopener noreferrer">
            <i className='fab fa-youtube' />
          </a>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
