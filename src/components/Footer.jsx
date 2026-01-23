import React from "react";
import { Facebook, Instagram } from "lucide-react"; // Import clean icons
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">

        {/* Section 1: Brand Identity */}
        <div className="footer-brand">
          <div className="brand-wrap">
            <img
              src="/images/logo.png"
              alt="Al Dasmah Bakery"
              className="footer-logo-img"
            />
            <div className="brand-text-group">
              <h3 className="brand-name">Al Dasmah Bakery</h3>
              <span className="brand-subtitle">Kingdom of Bahrain</span>
            </div>
          </div>

          <p className="brand-bio">
            A legacy of excellence since 1983. M/S. Al Dasmah Bakery is a leading
            confectionery producer, combining tradition with state-of-the-art
            production.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.facebook.com/p/Al-Dasmah-Bakery-100067039935651/"
              target="_blank"
              rel="noreferrer"
              className="social-box"
              aria-label="Facebook"
            >
              <Facebook size={20} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.instagram.com/aldasmah.bakery/?hl=en"
              target="_blank"
              rel="noreferrer"
              className="social-box"
              aria-label="Instagram"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Section 2: Quick Links */}
        <div className="footer-nav">
          <h4 className="column-title">Quick Links</h4>

          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="#shop">Our Menu</a></li>
            <li><a href="#about">Our Story</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>

          <div className="footer-email-block">
            <small>Email</small>
            <a href="mailto:sales@aldasmah.com" className="footer-email">
              sales@aldasmah.com
            </a>
          </div>
        </div>

        {/* Section 3: Contact Details */}
        <div className="footer-contact">
          <h4 className="column-title">Our Locations</h4>

          <div className="location-grid">
            <div className="info-block">
              <small>Main Factory</small>
              <p>1740 2333</p>
              <p>1740 0272</p>
            </div>

            <div className="info-block">
              <small>Manama Branch</small>
              <p>1725 5367</p>
            </div>

            <div className="info-block">
              <small>Gudaibiya Branch</small>
              <p>1729 4862</p>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
