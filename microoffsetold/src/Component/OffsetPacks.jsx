import React, { useState } from "react";
import "../styles/offsetpacks.css";

const PACKS = [
  {
    id: 1,
    name: "Digital Work Month",
    category: "Digital",
    audience: "Individual",
    price: 199,
    impact: 15,
    description: "Offsets emissions from emails, cloud storage and video calls."
  },
  {
    id: 2,
    name: "Commute Bundle",
    category: "Commute",
    audience: "Business",
    price: 199,
    impact: 15,
    description: "Neutralise daily travel emissions for short city commutes."
  },
  {
    id: 3,
    name: "Notebook Neutrality",
    category: "Students & Stationery",
    audience: "Individual",
    price: 9,
    impact: 1,
    description: "Offset the footprint of producing a notebook."
  }
];

export const OffsetPacks = () => {
  const [filters, setFilters] = useState({ category: "All", price: "All", audience: "All" });

  const filteredPacks = PACKS.filter((pack) => {
    const categoryMatch = filters.category === "All" || pack.category === filters.category;
    const audienceMatch = filters.audience === "All" || pack.audience === filters.audience;

    let priceMatch = true;
    if (filters.price === "0-50") priceMatch = pack.price <= 50;
    if (filters.price === "51-199") priceMatch = pack.price > 50 && pack.price <= 199;
    if (filters.price === "200+") priceMatch = pack.price >= 200;

    return categoryMatch && audienceMatch && priceMatch;
  });

  return (
    <div className="offset-packs">
      {/* Header */}
      <section className="packs-header">
        <h1>Offset Packs</h1>
        <p>Choose precise, affordable carbon offsets for real-world actions.</p>
      </section>

      {/* Filters */}
      <section className="filters">
        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="All">All Categories</option>
          <option value="Digital">Digital</option>
          <option value="Commute">Commute</option>
          <option value="Hospitality">Hospitality</option>
          <option value="Food & Dining">Food & Dining</option>
          <option value="Students & Stationery">Students & Stationery</option>
          <option value="Lifestyle & Beauty">Lifestyle & Beauty</option>
          <option value="Corporate Workplace">Corporate Workplace</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, price: e.target.value })}>
          <option value="All">All Prices</option>
          <option value="0-50">₹0–₹50</option>
          <option value="51-199">₹51–₹199</option>
          <option value="200+">₹200+</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, audience: e.target.value })}>
          <option value="All">All Audiences</option>
          <option value="Business">Business</option>
          <option value="Institution">Institution</option>
          <option value="Individual">Individual</option>
        </select>
      </section>

      {/* Packs Grid */}
      <section className="packs-grid">
        {filteredPacks.map((pack) => (
          <div key={pack.id} className="pack-card">
            <h3>{pack.name} – {pack.impact} kg</h3>
            <p className="pack-desc">{pack.description}</p>
            <div className="pack-meta">
              <span>₹{pack.price}</span>
              <span>{pack.impact} kg CO₂e</span>
            </div>
            <div className="pack-actions">
              <button className="btn secondary">View Details</button>
              <button className="btn primary">Add to Cart</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};