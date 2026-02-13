import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, Save, Trash2 } from "lucide-react";

interface EmitterPack {
  _id: string;
  pack_name: string;
  description: string;
  packType?: string;
  intendedBuyer?: string;
  duration?: string;
  image_url: string;
  emitters?: any[];
  projects?: any[];
  weighted_price_per_kg?: number;
  total_pack_price?: number;
}

export const EditPack = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const API = "https://microoffsets.nettzero.world/api";

  const [pack, setPack] = useState<EmitterPack | null>(null);
  const [packName, setPackName] = useState("");
  const [description, setDescription] = useState("");
  const [packType, setPackType] = useState("Office / Workplace");
  const [intendedBuyer, setIntendedBuyer] = useState("Company");
  const [duration, setDuration] = useState("Per Month");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [allEmitters, setAllEmitters] = useState<any[]>([]);

  // search & filters
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  // =========================
  // FETCH PACK
  // =========================
  useEffect(() => {
    fetchPack();
    fetchEmitters();
  }, [id]);

  const fetchPack = async () => {
    try {
      const res = await axios.get(`${API}/getemitterpacks/${id}`);
      const data = res.data.data;
      setPack(data);
      setPackName(data.pack_name);
      setDescription(data.description);
      setPackType(data.packType || "Office / Workplace");
      setIntendedBuyer(data.intendedBuyer || "Company");
      setDuration(data.duration || "Per Month");
      setImagePreview(data.image_url ? `${API}${data.image_url}` : null);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEmitters = async () => {
    try {
      const res = await axios.get(`${API}/emitters`);
      setAllEmitters(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  // =========================
  // FILTERED EMITTERS
  // =========================
  const filteredEmitters = allEmitters
    .filter((e) => {
      const matchesSearch =
        e.emitter_name_standard?.toLowerCase().includes(search.toLowerCase()) ||
        e.emitter_code?.toLowerCase().includes(search.toLowerCase());
      const matchesSector = !sectorFilter || e.sector === sectorFilter;
      const matchesCategory = !categoryFilter || e.category === categoryFilter;
      const matchesSubCategory = !subCategoryFilter || e.sub_category === subCategoryFilter;
      return matchesSearch && matchesSector && matchesCategory && matchesSubCategory;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.emitter_name_standard.localeCompare(b.emitter_name_standard);
      if (sortBy === "factor-high") return b.factor_kgco2e_per_unit - a.factor_kgco2e_per_unit;
      if (sortBy === "factor-low") return a.factor_kgco2e_per_unit - b.factor_kgco2e_per_unit;
      return 0;
    });

  // =========================
  // ADD EMITTER
  // =========================
  const addEmitter = (emitterId: string) => {
    if (!pack) return;
    const exists = pack.emitters?.find((e: any) => e.emitter_id === emitterId);
    if (exists) {
      alert("Emitter already added");
      return;
    }

    const emitter = allEmitters.find((e) => e._id === emitterId);
    if (!emitter) return;

    const newEmitter = {
      emitter_id: emitter._id,
      emitter_name_standard: emitter.emitter_name_standard,
      sector: emitter.sector || "",
      category: emitter.category || "",
      sub_category: emitter.sub_category || "",
      unit: emitter.unit,
      factor_kgco2e_per_unit: emitter.factor_kgco2e_per_unit,
      quantity: 1,
      calculated_emission_kgco2e: emitter.factor_kgco2e_per_unit,
      source_type: emitter.source_name ? "Public" : "Est."
    };

    setPack({
      ...pack,
      emitters: [...(pack.emitters || []), newEmitter],
    });
  };

  // =========================
  // REMOVE EMITTER
  // =========================
  const removeEmitter = (index: number) => {
    if (!pack) return;
    const updated = pack.emitters?.filter((_, i) => i !== index);
    setPack({ ...pack, emitters: updated });
  };

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = (index: number, quantity: number) => {
    if (!pack) return;
    const updated = [...(pack.emitters || [])];
    updated[index].quantity = quantity;
    updated[index].calculated_emission_kgco2e = quantity * updated[index].factor_kgco2e_per_unit;
    setPack({ ...pack, emitters: updated });
  };

  // =========================
  // CALCULATIONS
  // =========================
  const totalEmission = useMemo(
    () => pack?.emitters?.reduce((sum, e) => sum + (e.calculated_emission_kgco2e || 0), 0) || 0,
    [pack]
  );

  const weightedPrice = useMemo(() => {
    if (!pack?.projects?.length) return 0;
    return pack.projects.reduce((sum, p) => sum + ((p.price_per_kg || 0) * (p.allocation_percent || 0)) / 100, 0);
  }, [pack]);

  const totalPackPrice = useMemo(() => totalEmission * weightedPrice, [totalEmission, weightedPrice]);

  // =========================
  // UPDATE PACK
  // =========================
 const handleUpdatePack = async () => {
  if (!pack) return;

  // recalc total emission
  const totalEmission = pack.emitters?.reduce(
    (sum, e) => sum + e.calculated_emission_kgco2e,
    0
  ) || 0;

  // recalc projects
  const updatedProjects = pack.projects?.map((p) => {
    const allocatedEmission = (p.allocation_percent / 100) * totalEmission;
    const allocatedCost = allocatedEmission * p.price_per_kg;
    return {
      ...p,
      allocated_emission_kgco2e: allocatedEmission,
      allocated_cost: allocatedCost,
    };
  }) || [];

  const weightedPrice = updatedProjects.reduce(
    (sum, p) => sum + (p.price_per_kg * (p.allocated_emission_kgco2e || 0)),
    0
  ) / (totalEmission || 1);

  const totalPackPrice = updatedProjects.reduce(
    (sum, p) => sum + (p.allocated_cost || 0),
    0
  );

  try {
    const formData = new FormData();
    formData.append("pack_name", packName);
    formData.append("description", description);
    formData.append("packType", packType);
    formData.append("intendedBuyer", intendedBuyer);
    formData.append("duration", duration);

    formData.append("emitters", JSON.stringify(pack.emitters || []));
    formData.append("projects", JSON.stringify(updatedProjects));
    if (imageFile) formData.append("image", imageFile);

    formData.append("total_emission_kgco2e", totalEmission.toString());
    formData.append("weighted_price_per_kg", weightedPrice.toString());
    formData.append("total_pack_price", totalPackPrice.toString());

    await axios.put(`${API}/emitterpacks/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Pack updated successfully!");
    navigate("/all-packs");
  } catch (err) {
    console.error(err);
    alert("Failed to update pack");
  }
};


  if (!pack) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Pack</h1>

      {/* IMAGE */}
      <div className="mb-6">
        <label className="border-2 border-dashed border-gray-300 rounded-2xl w-40 h-40 flex items-center justify-center cursor-pointer overflow-hidden">
          {imagePreview ? <img src={imagePreview} className="w-full h-full object-cover" /> : <Upload />}
          <input
            type="file"
            hidden
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setImageFile(e.target.files[0]);
                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />
        </label>
      </div>

      {/* BASIC */}
      <input className="w-full border p-2 mb-2" value={packName} onChange={(e) => setPackName(e.target.value)} />
      <textarea className="w-full border p-2 mb-4" value={description} onChange={(e) => setDescription(e.target.value)} />

      {/* SEARCH */}
      <input type="text" placeholder="Search emitter" className="w-full border p-2 mb-2" value={search} onChange={(e) => setSearch(e.target.value)} />

      {/* FILTERS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <select className="border p-2" value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)}>
          <option value="">All sectors</option>
          {[...new Set(allEmitters.map((e) => e.sector))].map((sector) => (
            <option key={sector}>{sector}</option>
          ))}
        </select>
        <select className="border p-2" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All categories</option>
          {[...new Set(allEmitters.map((e) => e.category))].map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <select className="border p-2" value={subCategoryFilter} onChange={(e) => setSubCategoryFilter(e.target.value)}>
          <option value="">All sub</option>
          {[...new Set(allEmitters.map((e) => e.sub_category))].map((sub) => (
            <option key={sub}>{sub}</option>
          ))}
        </select>
        <select className="border p-2" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort</option>
          <option value="name">Name A-Z</option>
          <option value="factor-high">Highest emission</option>
          <option value="factor-low">Lowest emission</option>
        </select>
      </div>

      {/* EMITTER SELECT */}
      <select className="w-full border p-2 mb-4" onChange={(e) => addEmitter(e.target.value)}>
        <option>Select emitter</option>
        {filteredEmitters.map((em) => (
          <option key={em._id} value={em._id}>
            {em.emitter_name_standard} ({em.factor_kgco2e_per_unit} kg)
          </option>
        ))}
      </select>

      {/* EMITTER LIST */}
      {pack.emitters?.map((emitter, index) => (
        <div key={index} className="flex gap-4 border p-2 mb-2 items-center">
          <div className="flex-1">{emitter.emitter_name_standard}</div>
          <input
            type="number"
            value={emitter.quantity}
            className="border p-1 w-20"
            onChange={(e) => updateQuantity(index, Number(e.target.value))}
          />
          <div>{emitter.calculated_emission_kgco2e?.toFixed(2)} kg CO₂e</div>
          <button onClick={() => removeEmitter(index)}>
            <Trash2 />
          </button>
        </div>
      ))}

      {/* LIVE CALCULATIONS */}
      <div className="mt-4 border-t pt-4 space-y-1">
        <div>Total Carbon: {totalEmission.toFixed(2)} kg CO₂e</div>
        <div>Weighted Price per kg: ₹{weightedPrice.toFixed(2)}</div>
        <div>Total Pack Price: ₹{totalPackPrice.toFixed(2)}</div>
      </div>

      {/* SAVE */}
      <button onClick={handleUpdatePack} className="mt-6 bg-emerald-700 text-white px-6 py-2 flex gap-2 items-center">
        <Save size={16} /> Update Pack
      </button>
    </div>
  );
};
