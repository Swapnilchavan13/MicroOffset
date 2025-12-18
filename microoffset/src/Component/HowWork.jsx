import React from "react";
import "../styles/howwork.css";

export const HowWork = () => {
  return (
    <div className="how-work">

      {/* HERO */}
      <section className="hw-hero">
        <h1>How MicroOffset works</h1>
        <p>
          A simple, transparent way to turn everyday actions into verified
          climate impact.
        </p>
      </section>

      {/* PROBLEM */}
      <section className="hw-section">
        <div className="hw-content">
          <h2>The problem</h2>
          <p>
            Most of our carbon footprint doesn’t come from obvious sources.
            Emails, video calls, daily commutes, food choices, and consumption
            quietly add up — yet remain invisible and unaddressed.
          </p>
          <p>
            Traditional carbon offsets are often large, complex, and disconnected
            from daily life, making individual or small-scale action difficult.
          </p>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="hw-section light">
        <div className="hw-content">
          <h2>The solution</h2>
          <p>
            MicroOffset breaks carbon offsets into small, pre-defined,
            science-based bundles that map directly to real-world activities.
          </p>

          <div className="hw-solution-cards">
            <div className="hw-card">
              <h3>Activity-based</h3>
              <p>Digital work, commuting, hospitality, stationery and more.</p>
            </div>
            <div className="hw-card">
              <h3>Science-backed</h3>
              <p>Each pack is calculated using transparent assumptions.</p>
            </div>
            <div className="hw-card">
              <h3>Affordable</h3>
              <p>Start with offsets as small as ₹9.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FLOW */}
      <section className="hw-section">
        <h2>How it works</h2>
        <div className="hw-flow">
          <div className="hw-step">
            <span>1</span>
            <h3>Pick a pack</h3>
            <p>
              Choose an activity-based pack or a bundled solution for yourself,
              your team, or your institution.
            </p>
          </div>

          <div className="hw-step">
            <span>2</span>
            <h3>Pay</h3>
            <p>
              Pay securely — one-time, recurring, or in bulk.
            </p>
          </div>

          <div className="hw-step">
            <span>3</span>
            <h3>Credits are retired</h3>
            <p>
              We allocate and permanently retire certified carbon credits on
              your behalf.
            </p>
          </div>

          <div className="hw-step">
            <span>4</span>
            <h3>Get proof of impact</h3>
            <p>
              Receive a tamper-proof digital certificate and impact record.
            </p>
          </div>
        </div>
      </section>

      {/* CREDITS */}
      <section className="hw-section light">
        <div className="hw-content">
          <h2>The carbon credits</h2>
          <div className="hw-columns">
            <div className="hw-info">
              <h3>Registries</h3>
              <p>
                Credits are sourced from recognised registries such as
                Carbon Standards International and similar bodies that ensure
                transparency and traceability.
              </p>
            </div>

            <div className="hw-info">
              <h3>Projects</h3>
              <p>
                Projects may include biochar, renewable energy, and other
                high-quality climate solutions with measurable outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UNIT */}
      <section className="hw-section green">
        <div className="hw-content narrow">
          <h2>The MicroOffset unit</h2>
          <p className="hw-highlight">
            1 MicroOffset Unit = a fixed quantity of CO₂e (expressed in kg or
            tonnes), making carbon impact easy to understand and compare.
          </p>
          <p>
            This unit-based approach allows precise accounting, aggregation
            across activities, and clear reporting for individuals,
            businesses, and institutions.
          </p>
        </div>
      </section>

    </div>
  );
};
