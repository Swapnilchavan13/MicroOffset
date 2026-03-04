import { useState } from "react";
import { Save, Loader2 } from "lucide-react";

/* ================= TYPES ================= */
interface ProjectPayload {
  projectId: string;
  title: string;
  subHeading: string;
  description: string;
  location: string;
  status: string;
  retired: number;
  available: number;
  pricePerKgCO2: number;
  currency: string;

  projectDeveloper: string;
  verifiedBy: string;
  typeOfProject: string;
  projectType: string;

  projectHighlighters: string[];

  co2Avoided: number;
  sdgs: number[];

  image: File | null;
}


const initialProjectState: ProjectPayload = {
  projectId: "",
  title: "",
  subHeading: "",
  description: "",
  location: "",
  status: "Active",
  retired: 0,
  available: 0,
  pricePerKgCO2: 0,
  currency: "INR",

  projectDeveloper: "",
  verifiedBy: "",
  typeOfProject: "",
  projectType: "",

  projectHighlighters: [],
  co2Avoided: 0,
  sdgs: [],

  image: null,
};

/* ================= API ================= */
const API_URL = "http://localhost:5000/addprojects";

/* ================= COMPONENT ================= */
const AddProject = () => {
  const [form, setForm] = useState<ProjectPayload>(initialProjectState);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (field: keyof ProjectPayload, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const toggleHighlighter = (value: string) => {
    setForm((prev) => ({
      ...prev,
      projectHighlighters: prev.projectHighlighters.includes(value)
        ? prev.projectHighlighters.filter((v) => v !== value)
        : [...prev.projectHighlighters, value],
    }));
  };

  const toggleSDG = (value: number) => {
    setForm((prev) => ({
      ...prev,
      sdgs: prev.sdgs.includes(value)
        ? prev.sdgs.filter((v) => v !== value)
        : [...prev.sdgs, value],
    }));
  };

  
const handleSubmit = async () => {
  setLoading(true);
  setMessage(null);

  try {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value === null) return;

      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as any);
      }
    });

    const res = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || data.success === false) {
      throw new Error(data.message || "Failed to add project");
    }

    setMessage("✅ Project added successfully");
    alert("Project saved successfully!");

    // reset form
    setForm(initialProjectState);

  } catch (err: any) {
    console.error(err);
    setMessage(`❌ ${err.message}`);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-emerald-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-200 p-10 space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Add New Carbon Project
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Fill in the project details below
            </p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 text-white px-6 py-3 rounded-xl font-semibold shadow-md disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? "Saving..." : "Save Project"}
          </button>
        </div>

        {/* Image Upload */}
        <Section title="Project Image">
          <div className="border-2 border-dashed border-emerald-300 rounded-2xl p-6 bg-emerald-50 hover:bg-emerald-100 transition cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleChange("image", e.target.files?.[0] || null)
              }
              className="w-full"
            />

            {form.image && (
              <img
                src={URL.createObjectURL(form.image)}
                alt="Preview"
                className="h-48 mt-6 rounded-xl object-cover border shadow"
              />
            )}
          </div>
        </Section>

        {/* Basic Information */}
        <Section title="Basic Information">
          <Grid>
            <Input label="Project ID" value={form.projectId}
              onChange={(v) => handleChange("projectId", v)} />

            <Input label="Title" value={form.title}
              onChange={(v) => handleChange("title", v)} />

            <Input label="Sub Heading" value={form.subHeading}
              onChange={(v) => handleChange("subHeading", v)} />

            <Input label="Location" value={form.location}
              onChange={(v) => handleChange("location", v)} />

            <Input label="Status" value={form.status}
              onChange={(v) => handleChange("status", v)} />

            <Input label="Project Developer"
              value={form.projectDeveloper}
              onChange={(v) => handleChange("projectDeveloper", v)} />

            <Select
              label="Verified By"
              value={form.verifiedBy}
              onChange={(v) => handleChange("verifiedBy", v)}
              options={["CSI", "Gold Standard", "Verra"]}
            />

            <Select
              label="Type of Project"
              value={form.typeOfProject}
              onChange={(v) => handleChange("typeOfProject", v)}
              options={["CO2 Removal", "CO2 Avoidance"]}
            />

            <Input label="Project Type"
              value={form.projectType}
              onChange={(v) => handleChange("projectType", v)} />

            <Input label="Retired CO₂ (kg)"
              type="number"
              value={form.retired}
              onChange={(v) => handleChange("retired", Number(v))} />

            <Input label="Available CO₂ (kg)"
              type="number"
              value={form.available}
              onChange={(v) => handleChange("available", Number(v))} />

            <Input label="Price per kg CO₂"
              type="number"
              value={form.pricePerKgCO2}
              onChange={(v) => handleChange("pricePerKgCO2", Number(v))} />

            <Input label="Currency"
              value={form.currency}
              onChange={(v) => handleChange("currency", v)} />

            <Input label="CO2 Avoided (kg)"
              type="number"
              value={form.co2Avoided}
              onChange={(v) => handleChange("co2Avoided", Number(v))} />
          </Grid>
        </Section>

        {/* Highlighters */}
        <Section title="Project Highlighters">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Segregation of waste between organic and inorganic categories",
              "Prevents organic waste from becoming a breeding ground for disease vectors",
              "Converts waste into bio-manure that is great for top soil nutrition",
              "Reduces harmful emissions, including methane, that is 7x more potent than CO2",
            ].map((item) => (
              <label
                key={item}
                className="flex items-start gap-3 bg-slate-50 hover:bg-emerald-50 border rounded-xl p-4 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  checked={form.projectHighlighters.includes(item)}
                  onChange={() => toggleHighlighter(item)}
                  className="mt-1 accent-emerald-600 w-5 h-5"
                />
                <span className="text-sm text-slate-700">{item}</span>
              </label>
            ))}
          </div>
        </Section>

       {/* SDGs */}
<Section title="Sustainable Development Goals">
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
    {Array.from({ length: 17 }, (_, i) => {
      const sdgNumber = i + 1;

      const fileName = `E Inverted Icons_WEB-${String(
        sdgNumber
      ).padStart(2, "0")}.png`;

      const imagePath = `/${encodeURIComponent(fileName)}`;

      return (
        <label
          key={sdgNumber}
          className={`flex flex-col items-center p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
            form.sdgs.includes(sdgNumber)
              ? "border-emerald-500 bg-emerald-50 shadow-md scale-105"
              : "border-slate-200 hover:bg-slate-50"
          }`}
        >
          <input
            type="checkbox"
            checked={form.sdgs.includes(sdgNumber)}
            onChange={() => toggleSDG(sdgNumber)}
            className="accent-emerald-600 mb-2"
          />

          <img
            src={imagePath}
            alt={`SDG ${sdgNumber}`}
            className="h-16 object-contain"
          />

          <span className="text-xs mt-2 font-medium text-slate-600">
            SDG {sdgNumber}
          </span>
        </label>
      );
    })}
  </div>
</Section>

        {/* Description */}
        <Section title="Project Description">
          <textarea
            rows={5}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </Section>

        {message && (
          <div className="text-center text-sm font-medium text-emerald-600">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Section = ({ title, children }: any) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-slate-800 border-b pb-2">
      {title}
    </h2>
    {children}
  </div>
);

const Grid = ({ children }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {children}
  </div>
);

const Input = ({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: any;
  onChange: (v: string) => void;
  type?: string;
}) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
    />
  </div>
);

const Select = ({
  label,
  value,
  onChange,
  options,
}: any) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-1">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
    >
      <option value="">Select</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default AddProject;