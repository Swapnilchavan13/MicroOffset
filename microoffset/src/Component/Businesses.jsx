import React from "react";
import "../styles/businesses.css";

export const Businesses = () => {
  return (
    <div className="businesses">

      {/* Hero */}
      <section className="biz-hero">
        <h1>MicroOffsets for your employees and customers</h1>
        <p>
          Simple, affordable carbon offsets designed for businesses of all sizes —
          from startups to enterprises.
        </p>
      </section>

      {/* Use Cases */}
      <section className="biz-section">
        <h2>Use cases</h2>
        <div className="biz-cards">
          <div className="biz-card">
            <h3>Digital Work & AI Bundles</h3>
            <p>Offset emissions from remote work, SaaS tools, and AI usage.</p>
          </div>
          <div className="biz-card">
            <h3>Commute Bundles</h3>
            <p>Neutralize employee travel emissions — daily or monthly.</p>
          </div>
          <div className="biz-card">
            <h3>Hospitality / Hotel Night Add-ons</h3>
            <p>Add offsets per stay or night for guests.</p>
          </div>
          <div className="biz-card">
            <h3>Retail & POS Add-ons</h3>
            <p>₹99 carbon-neutral checkout add-on for customers.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="biz-section light">
        <h2>Why businesses choose MicroOffset</h2>
        <div className="biz-cards three">
          <div className="biz-card">
            <h3>ESG Contribution</h3>
            <p>Measurable, reportable climate impact.</p>
          </div>
          <div className="biz-card">
            <h3>Employee Engagement</h3>
            <p>Simple actions that teams understand and participate in.</p>
          </div>
          <div className="biz-card">
            <h3>Easy Integration</h3>
            <p>Invoices, dashboards, and API support.</p>
          </div>
        </div>
      </section>

      {/* Business Products */}
      <section className="biz-section">
        <h2>Business products</h2>
        <div className="biz-products">
          <div className="product-card">
            <h3>Digital Work Month</h3>
            <p>₹199 / employee</p>
          </div>
          <div className="product-card">
            <h3>Commute Bundle</h3>
            <p>₹199 / employee</p>
          </div>
          <div className="product-card">
            <h3>Hospitality Bundle</h3>
            <p>₹99 / guest</p>
          </div>
        </div>
      </section>

      {/* How to Work With Us */}
      <section className="biz-section green">
        <h2>How to work with us</h2>
        <div className="biz-ctas">
          <button className="btn primary">Start with a pilot</button>
          <button className="btn secondary">Talk to our team</button>
          <button className="btn secondary">Integrate via API</button>
        </div>
      </section>

      {/* Partners */}
      <section className="biz-section">
        <h2>Partners & integrations</h2>
        <div className="biz-logos">
          <span>Future partner logo</span>
          <span>Future partner logo</span>
          <span>Future partner logo</span>
        </div>
      </section>

    </div>
  );
};
