import React from 'react';
import './ContactPage.css';

function ContactPage() {
  return (
    <div className="contact-page">
      <section className="contact-heading">
        <h1>Contact Us</h1>
        <p>We’d love to hear from you! Whether you have a question or just want to chat about the latest F1 predictions, drop us a message.</p>
      </section>
      
      <section className="contact-form">
        <h2>Send Us a Message</h2>
        <form>
          <input type="text" placeholder="Your Name" className="input-field" />
          <input type="email" placeholder="Your Email" className="input-field" />
          <textarea placeholder="Your Message" className="input-field" rows="5"></textarea>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </section>
      
      <section className="contact-info">
        <h2>Other Ways to Reach Us</h2>
        <div className="contact-details">
          <p><strong>Email:</strong> support@f1predictions.com</p>
          <p><strong>Phone:</strong> +1 (800) 123-4567</p>
          <p><strong>Social Media:</strong></p>
          <ul>
            <li><a href="https://www.instagram.com/f1/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://web.facebook.com/Formula1/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://www.youtube.com/channel/UCB_qr75-ydFVKSF9Dmo6izg" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
