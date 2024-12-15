import React from 'react'
import './Footer.css';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import { img1 } from '../../assets';
function Footer() {
  return (
    <div className='footer-container'>
          <section className='footer-subscribtion'>
              <p className="footer-subscribtion-heading">
              Join our newsletter for the latest race updates and predictions!              </p>
              <div className='input-areas'>
                  <form>
                      <input type="email" name="email" placeholder='Your Email' className="footer-input" />
                      <Button buttonStyle="btn--outline">Subscribe</Button>
                  </form>
              </div>
          </section>
          <div className="footer-links">
              <div className="footer-link-wrapper">
                  <div className="footer-link-items">
                      <h2>About us</h2>
                      <Link>Terms of Service</Link>
                  </div>
              </div>
          </div>
          <div className="footer-links">
              <div className="footer-link-wrapper">
                  <div className="footer-link-items">
                    <h2>Contact us</h2>
                    <Link to='/'>Contact</Link>
                    <Link to='/'>Support</Link>
                  </div>
              </div>
          </div>
          <div className="footer-links">
              <div className="footer-link-wrapper">
                  <div className="footer-link-items">
                    <h2>Social Media</h2>
                    <a href="https://www.instagram.com/f1/" target="_blank" rel="noopener noreferrer">
                    Instagram
                    </a>
                    <a href="https://web.facebook.com/Formula1/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">
                    Facebook
                    </a>
                    <a href="https://www.youtube.com/channel/UCB_qr75-ydFVKSF9Dmo6izg" target="_blank" rel="noopener noreferrer">
                    YouTube
                    </a>
                  </div>
              </div>
          </div>
          <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
            <i class="fa fa-flag-checkered"></i>

              {/* <img src={img1} alt='Logo' className='footer-logo-img'></img> */}
            </Link>
          </div>
          <small class='website-rights'>F1 Predictions © 2024</small>
          <div class='social-icons'>
            <a href="https://web.facebook.com/Formula1/?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer">
              <i class='fab fa-facebook-f' />
            </a>
            <a href="https://www.instagram.com/f1/" target="_blank" rel="noopener noreferrer">

              <i class='fab fa-instagram' />
            </a>
            <a href="https://www.youtube.com/channel/UCB_qr75-ydFVKSF9Dmo6izg" target="_blank" rel="noopener noreferrer">
              <i class='fab fa-youtube' />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer
