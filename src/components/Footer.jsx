import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id='contact'>
      <div className="footer-container">
        
        {/* Column 1: Brand & About */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="logo-icon"></span> Logo
          </div>
          <p className="footer-desc">
            Crafting memories with every slice. We use only the finest ingredients to bring you the authentic taste of tradition and love.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col links-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/shop">Our Menu</a></li>
            <li><a href="/about">Our Story</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="contact-list">
            <li>
              <span></span> 123 Bakery Lane, Food City
            </li>
            <li>
              <span></span> +123 456 7890
            </li>
            <li>
              <span></span> hello@sweettreats.com
            </li>
            <li>
              <span></span> Mon - Sun: 8am - 10pm
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom: Copyright & Socials */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sweet Treats Bakery. All rights reserved.</p>
        <div className="social-icons">
          <a href="#" aria-label="Facebook">FB</a>
          <a href="#" aria-label="Instagram">IG</a>
          <a href="#" aria-label="Twitter">TW</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;