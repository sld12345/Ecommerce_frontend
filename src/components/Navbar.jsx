import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    setIsSidebarOpen(false);

    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      // Timeout allows the home page to load before attempting to scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <nav className="navbar">
        {/* LOGO */}
        <div className="logo">
          <a href="/" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            <img src="/images/logo.png" alt="Logo" className="logo-img" />
            <span class="bakery-name">Al Dasma Bakery</span>
          </a>
        </div>

        {/* MOBILE HAMBURGER ICON */}
        <div className={`hamburger ${isSidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* DARK OVERLAY FOR MOBILE SIDEBAR */}
        <div className={`nav-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={closeSidebar}></div>

        {/* NAVIGATION LINKS */}
        <ul className={`nav-links ${isSidebarOpen ? "active" : ""}`}>
          
          {/* MOBILE ONLY HEADER */}
          <li className="sidebar-header">
             <div className="sidebar-brand">
               <img src="/images/logo.png" alt="Logo" className="sidebar-logo-img" />
             </div>
             <button className="close-btn" onClick={closeSidebar}>&times;</button>
          </li>

          <li><a href="/" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
          <li><a href="#shop" onClick={(e) => { e.preventDefault(); scrollToSection('shop'); }}>Shop</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About Us</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
