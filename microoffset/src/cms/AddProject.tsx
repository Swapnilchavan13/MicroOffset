import { useState } from "react";
import { Save, Loader2 } from "lucide-react";

/* ================= TYPES ================= */
interface ProjectPayload {
  projectId: string;
  title: string;
  description: string;
  location: string;
  status: string;
  retired: number;
  available: number;
  pricePerKgCO2: number;
  currency: string;
  image: string;
}

/* ================= API CONFIG ================= */
// 🔁 Replace with real backend URL later
const API_URL = "http://localhost:5000/api/projects";

/* ================= COMPONENT ================= */
const AddProject = () => {
  const [form, setForm] = useState<ProjectPayload>({
    projectId: "",
    title: "",
    description: "",
    location: "",
    status: "MicroOffsets Retired",
    retired: 0,
    available: 0,
    pricePerKgCO2: 0,
    currency: "INR",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    field: keyof ProjectPayload,
    value: string | number
  ) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // 🔥 Dummy API call (replace later)
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      // Simulate success if backend not ready
      if (!res.ok) {
        console.log("Dummy save:", form);
      }

      setMessage("✅ Project added successfully");
      setForm({
        projectId: "",
        title: "",
        description: "",
        location: "",
        status: "MicroOffsets Retired",
        retired: 0,
        available: 0,
        pricePerKgCO2: 0,
        currency: "INR",
        image: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">
            Add New Carbon Project
          </h1>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl font-semibold disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {loading ? "Saving…" : "Save Project"}
          </button>
        </div>

        {/* Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="text-sm text-slate-500">Project Image URL</label>
            <input
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg"
            />
          </div>

          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="h-40 rounded-xl object-cover border"
            />
          )}
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Project ID" value={form.projectId}
            onChange={(v) => handleChange("projectId", v)} />

          <Input label="Title" value={form.title}
            onChange={(v) => handleChange("title", v)} />

          <Input label="Location" value={form.location}
            onChange={(v) => handleChange("location", v)} />

          <Input label="Status" value={form.status}
            onChange={(v) => handleChange("status", v)} />

          <Input label="Retired CO₂ (kg)" type="number" value={form.retired}
            onChange={(v) => handleChange("retired", Number(v))} />

          <Input label="Available CO₂ (kg)" type="number" value={form.available}
            onChange={(v) => handleChange("available", Number(v))} />

          <Input label="Price per kg CO₂" type="number" value={form.pricePerKgCO2}
            onChange={(v) => handleChange("pricePerKgCO2", Number(v))} />

          <Input label="Currency" value={form.currency}
            onChange={(v) => handleChange("currency", v)} />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm text-slate-500">Description</label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-xl"
          />
        </div>

        {/* Message */}
        {message && (
          <div className="text-sm text-emerald-600 font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

/* ================= INPUT ================= */
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
    <label className="text-sm text-slate-500">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-1 px-4 py-2 border rounded-lg"
    />
  </div>
);

export default AddProject;
