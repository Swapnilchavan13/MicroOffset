import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  Upload,
  Plus,
  Minus,
  Trash2,
  Info,
  CheckCircle2,
  RefreshCw,
  Copy,
  Save,
  Eye,
  Send,
  X,
  Zap,
  Monitor,
  Utensils,
  Car,
  Droplets,
  Home,
} from "lucide-react";

/* ================= TYPES ================= */

interface Emitter {
  _id: string;
  sector: string;
  category: string;
  sub_category: string;
  emitter_name_standard: string;
  tags: string[];
  factor_kgco2e_per_unit: number;
  unit: string;
  source_type?: "Est." | "Public"; // Mocking this based on screenshot
}

interface SelectedEmitter extends Emitter {
  quantity: number;
}

interface Project {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  subtitle?: string;
  location: string;
  status: string;

  // ✅ FROM API (NO MOCKS)
  pricePerKgCO2: number;
  image: string;

  // ✅ availability tracking
  totalCreditsKg: number;     // total available credits (kg)
  retiredCreditsKg: number;   // retired credits (kg)

  sdgs?: number[];
}

/* ================= COMPONENT ================= */

export const BundleCreator = () => {
  /* ---------- Pack Details State ---------- */
  const [packName, setPackName] = useState("My Office Carbon Pack");
  const [packType, setPackType] = useState("Office / Workplace");
  const [intendedBuyer, setIntendedBuyer] = useState("Company");
  const [duration, setDuration] = useState("Per Month");
  const [description, setDescription] = useState(""); // Kept for backend compatibility, though not explicitly in top form screenshot

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  /* ---------- Emitters State ---------- */
  const [emitters, setEmitters] = useState<Emitter[]>([]);
  const [selected, setSelected] = useState<SelectedEmitter[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  /* ---------- Filters ---------- */
  // Using categories/sectors as filter pills
  const [activeFilter, setActiveFilter] = useState<string>("All");

  /* ---------- Projects State ---------- */
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [expandedSummary, setExpandedSummary] = useState(false);

  const MAX_PROJECTS = 4;

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);


  /* ================= FETCH DATA ================= */

  useEffect(() => {
    // 1. Fetch Emitters
    axios
      .get("http://http://62.72.59.146:5000/emitters")
      .then((res) => {
        // Adding dummy source type for UI match if not present
        const mappedData = res.data.data.map((e: any) => ({
          ...e,
          source_type: Math.random() > 0.5 ? "Est." : "Public",
        }));
        setEmitters(mappedData);
      })
      .catch((err) => console.error("Emitter fetch error", err));

    // 2. Fetch Projects (Mocking extra fields to match UI)
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://http://62.72.59.146:5000/projects");
        const json = await res.json();
        // Enriching data to match UI screenshots
        const enrichedProjects = json.data.map((p: any, idx: number) => ({
          ...p,
         
        }));
        setProjects(enrichedProjects);
        // Default select first two for demo
        if (enrichedProjects.length >= 2) {
          setSelectedProjects([
            enrichedProjects[0].projectId,
            enrichedProjects[1].projectId,
          ]);
        }
      } catch (err) {
        console.error("Failed to load projects", err);
      }
    };
    fetchProjects();
  }, []);

  /* ================= COMPUTED LOGIC ================= */

  // Filter Emitters
  const filteredEmitters = useMemo(() => {
    return emitters.filter((e) => {
      const matchesSearch = e.emitter_name_standard
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "All" ||
        e.sector === activeFilter ||
        e.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [emitters, searchQuery, activeFilter]);

  // Unique filters for the pill list
  const filterPills = useMemo(() => {
    const sectors = [...new Set(emitters.map((e) => e.sector))];
    return ["All", ...sectors];
  }, [emitters]);

  // Calculations
  const totalEmission = selected.reduce(
    (sum, e) => sum + e.quantity * e.factor_kgco2e_per_unit,
    0
  );

  const allocationPercent =
    selectedProjects.length > 0 ? 100 / selectedProjects.length : 0;

  // Calculate Weighted Price
  const selectedProjectDetails = projects.filter((p) =>
    selectedProjects.includes(p.projectId)
  );

  const weightedPricePerKg =
    selectedProjects.length > 0
      ? selectedProjectDetails.reduce((sum, p) => sum + (p.pricePerKgCO2 || 0), 0) /
        selectedProjects.length
      : 0;

  const totalPackPrice = totalEmission * weightedPricePerKg;

  /* ================= HANDLERS ================= */

  const handleAddEmitter = (emitter: Emitter) => {
    if (selected.some((s) => s._id === emitter._id)) return;
    setSelected([...selected, { ...emitter, quantity: 1 }]);
  };

  const handleRemoveEmitter = (id: string) => {
    setSelected((prev) => prev.filter((e) => e._id !== id));
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setSelected((prev) =>
      prev.map((e) =>
        e._id === id
          ? { ...e, quantity: Math.max(1, e.quantity + delta) }
          : e
      )
    );
  };

  const toggleProject = (projectId: string) => {
    setSelectedProjects((prev) => {
      if (prev.includes(projectId)) {
        return prev.filter((id) => id !== projectId);
      }
      if (prev.length >= MAX_PROJECTS) return prev;
      return [...prev, projectId];
    });
  };

  const handleCreatePack = async () => {
  try {
    const formData = new FormData();

    formData.append("pack_name", packName);
    formData.append("description", description || "Custom Pack");
    formData.append("packType", packType);
    formData.append("intendedBuyer", intendedBuyer);
    formData.append("duration", duration);

    // Emitters snapshot
   formData.append(
  "emitters",
  JSON.stringify(
    selected.map((e) => ({
      emitter_id: e._id,
      emitter_name_standard: e.emitter_name_standard,
      sector: e.sector,
      category: e.category,
      sub_category: e.sub_category,
      unit: e.unit,
      quantity: e.quantity,
      factor_kgco2e_per_unit: e.factor_kgco2e_per_unit,

      // ✅ FIXED KEY
      calculated_emission_kgco2e:
        e.quantity * e.factor_kgco2e_per_unit,

      source_type: e.source_type,
    }))
  )
);


    // Projects snapshot
formData.append(
  "projects",
  JSON.stringify(
    selectedProjectDetails.map((p) => ({
      // 🔥 REQUIRED BY MONGOOSE
      project_ref: p._id,

      // 📦 Snapshot fields
      projectId: p.projectId,
      allocation_percent: allocationPercent,
      price_per_kg: p.pricePerKgCO2,

          // 🖼️ SNAPSHOT IMAGE
      project_image_url: p.image,

      allocated_emission_kgco2e:
        totalEmission / selectedProjects.length,

      allocated_cost:
        (totalEmission / selectedProjects.length) *
        (p.pricePerKgCO2 || 0),

      // optional snapshot (you defined these in schema)
      total_credits_kg: p.totalCreditsKg,
      retired_credits_kg: p.retiredCreditsKg,
    }))
  )
);


    formData.append(
      "total_emission_kgco2e",
      totalEmission.toString()
    );
    formData.append(
      "weighted_price_per_kg",
      weightedPricePerKg.toString()
    );
    formData.append(
      "total_pack_price",
      totalPackPrice.toString()
    );

    if (imageFile) formData.append("image", imageFile);

    await axios.post(
      "http://http://62.72.59.146:5000/addemitterpacks",
      formData
    );

    alert("Pack Created Successfully 🚀");
  } catch (err) {
    console.error(err);
    alert("Failed to create pack");
  }
};

const resetPack = () => {
  // Pack Details
  setPackName("My Office Carbon Pack");
  setPackType("Office / Workplace");
  setIntendedBuyer("Company");
  setDuration("Per Month");
  setDescription("");

  // Image
  setImageFile(null);
  setImagePreview(null);

  // Emitters
  setSelected([]);
  setSearchQuery("");
  setActiveFilter("All");

  // Projects
  setSelectedProjects([]);
  setExpandedSummary(false);
};



  /* ================= RENDER HELPERS ================= */

  const getIconForFilter = (filter: string) => {
    switch (filter) {
      case "Energy":
        return <Zap size={14} />;
      case "Digital":
        return <Monitor size={14} />;
      case "Food & Beverages":
        return <Utensils size={14} />;
      case "Travel":
        return <Car size={14} />;
      case "Water":
        return <Droplets size={14} />;
      default:
        return <Home size={14} />;
    }
  };



  const packPreview = {
  pack_name: packName,
  description: description || "Custom Pack",
  packType,
  intendedBuyer,
  duration,
  imagePreview,

  emitters: selected.map((e) => ({
    name: e.emitter_name_standard,
    sector: e.sector,
    unit: e.unit,
    quantity: e.quantity,
    factor: e.factor_kgco2e_per_unit,
    emission: e.quantity * e.factor_kgco2e_per_unit,
  })),

  totalEmission,

  projects: selectedProjectDetails.map((p) => ({
    title: p.title,
    location: p.location,
    allocationPercent,
    pricePerKg: p.pricePerKgCO2,
    allocatedEmission:
      totalEmission / selectedProjects.length,
    allocatedCost:
      (totalEmission / selectedProjects.length) *
      (p.pricePerKgCO2 || 0),
    imageUrl: p.image,
  })),

  weightedPricePerKg,
  totalPackPrice,
};


  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans text-slate-800">
      <div className="max-w-[1400px] mx-auto p-4 lg:p-8">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
              <RefreshCw size={24} />
            </span>
            <h1 className="text-3xl font-bold text-slate-900">
              Build Your MicroOffsets Pack
            </h1>
          </div>
          <p className="text-gray-500 max-w-3xl">
            Create a personalised carbon offset pack by selecting activities
            (emitters), entering usage, and instantly seeing your climate
            impact.
          </p>
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
            <Info size={12} />
            <span>
              Every pack is traceable, transparent, and backed by verified or
              clearly-labelled estimates.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= LEFT COLUMN (MAIN) ================= */}
          <div className="lg:col-span-2 space-y-8">
            {/* 1. PACK DETAILS */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-emerald-900 flex items-center gap-2 mb-6">
                <span className="p-1 bg-emerald-100 rounded text-emerald-600">
                  <RefreshCw size={16} />
                </span>
                Pack Details
              </h2>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Image Upload */}
                <div className="shrink-0">
                  <label className="border-2 border-dashed border-gray-300 rounded-2xl w-32 h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        className="w-full h-full object-cover"
                        alt="Preview"
                      />
                    ) : (
                      <>
                        <Upload className="text-gray-400 mb-2" size={20} />
                        <span className="text-xs text-center text-gray-500 font-medium px-2">
                          Upload Image
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setImageFile(e.target.files[0]);
                          setImagePreview(
                            URL.createObjectURL(e.target.files[0])
                          );
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="md:col-span-1">
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">
                      Pack Name
                    </label>
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={packName}
                      onChange={(e) => setPackName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">
                      Pack Type
                    </label>
                    <select
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={packType}
                      onChange={(e) => setPackType(e.target.value)}
                    >
                      <option>Office / Workplace</option>
                      <option>Event</option>
                      <option>Personal</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">
                      Intended Buyer
                    </label>
                    <select
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={intendedBuyer}
                      onChange={(e) => setIntendedBuyer(e.target.value)}
                    >
                      <option>Company</option>
                      <option>Individual</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 mb-1 block">
                      Duration
                    </label>
                    <select
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    >
                      <option>Per Month</option>
                      <option>One Time</option>
                      <option>Per Year</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. ADD EMITTERS */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                  <span className="p-1 bg-emerald-100 rounded text-emerald-600">
                    <Plus size={16} />
                  </span>
                  Add Emitters
                </h2>
                <span className="text-xs text-gray-400">
                  {emitters.length} available
                </span>
              </div>

              {/* Search & Filter */}
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder='Search activities (e.g. "Email", "Lunch buffet")'
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {filterPills.map((pill) => (
                    <button
                      key={pill}
                      onClick={() => setActiveFilter(pill)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition ${
                        activeFilter === pill
                          ? "bg-slate-800 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {getIconForFilter(pill)}
                      {pill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emitter List */}
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredEmitters.map((emitter) => {
                  const isAdded = selected.some((s) => s._id === emitter._id);
                  return (
                    <div
                      key={emitter._id}
                      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition border border-transparent hover:border-gray-100 group"
                    >
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">
                          {emitter.emitter_name_standard}
                        </div>
                        <div className="text-xs text-gray-400">
                          {emitter.sector} · {emitter.unit}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
                            {emitter.factor_kgco2e_per_unit} kg
                          </span>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                              emitter.source_type === "Est."
                                ? "border-orange-200 text-orange-500 bg-orange-50"
                                : "border-emerald-200 text-emerald-600 bg-emerald-50"
                            }`}
                          >
                            {emitter.source_type}
                          </span>
                        </div>
                        {isAdded ? (
                          <button
                            onClick={() => handleRemoveEmitter(emitter._id)}
                            className="bg-red-50 text-red-500 hover:bg-red-100 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 transition"
                          >
                            <X size={14} /> Remove
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddEmitter(emitter)}
                            className="bg-emerald-600 text-white hover:bg-emerald-700 px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1 transition shadow-sm shadow-emerald-200"
                          >
                            <Plus size={14} /> Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3. YOUR PACK ITEMS */}
            {selected.length > 0 && (
              <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-end mb-4">
                  <h2 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                    <span className="p-1 bg-emerald-100 rounded text-emerald-600">
                      <Copy size={16} />
                    </span>
                    Your Pack Items
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selected.length} items · {totalEmission.toFixed(1)} kg CO₂e
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selected.map((item) => (
                    <div
                      key={item._id}
                      className="bg-gray-50/80 p-4 rounded-xl border border-gray-100 relative group"
                    >
                      <button
                        onClick={() => handleRemoveEmitter(item._id)}
                        className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={16} />
                      </button>

                      <h3 className="font-semibold text-sm text-slate-800 mb-1 pr-4 truncate">
                        {item.emitter_name_standard}
                      </h3>
                      <p className="text-xs text-gray-400 mb-4">
                        {item.sector}
                      </p>

                      <div className="flex items-end justify-between">
                        {/* Counter */}
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg h-8">
                          <button
                            onClick={() => handleUpdateQty(item._id, -1)}
                            className="px-2 text-gray-400 hover:text-emerald-600 transition"
                          >
                            <Minus size={12} />
                          </button>
                          <input
                            readOnly
                            value={item.quantity}
                            className="w-8 text-center text-xs font-bold text-slate-700 outline-none"
                          />
                          <button
                            onClick={() => handleUpdateQty(item._id, 1)}
                            className="px-2 text-gray-400 hover:text-emerald-600 transition"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        {/* Unit */}
                        <span className="text-xs text-gray-400 ml-2">
                          {item.unit}
                        </span>
                        {/* Total */}
                        <div className="ml-auto text-right">
                          <div className="text-xs font-bold text-emerald-700">
                            {(
                              item.quantity * item.factor_kgco2e_per_unit
                            ).toFixed(2)}{" "}
                            kg
                          </div>
                        </div>
                      </div>

                      {/* Info footer */}
                      <div className="mt-3 pt-2 border-t border-gray-200 flex items-center gap-2 text-[10px] text-gray-400">
                        <Info size={10} />
                        <span>{item.factor_kgco2e_per_unit} kg/unit</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. SELECT OFFSET PROJECTS */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-emerald-900 flex items-center gap-2">
                  <span className="p-1 bg-emerald-100 rounded text-emerald-600">
                    <Home size={16} />
                  </span>
                  Select Offset Projects
                </h2>
                {selectedProjects.length > 0 && (
                  <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    % 100 allocated
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-6">
                Click to select up to 4 projects. Allocations will
                auto-distribute equally but you can adjust percentages manually.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((project) => {
                  const isSelected = selectedProjects.includes(project.projectId);
                  const isDisabled =
                    !isSelected && selectedProjects.length >= MAX_PROJECTS;

                  return (
                    <div
                      key={project._id}
                      className={`relative rounded-xl border-2 overflow-hidden transition-all duration-200 group ${
                        isSelected
                          ? "border-emerald-500 ring-4 ring-emerald-50"
                          : "border-gray-100 hover:border-emerald-200 hover:shadow-lg"
                      } ${isDisabled ? "opacity-60 grayscale" : ""}`}
                    >
                      {/* Checkbox Overlay */}
                      <button
                        onClick={() => toggleProject(project.projectId)}
                        disabled={isDisabled}
                        className={`absolute top-3 right-3 z-10 w-6 h-6 rounded border flex items-center justify-center transition ${
                          isSelected
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "bg-white/80 border-gray-300 hover:border-emerald-500"
                        }`}
                      >
                        {isSelected && <CheckCircle2 size={16} />}
                      </button>

                      {/* Image Banner */}
                      <div className="h-32 bg-gray-200 relative">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded-md text-slate-700 uppercase tracking-wide">
                          {project.projectId.split("-")[0] || "Offset"}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-4 bg-white">
                        <h3 className="font-bold text-slate-800 text-sm mb-1 leading-tight line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-2 mb-3 h-8">
                          {project.description}
                        </p>

                        <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-3">
                          <span className="truncate max-w-[120px]">
                            📍 {project.location}
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-[10px] font-medium text-gray-500 mb-1">
                            <span>Retired</span>
                            <span>45%</span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="w-[45%] h-full bg-emerald-500 rounded-full"></div>
                          </div>
                        </div>

                        {/* Footer: Price & SDGs */}
                        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                          <div>
                            <span className="text-emerald-700 font-bold text-sm">
                              ₹{project.pricePerKgCO2}
                            </span>
                            <span className="text-gray-400 text-xs">/kg</span>
                          </div>

                          <div className="flex gap-1">
                            {[13, 15, 2].map((sdg) => (
                              <span
                                key={sdg}
                                className={`w-5 h-5 flex items-center justify-center text-[9px] font-bold text-white rounded shadow-sm ${
                                  sdg === 13
                                    ? "bg-emerald-600"
                                    : sdg === 15
                                    ? "bg-green-500"
                                    : "bg-orange-400"
                                }`}
                              >
                                {sdg}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Allocation Input */}
                        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                          <span className="text-xs text-gray-400">
                            Allocation
                          </span>
                          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                            <span className="text-xs font-bold text-slate-700">
                              {isSelected ? allocationPercent.toFixed(0) : 0}
                            </span>
                            <span className="text-[10px] text-gray-400">%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

             {/* 5. How this is calculated (Static Info) */}
             <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="flex items-center gap-2 font-bold text-slate-800 mb-4">
                    <span className="text-emerald-600"><CheckCircle2 size={20}/></span>
                    How this pack is calculated
                </h3>
                <ul className="space-y-3 text-sm text-gray-500">
                    <li className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0"/>
                        Emissions are calculated using recognised emission factors
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0"/>
                        Public sources are prioritised
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0"/>
                        Internal estimates are clearly labelled
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0"/>
                        Final values are frozen at purchase for auditability
                    </li>
                </ul>
             </section>
          </div>

          {/* ================= RIGHT COLUMN (SUMMARY) ================= */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50">
                <h2 className="flex items-center gap-2 font-bold text-lg text-slate-800 mb-6">
                  <span className="text-emerald-600">
                    <Zap size={20} />
                  </span>
                  Pack Summary
                </h2>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 text-sm">
                    Total Emitters Added
                  </span>
                  <span className="font-bold text-slate-800 text-lg">
                    {selected.length}
                  </span>
                </div>

                <div className="flex justify-between items-end mb-8">
                  <span className="text-gray-500 text-sm mb-1">
                    Total Emissions
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-3xl text-slate-900 block">
                      {totalEmission.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400">kg CO₂e</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Weighted Offset Price</span>
                    <span>₹{weightedPricePerKg.toFixed(2)}/kg</span>
                  </div>
                  {selectedProjectDetails.map((p) => (
                    <div
                      key={p._id}
                      className="flex justify-between text-[11px] text-gray-400 pl-2 border-l-2 border-gray-100"
                    >
                      <span className="truncate max-w-[150px]">{p.title}</span>
                      <span>
                        {allocationPercent.toFixed(0)}% × ₹{p.pricePerKgCO2}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50/50 p-6">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 text-slate-800 font-bold">
                        <span className="text-emerald-600"><CheckCircle2 size={18}/></span>
                        Total Pack Price
                    </div>
                  <span className="text-2xl font-bold text-emerald-700">
                    ₹{Math.ceil(totalPackPrice).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100">
                  <button 
                    onClick={() => setExpandedSummary(!expandedSummary)}
                    className="w-full py-3 text-xs text-gray-500 hover:bg-gray-50 flex justify-between px-6"
                  >
                      View Breakdown
                      <span className="rotate-90">›</span>
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-xl z-50">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-3">
            <button
  onClick={resetPack}
  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium transition"
>
  <RefreshCw size={16} /> Reset
</button>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium transition">
              <Copy size={16} /> Duplicate
            </button>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-sm font-medium transition">
              <Save size={16} /> Save Draft
            </button>
            <button
  onClick={() => setIsPreviewOpen(true)}
  className="flex items-center gap-2 px-5 py-2 rounded-lg border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-sm font-medium transition"
>
  <Eye size={16} /> Preview
</button>

            <button
              onClick={handleCreatePack}
              className="flex items-center gap-2 px-6 py-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 text-sm font-bold shadow-lg shadow-emerald-200 transition"
            >
              <Send size={16} /> Publish Pack
            </button>
          </div>
        </div>
      </div>

      {isPreviewOpen && (
  <div className="fixed inset-0 z-[999] bg-black/40 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      
      {/* Header */}
      <div className="p-6 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">
          Pack Preview
        </h2>
        <button
          onClick={() => setIsPreviewOpen(false)}
          className="text-gray-400 hover:text-gray-700"
        >
          <X />
        </button>
      </div>

      {/* Image */}
      {packPreview.imagePreview && (
        <img
          src={packPreview.imagePreview}
          className="w-full h-56 object-cover"
          alt="Pack"
        />
      )}

      {/* Content */}
      <div className="p-6 space-y-8">

        {/* Pack Meta */}
        <div>
          <h3 className="text-2xl font-bold text-emerald-700">
            {packPreview.pack_name}
          </h3>
          <p className="text-gray-500 mt-1">
            {packPreview.description}
          </p>

          <div className="flex gap-4 mt-3 text-xs text-gray-400">
            <span>{packType}</span>
            <span>•</span>
            <span>{intendedBuyer}</span>
            <span>•</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Emitters */}
        <div>
          <h4 className="font-bold text-slate-800 mb-3">
            Included Emitters
          </h4>
          <div className="space-y-2">
            {packPreview.emitters.map((e, i) => (
              <div
                key={i}
                className="flex justify-between bg-gray-50 p-3 rounded-lg text-sm"
              >
                <div>
                  <div className="font-semibold">
                    {e.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {e.quantity} × {e.unit}
                  </div>
                </div>
                <div className="font-bold text-emerald-700">
                  {e.emission.toFixed(2)} kg CO₂e
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div>
          <h4 className="font-bold text-slate-800 mb-3">
            Offset Projects
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packPreview.projects.map((p, i) => (
              <div
                key={i}
                className="border rounded-xl overflow-hidden"
              >
                <img
                  src={p.imageUrl}
                  className="h-32 w-full object-cover"
                />
                <div className="p-4">
                  <div className="font-bold text-sm">
                    {p.title}
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    {p.location}
                  </div>
                  <div className="text-xs">
                    {p.allocationPercent.toFixed(0)}% • ₹
                    {p.pricePerKg}/kg
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-emerald-50 p-6 rounded-xl flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">
              Total Emissions
            </div>
            <div className="font-bold text-xl">
              {packPreview.totalEmission.toFixed(2)} kg CO₂e
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">
              Total Price
            </div>
            <div className="font-bold text-2xl text-emerald-700">
              ₹{Math.ceil(packPreview.totalPackPrice)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t flex justify-end gap-3">
        <button
          onClick={() => setIsPreviewOpen(false)}
          className="px-4 py-2 border rounded-lg text-sm"
        >
          Close
        </button>
        <button
          onClick={handleCreatePack}
          className="px-6 py-2 bg-emerald-700 text-white rounded-lg text-sm font-bold"
        >
          Publish Pack
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};