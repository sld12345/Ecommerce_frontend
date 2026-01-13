import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Slideshow.css';

const Slideshow = () => (
  <div className="slideshow-wrapper">
    <Carousel 
      autoPlay 
      infiniteLoop={true} 
      showThumbs={false} 
      showStatus={false}
      showArrows={false}
      interval={4000} // Slightly slower for readability
      transitionTime={1000}
      stopOnHover={false}
      swipeable={false}
      emulateTouch={true}
      showIndicators={true} // Show dots at bottom
    >
      
      {/* SLIDE 1 */}
      <div key="slide1" className="slide-container">
        <img src="/images/b1.jpg" alt="Freshly Baked" />
        <div className="slide-overlay" />
        <div className="slide-content">
          <span className="slide-subtitle">Welcome to Al Dasmah</span>
          <h2 className="slide-title">Freshly Baked Delights</h2>
          <p className="slide-desc">Crafted with love, served just for you.</p>
          <button className="hero-btn">Explore Menu</button>
        </div>
      </div>
      
      {/* SLIDE 2 */}
      <div key="slide2" className="slide-container">
        <img src="/images/b2.jpg" alt="Tradition" />
        <div className="slide-overlay" />
        <div className="slide-content">
          <span className="slide-subtitle">Since 1983</span>
          <h2 className="slide-title">A Story of Tradition</h2>
          <p className="slide-desc">Where every bite tells a delicious story.</p>
          <a href="#AboutUs"><button className="hero-btn">Our Heritage</button></a>
        </div>
      </div>

      {/* SLIDE 3 */}
      <div key="slide3" className="slide-container">
        <img src="/images/b3.jpg" alt="Sweet Moments" />
        <div className="slide-overlay" />
        <div className="slide-content">
          <span className="slide-subtitle">Premium Quality</span>
          <h2 className="slide-title">Sweet Moments Delivered</h2>
          <p className="slide-desc">From our oven straight to your home.</p>
          <button className="hero-btn">Order Now</button>
        </div>
      </div>

    </Carousel>
  </div>
);

export default Slideshow;