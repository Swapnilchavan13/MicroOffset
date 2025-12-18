import React from "react";
import "../styles/individuals.css";

export const Individuals = () => {
  return (
    <div className="individuals">

      {/* HERO */}
      <section className="ind-hero">
        <h1>Small actions. Real climate impact.</h1>
        <p>
          Offset everyday emissions from your digital life, commute, and
          daily choices — one MicroOffset at a time.
        </p>
      </section>

      {/* PACKS BY THEME */}
      <section className="ind-section">
        <h2>Packs by theme</h2>
        <div className="ind-cards">
          <div className="ind-card">
            <h3>For your digital life</h3>
            <p>Emails, video calls, cloud storage, and device use.</p>
          </div>
          <div className="ind-card">
            <h3>For your commute</h3>
            <p>Daily travel by car, cab, bus, or metro.</p>
          </div>
          <div className="ind-card">
            <h3>For nights out & brunches</h3>
            <p>Dining, drinks, and social outings.</p>
          </div>
          <div className="ind-card">
            <h3>For your child’s notebooks</h3>
            <p>School stationery and notebooks made carbon-neutral.</p>
          </div>
        </div>
      </section>

      {/* START SMALL */}
      <section className="ind-section light">
        <h2>Start small</h2>
        <div className="ind-spotlight">
          <div className="spotlight-card">
            <h3>Notebook Neutrality</h3>
            <p className="price">₹9</p>
            <p>Offset the footprint of a single notebook.</p>
          </div>
          <div className="spotlight-card">
            <h3>Stationery Pack</h3>
            <p className="price">₹19</p>
            <p>Neutralize everyday school or office stationery.</p>
          </div>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section className="ind-section">
        <h2>How certificates work</h2>
        <p className="ind-text">
          Every MicroOffset purchase comes with a tamper-proof digital
          certificate. It shows the activity offset, the carbon amount,
          and the verified project used — giving you clear proof of impact.
        </p>
      </section>

      {/* GIFTING */}
      <section className="ind-section green">
        <h2>Offset packs as gifts</h2>
        <p className="ind-text">
          Gift MicroOffset packs for birthdays, festivals, or milestones —
          a thoughtful way to celebrate while caring for the planet.
        </p>
        <button className="btn primary">Explore gifting options</button>
      </section>

    </div>
  );
};
