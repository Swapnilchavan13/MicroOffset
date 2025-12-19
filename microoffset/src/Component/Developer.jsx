import React from "react";
import "../styles/developer.css";

export const Developer = () => {
  return (
    <div className="developers-page">

      {/* HERO */}
      <section className="dev-hero">
        <h1>Embed MicroOffsets in your app, store, or intranet</h1>
        <p>
          One simple API to create offset orders. We handle project allocation,
          credit retirement, and certificates.
        </p>
        <button className="btn primary">Request API Key</button>
      </section>

      {/* QUICK EXPLANATION */}
      <section className="dev-section">
        <h2>How it works</h2>
        <p className="dev-text">
          Create an offset order via a single API endpoint. MicroOffset takes
          care of sourcing certified credits, retiring them on your behalf, and
          issuing a tamper-proof certificate.
        </p>
      </section>

      {/* DOCS */}
      <section className="dev-section light">
        <h2>Documentation</h2>
        <div className="doc-grid">
          <div className="doc-card">
            <h3>Overview</h3>
            <p>Understand the API flow and supported use cases.</p>
          </div>
          <div className="doc-card">
            <h3>Authentication</h3>
            <p>Secure API access using API keys.</p>
          </div>
          <div className="doc-card">
            <h3>Create Order</h3>
            <p>Create offset orders tied to activities or bundles.</p>
          </div>
          <div className="doc-card">
            <h3>Webhooks</h3>
            <p>Receive real-time updates on order and certificate status.</p>
          </div>
          <div className="doc-card">
            <h3>Sandbox</h3>
            <p>Test integrations in a safe sandbox environment.</p>
          </div>
        </div>
      </section>

    </div>
  );
};
