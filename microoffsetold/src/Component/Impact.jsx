import React from "react";
import "../styles/impact.css";

export const Impact = () => {
  return (
    <div className="impact-page">

      {/* HERO */}
      <section className="impact-hero">
        <h1>Our climate impact</h1>
        <p>
          Every MicroOffset contributes to real, verified carbon removal and
          meaningful co-benefits.
        </p>
      </section>

      {/* IMPACT COUNTERS */}
      <section className="impact-section">
        <h2>Impact so far</h2>
        <div className="impact-counters">
          <div className="counter">
            <strong>1,250+</strong>
            <span>tons CO₂e removed</span>
          </div>
          <div className="counter">
            <strong>42,000+</strong>
            <span>offset packs purchased</span>
          </div>
          <div className="counter">
            <strong>35+</strong>
            <span>corporate partners</span>
          </div>
          <div className="counter">
            <strong>18,000+</strong>
            <span>students engaged</span>
          </div>
        </div>
      </section>

      {/* EQUIVALENTS */}
      <section className="impact-section light">
        <h2>What this means</h2>
        <div className="impact-equivalents">
          <div className="equivalent-card">
            🌳 Equal to planting <strong>2.1 million trees</strong>
          </div>
          <div className="equivalent-card">
            🚗 Equal to removing <strong>9.8 million km</strong> of car travel
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="impact-section">
        <h2>Our projects</h2>
        <div className="project-grid">

          <div className="project-card">
             <img
  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsLSbsJIqCnXjNgJ0Bmo6XpQ7ecs9F32oxQg&s"
  alt="Biochar carbon removal project"
  className="project-image"
/>
            <h3>Bandhavgarh Biochar Project</h3>
            <p><strong>Location:</strong> Madhya Pradesh, India</p>
            <p><strong>Type:</strong> Biochar / Carbon Removal</p>
            <p><strong>Co-benefits:</strong> Soil health, farmer income</p>
            <a href="#" className="project-link">View registry record</a>
          </div>

          <div className="project-card">
            
            <img
  src="https://growbilliontrees.com/cdn/shop/files/grow-billion-trees-plantation-2.jpg?v=1712395665&width=1500"
  alt="Rural Biochar Initiative"
  className="project-image"
/>
            <h3>Rural Biochar Initiative</h3>
            <p><strong>Location:</strong> Maharashtra, India</p>
            <p><strong>Type:</strong> Biochar / CDR</p>
            <p><strong>Co-benefits:</strong> Waste reduction, livelihoods</p>
            <a href="#" className="project-link">View registry record</a>
          </div>

        </div>
      </section>

      {/* WHY BIOCHAR */}
      <section className="impact-section green">
        <h2>Why biochar?</h2>
        <p className="impact-text">
          Biochar is a durable form of carbon removal that locks carbon into
          soil for hundreds of years while improving soil fertility and farmer
          resilience.
        </p>
        <p className="impact-text">
          It represents one of the most credible, scalable climate solutions
          available today.
        </p>
      </section>

    </div>
  );
};
