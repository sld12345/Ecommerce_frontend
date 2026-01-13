import React from 'react';
import './HeroBanner.css';

const HeroBanner = () => {
  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        {/* Replace with your specific Christmas Plum Cake image path */}
        <img 
          src="/images/christmas-plum-cake.png" 
          alt="Christmas Plum Cake" 
          className="hero-image"
        />
        
        {/* Dark Gradient Overlay for readability */}
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-subtitle">Signature Special</span>
          <h1 className="hero-title">Rich & Authentic Cakes</h1>
          <p className="hero-desc">
            Soaked in tradition, baked with love. Experience the magic in every slice.
          </p>
          <a href='#shop'><button className="hero-btn">Order Your Cake</button></a>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
