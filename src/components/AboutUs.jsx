import React from "react";
import "./AboutUs.css";

// SVG Icons for the Highlights
const IconFactory = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d39b5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22h20"/><path d="M6 18v-7"/><path d="M10 18v-9"/><path d="M14 18v-5"/><path d="M18 18v-3"/><path d="M6 8a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2"/><path d="M10 6a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2"/><path d="M14 10a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2"/><path d="M18 12a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2"/></svg>
);
const IconAward = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d39b5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);
const IconUsers = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d39b5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const AboutUs = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        
        {/* HEADER */}
        <div className="about-header">
          <span className="about-subtitle">Heritage Since 1983</span>
          <h2 className="about-title">Al Dasma Bakery</h2>
          <div className="title-underline"></div>
        </div>

        {/* MAIN CONTENT SPLIT */}
        <div className="about-content-grid">
          
          {/* Left Column: The Narrative */}
          <div className="about-text-column">
            <p className="lead-paragraph">
              <strong>M/S. AL DASMA BAKERY</strong> is one of the leading confectionery production units in the Kingdom of Bahrain. 
              Promoters from the esteemed <strong>A.E. Alnooh & Sons Co WLL</strong> have built a 50-year legacy of excellence.
            </p>
            <p>
              From humble beginnings in 1983 with just a handful of skilled bakers, we have evolved into a state-of-the-art industrial powerhouse. 
              Our new production unit in Burhama now boasts an impressive daily capacity of <strong>18 tons</strong>, combining world-class technology with passion.
            </p>
            <p>
              We serve the entire Kingdom—from Hypermarkets and Star Hotels to Hospitals and School Canteens. 
              During festive seasons like Eid and Christmas, <strong>Al Dasma</strong> stands as the market leader for celebration treats.
            </p>
          </div>

          {/* Right Column: Key Highlights Box */}
          <div className="about-highlights-column">
            <div className="highlight-card">
              <div className="icon-box"><IconFactory /></div>
              <div>
                <h4>18 Tons</h4>
                <p>Daily Production Capacity</p>
              </div>
            </div>
            <div className="highlight-card">
              <div className="icon-box"><IconAward /></div>
              <div>
                <h4>50 Years</h4>
                <p>Family Business Legacy</p>
              </div>
            </div>
            <div className="highlight-card">
              <div className="icon-box"><IconUsers /></div>
              <div>
                <h4>Trusted</h4>
                <p>By Hotels & Hypermarkets</p>
              </div>
            </div>
          </div>
        </div>

        {/* LEADERSHIP FOOTER
        <div className="leadership-block">
          <p>
            "We strive to deliver the finest quality bakery products to our customers across the country — today and always."
          </p>
          <div className="directors">
            <div className="director-name">
              <span>Chairman</span>
              <h5>Mr. Hameed Abedali Isa Alnooh</h5>
            </div>
            <div className="director-name">
              <span>Managing Director</span>
              <h5>Mr. Saeed Hameed Abedali Alnooh</h5>
            </div>
          </div>
        </div> */}

      </div>
    </section>
  );
};

export default AboutUs;
