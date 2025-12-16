import React from "react";
import "../styles/homepage.css";

export const Homepage = () => {
  return (
    <div className="homepage">
      {/* Hero */}
      <section className="hero">
        <h1>
          MicroOffset — bite-sized carbon offsets for everyday actions.
        </h1>
        <p className="hero-subtext">
          Buy small, precise offset packs for digital use, commutes, stationery,
          hotel stays and more.
        </p>
        <div className="hero-ctas">
          <button className="btn primary">Browse Offset Packs</button>
          <button className="btn secondary">For Businesses</button>
          <button className="btn secondary">For Schools & Colleges</button>
        </div>
      </section>

      {/* Why MicroOffsets */}
      <section className="section">
        <h2>Why MicroOffsets?</h2>
        <div className="card-grid">
          {["Precise", "Verified", "Affordable"].map((item) => (
            <div key={item} className="card">
              <h3>{item}</h3>
              <p>Designed for small, real-world actions with transparent impact.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Packs */}
      <section className="section light">
        <h2>Popular Packs</h2>
        <div className="card-grid">
          {[ 
            { name: "Digital Work Bundle", price: "₹199", impact: "15 kg" },
            { name: "Commute Bundle", price: "₹199", impact: "15 kg" },
            { name: "Notebook Neutrality", price: "₹9", impact: "1 kg" },
            { name: "Stationery Pack", price: "₹19", impact: "2 kg" },
            { name: "Hotel Night Offset", price: "—", impact: "—" },
            { name: "Sunday Brunch", price: "—", impact: "—" }
          ].map((pack) => (
            <div key={pack.name} className="card clickable">
              <h3>{pack.name}</h3>
              <p>{pack.price} · {pack.impact}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who It's For */}
      <section className="section">
        <h2>Who It’s For</h2>
        <div className="card-grid four">
          {["Corporates", "Schools & Colleges", "Individuals & Families", "Apps & Platforms (API)"].map((audience) => (
            <div key={audience} className="card">
              <p>{audience}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="section green">
        <h2>How It Works</h2>
        <div className="steps">
          {["Choose a pack", "Pay", "We retire credits", "Get a certificate"].map((step, i) => (
            <div key={step} className="step">
              <span>{i + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Strip */}
      <section className="impact">
        <div>
          <strong>— kg</strong>
          <p>Total CO₂ offset</p>
        </div>
        <div>
          <strong>—</strong>
          <p>Packs purchased</p>
        </div>
        <div>
          <strong>—</strong>
          <p>Partners</p>
        </div>
      </section>

      {/* Unit Explainer */}
      <section className="section">
        <h2>MicroOffset Unit</h2>
        <p>1 MicroOffset Unit = X kg CO₂e</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span>MicroOffset</span>
        <nav>
          <a href="#">API</a>
          <a href="#">Projects</a>
          <a href="#">About</a>
        </nav>
      </footer>
    </div>
  );
};
