import React from "react";
import "../styles/institutions.css";

export const Institutions = () => {
  return (
    <div className="institutions">

      {/* Hero */}
      <section className="inst-hero">
        <h1>Make sustainability real for students — one MicroOffset at a time</h1>
        <p>
          Simple, affordable climate actions designed for schools and colleges.
        </p>
      </section>

      {/* Core Packs */}
      <section className="inst-section">
        <h2>Core student packs</h2>
        <div className="inst-cards">
          <div className="inst-card">
            <h3>Notebook Neutrality</h3>
            <p>₹9</p>
          </div>
          <div className="inst-card">
            <h3>Stationery Pack</h3>
            <p>₹19</p>
          </div>
          <div className="inst-card">
            <h3>Digital Learning Pack</h3>
            <p>₹19</p>
          </div>
          <div className="inst-card">
            <h3>Commute Pack</h3>
            <p>₹49</p>
          </div>
          <div className="inst-card featured">
            <h3>Carbon Neutral Student Bundle</h3>
            <p>₹99</p>
          </div>
        </div>
      </section>

      {/* How Schools Use It */}
      <section className="inst-section light">
        <h2>How schools use MicroOffset</h2>
        <div className="inst-cards three">
          <div className="inst-card">
            <h3>Bookstore Integration</h3>
            <p>Offsets bundled with notebooks and stationery.</p>
          </div>
          <div className="inst-card">
            <h3>Class & House Leaderboards</h3>
            <p>Gamified sustainability participation.</p>
          </div>
          <div className="inst-card">
            <h3>Eco-club Projects</h3>
            <p>Measurable impact reports for student initiatives.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="inst-section">
        <h2>Benefits for schools & colleges</h2>
        <div className="inst-cards three">
          <div className="inst-card">
            <h3>Parent Communication</h3>
            <p>Clear, simple sustainability messaging.</p>
          </div>
          <div className="inst-card">
            <h3>ESG / CSR Showcase</h3>
            <p>Demonstrable climate responsibility.</p>
          </div>
          <div className="inst-card">
            <h3>Youth Climate Education</h3>
            <p>Practical learning through real-world action.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="inst-section green">
        <h2>Bring MicroOffset to your institution</h2>
        <div className="inst-ctas">
          <button className="btn primary">Schedule a demo</button>
          <button className="btn secondary">
            Download School Program Deck
          </button>
        </div>
      </section>

    </div>
  );
};
