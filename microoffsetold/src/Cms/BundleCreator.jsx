import React, { useMemo, useState } from "react";

/* =========================================================
   FULL TAG MASTER (MOCK DB)
========================================================= */

const TAG_FAMILIES = {
  context_where: [
    "Home",
    "Office",
    "Campus",
    "Classroom",
    "Hostel",
    "Commute",
    "Local Travel",
    "Intercity Travel",
    "International Travel",
    "Out-of-Home Leisure",
    "Hospitality Stay",
    "Event / Venue",
    "Online / Remote",
    "Hybrid (Home+Office)"
  ],

  audience_persona: [
    "Individual",
    "Employee",
    "Student",
    "Teacher / Staff",
    "Family / Household",
    "Customer / Guest",
    "Frequent Traveler",
    "Remote Worker",
    "Field Staff / Sales",
    "Urban",
    "Tier-2/3"
  ],

  category_activity: [
    "Digital & Communication",
    "Mobility & Transport",
    "Food & Beverage",
    "Purchases & Consumer Goods",
    "Paper & Printing",
    "Education Supplies",
    "Hospitality & Leisure",
    "Utilities & Energy",
    "Waste & Recycling",
    "Health & Personal Care",
    "Apparel & Footwear",
    "Electronics & Gadgets",
    "Home & Kitchen",
    "Logistics & Delivery",
    "Events & Experiences",
    "Finance & Banking",
    "Telecom & Connectivity"
  ],

  pack_theme: [
    "Digital Essentials",
    "Digital Work Month",
    "Meetings & Video Calls",
    "Email & Messaging",
    "AI Workload",
    "Commute Month",
    "Notebook Neutrality",
    "Stationery Neutrality",
    "Hotel Night Offset",
    "Dining Out / Brunch Offset",
    "Home Digital Month",
    "Home Essentials Basket"
  ],

  frequency_basis: [
    "Per Item",
    "Per Use",
    "Per Hour",
    "Per Session",
    "Per Day",
    "Per Week",
    "Per Month",
    "Per Year",
    "Per Trip",
    "Per Delivery",
    "Per Stay (Night)",
    "Per Ticket",
    "Per Meal",
    "Per Class / Lecture",
    "Per Exam"
  ],

  data_quality: [
    "Estimated",
    "Measured",
    "Supplier Reported",
    "LCA Based",
    "Country-Specific (India)",
    "Global Average",
    "Conservative",
    "High-Confidence",
    "Versioned Factor",
    "Needs Review"
  ]
};

/* =========================================================
   COST / KG TIERS
========================================================= */

const COST_PER_KG = {
  A: 5,
  B: 6,
  C: 7,
  D: 8,
  E: 9,
  F: 10,
  G: 12,
  H: 14,
  I: 16,
  J: 18
};

/* =========================================================
   FULL EMITTER LIBRARY (MOCK)
========================================================= */

const EMITTERS = [
  {
    id: "em-email-office",
    name: "Email (Office)",
    ef_value: 0.004,
    unit: "email",
    tags: {
      context_where: "Office",
      audience_persona: "Employee",
      category_activity: "Digital & Communication",
      pack_theme: ["Email & Messaging", "Digital Work Month"],
      frequency_basis: "Per Use",
      data_quality: "Conservative"
    }
  },
  {
    id: "em-video-call",
    name: "Video Call (1 Hour)",
    ef_value: 0.15,
    unit: "hour",
    tags: {
      context_where: "Office",
      audience_persona: "Employee",
      category_activity: "Digital & Communication",
      pack_theme: ["Meetings & Video Calls", "Digital Work Month"],
      frequency_basis: "Per Hour",
      data_quality: "LCA Based"
    }
  },
  {
    id: "em-ai-usage",
    name: "AI / LLM Usage (1 hour)",
    ef_value: 0.25,
    unit: "hour",
    tags: {
      context_where: "Online / Remote",
      audience_persona: "Employee",
      category_activity: "Digital & Communication",
      pack_theme: ["AI Workload", "Digital Essentials"],
      frequency_basis: "Per Hour",
      data_quality: "Estimated"
    }
  },
  {
    id: "em-notebook",
    name: "Notebook (Student)",
    ef_value: 1.6,
    unit: "item",
    tags: {
      context_where: "Campus",
      audience_persona: "Student",
      category_activity: "Paper & Printing",
      pack_theme: ["Notebook Neutrality", "Stationery Neutrality"],
      frequency_basis: "Per Item",
      data_quality: "LCA Based"
    }
  },
  {
    id: "em-commute-car",
    name: "Commute by Car (1 km)",
    ef_value: 0.21,
    unit: "km",
    tags: {
      context_where: "Commute",
      audience_persona: "Individual",
      category_activity: "Mobility & Transport",
      pack_theme: ["Commute Month"],
      frequency_basis: "Per Trip",
      data_quality: "Global Average"
    }
  },
  {
    id: "em-hotel-night",
    name: "Hotel Stay (1 Night)",
    ef_value: 15,
    unit: "night",
    tags: {
      context_where: "Hospitality Stay",
      audience_persona: "Customer / Guest",
      category_activity: "Hospitality & Leisure",
      pack_theme: ["Hotel Night Offset"],
      frequency_basis: "Per Stay (Night)",
      data_quality: "Estimated"
    }
  }
];

/* =========================================================
   BUNDLE CREATOR
========================================================= */


export const BundleCreator = () => {
  const [filters, setFilters] = useState({
    pack_theme: "",
    category_activity: "",
    context_where: "",
    audience_persona: ""
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [selectedEmitters, setSelectedEmitters] = useState([]);
  const [costTier, setCostTier] = useState("");
  const [emissionPerMonth, setEmissionPerMonth] = useState("");
  const [images, setImages] = useState([]);
  const [bundles, setBundles] = useState([]);

  const filteredEmitters = useMemo(() => {
    return EMITTERS.filter((e) => {
      if (filters.pack_theme && !e.tags.pack_theme.includes(filters.pack_theme))
        return false;
      if (
        filters.category_activity &&
        e.tags.category_activity !== filters.category_activity
      )
        return false;
      if (
        filters.context_where &&
        e.tags.context_where !== filters.context_where
      )
        return false;
      if (
        filters.audience_persona &&
        e.tags.audience_persona !== filters.audience_persona
      )
        return false;
      return true;
    });
  }, [filters]);

  const toggleEmitter = (em) => {
    setSelectedEmitters((prev) =>
      prev.find((x) => x.id === em.id)
        ? prev.filter((x) => x.id !== em.id)
        : [...prev, em]
    );
  };

  const costPerKg = costTier ? COST_PER_KG[costTier] : 0;
  const offsetCost =
    costPerKg && emissionPerMonth
      ? costPerKg * Number(emissionPerMonth)
      : 0;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setImages(files);
  };

  const createBundle = () => {
    if (!title || !costTier || !emissionPerMonth || selectedEmitters.length === 0) {
      alert("Please fill all required fields");
      return;
    }

    setBundles((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        description,
        costTier,
        emissionPerMonth,
        offsetCost,
        emitters: selectedEmitters,
        images
      }
    ]);

    setTitle("");
    setDescription("");
    setSelectedEmitters([]);
    setCostTier("");
    setEmissionPerMonth("");
    setImages([]);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>MicroOffset — Bundle Creator</h2>

      {/* TITLE & DESCRIPTION */}
      <div style={styles.card}>
        <input
          style={styles.input}
          placeholder="Bundle Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Bundle Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* FILTERS */}
      <div style={styles.card}>
        <h4>Filter Emitters</h4>
        <div style={styles.row}>
          {Object.keys(filters).map((k) => (
            <select
              key={k}
              style={styles.select}
              value={filters[k]}
              onChange={(e) =>
                setFilters({ ...filters, [k]: e.target.value })
              }
            >
              <option value="">All {k.replace("_", " ")}</option>
              {TAG_FAMILIES[k]?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {/* EMITTERS */}
      <div style={styles.card}>
        <h4>Emitters</h4>
        {filteredEmitters.map((e) => (
          <label key={e.id} style={styles.emitterRow}>
            <input
              type="checkbox"
              checked={selectedEmitters.some((x) => x.id === e.id)}
              onChange={() => toggleEmitter(e)}
            />
            <span>
              <strong>{e.name}</strong> — {e.ef_value} kg/{e.unit}
            </span>
          </label>
        ))}
      </div>

      {/* PRICING */}
      <div style={styles.card}>
        <h4>Pricing</h4>
        <select
          style={styles.select}
          value={costTier}
          onChange={(e) => setCostTier(e.target.value)}
        >
          <option value="">Cost / Kg</option>
          {Object.entries(COST_PER_KG).map(([k, v]) => (
            <option key={k} value={k}>
              {k} — ₹{v}/kg
            </option>
          ))}
        </select>

        <input
          type="number"
          style={styles.input}
          placeholder="Emission per month (kg)"
          value={emissionPerMonth}
          onChange={(e) => setEmissionPerMonth(e.target.value)}
        />

        <div style={styles.price}>
          Offset Cost: ₹{offsetCost.toFixed(2)}
        </div>
      </div>

      {/* IMAGES */}
      <div style={styles.card}>
        <h4>Upload Images (max 3)</h4>
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} />

        <div style={styles.imageGrid}>
          {images.map((img, i) => (
            <img
              key={i}
              src={URL.createObjectURL(img)}
              alt="preview"
              style={styles.image}
            />
          ))}
        </div>
      </div>

      <button style={styles.button} onClick={createBundle}>
        Create Bundle
      </button>

      {/* CREATED BUNDLES */}
      {bundles.map((b) => (
        <div key={b.id} style={styles.bundleCard}>
          <h3>{b.title}</h3>
          <p>{b.description}</p>

          <div><strong>Emission:</strong> {b.emissionPerMonth} kg</div>
          <div><strong>Cost:</strong> ₹{b.offsetCost}</div>

          <div>
            <strong>Emitters:</strong>
            <ul>
              {b.emitters.map((e) => (
                <li key={e.id}>{e.name}</li>
              ))}
            </ul>
          </div>

          <div style={styles.imageGrid}>
            {b.images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt="bundle"
                style={styles.image}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* =========================================================
   STYLES
========================================================= */

const styles = {
  container: {
    padding: 32,
    maxWidth: 1200,
    margin: "auto",
    fontFamily: "Inter, sans-serif",
    background: "#f7f9fb"
  },
  heading: {
    marginBottom: 24
  },
  card: {
    background: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12
  },
  textarea: {
    width: "100%",
    padding: 10,
    minHeight: 80
  },
  row: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap"
  },
  select: {
    padding: 8,
    minWidth: 200
  },
  emitterRow: {
    display: "flex",
    gap: 10,
    marginBottom: 8
  },
  price: {
    marginTop: 8,
    fontWeight: 600
  },
  button: {
    padding: "12px 24px",
    background: "#0b5cff",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  },
  bundleCard: {
    background: "#fff",
    padding: 20,
    marginTop: 30,
    borderRadius: 8
  },
  imageGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    marginTop: 12
  },
  image: {
    width: "100%",
    height: 120,
    objectFit: "cover",
    borderRadius: 6
  }
};
