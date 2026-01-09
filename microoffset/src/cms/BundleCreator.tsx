import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

interface Emitter {
  _id: string;
  emitter_name_standard: string;
  category: string;
  sub_category: string;
  tags: string[];
  factor_kgco2e_per_unit: number;
  unit: string;
}

interface SelectedEmitter extends Emitter {
  quantity: number;
}

export const BundleCreator = () => {
  const [emitters, setEmitters] = useState<Emitter[]>([]);
  const [selected, setSelected] = useState<SelectedEmitter[]>([]);
  const [packName, setPackName] = useState("");

  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  /** Filters */
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [tag, setTag] = useState("");


  const resetAll = () => {
  if (!window.confirm("Reset all selected emitters and pack details?")) return;

  setSelected([]);
  setPackName("");
  setDescription("");
  setImage(null);

  setSearch("");
  setCategory("");
  setSubCategory("");
  setTag("");

  localStorage.removeItem("emitterPackDraft");
};


  /** Fetch emitters */
  useEffect(() => {
    axios.get("http://62.72.59.146:5000/emitters").then((res) => {
      setEmitters(res.data.data);
    });

    const saved = localStorage.getItem("emitterPackDraft");
    if (saved) {
      const pack = JSON.parse(saved);
      setPackName(pack.packName);
      setDescription(pack.description);
      setImage(pack.image);
      setSelected(pack.emitters);
    }
  }, []);

  /** Dropdown values */
  const categories = [...new Set(emitters.map((e) => e.category))];

  const subCategories = [
    ...new Set(
      emitters
        .filter((e) => !category || e.category === category)
        .map((e) => e.sub_category)
    ),
  ];

  const tags = [
    ...new Set(
      emitters
        .filter(
          (e) =>
            (!category || e.category === category) &&
            (!subCategory || e.sub_category === subCategory)
        )
        .flatMap((e) => e.tags)
    ),
  ];

  /** Filter emitters */
  const filteredEmitters = emitters.filter((e) => {
    return (
      (!search ||
        e.emitter_name_standard.toLowerCase().includes(search.toLowerCase())) &&
      (!category || e.category === category) &&
      (!subCategory || e.sub_category === subCategory) &&
      (!tag || e.tags.includes(tag))
    );
  });

  /** Selection */
  const addEmitter = (emitter: Emitter) => {
    if (selected.find((e) => e._id === emitter._id)) return;
    setSelected([...selected, { ...emitter, quantity: 1 }]);
  };

  const updateQty = (id: string, delta: number) => {
    setSelected((prev) =>
      prev.map((e) =>
        e._id === id
          ? { ...e, quantity: Math.max(1, e.quantity + delta) }
          : e
      )
    );
  };

  const totalEmission = selected.reduce(
    (sum, e) => sum + e.quantity * e.factor_kgco2e_per_unit,
    0
  );

  const emitterEmission = (qty: number, factor: number) =>
  qty * factor;


  /** Image */
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const createPack = async () => {
  try {
    if (!packName || selected.length === 0) {
      alert("Pack name and at least one emitter are required");
      return;
    }

    const payload = {
      pack_name: packName,
      description,
      image_url: image,
      emitters: selected.map((e) => ({
        emitter_id: e._id,
        emitter_name_standard: e.emitter_name_standard,
        category: e.category,
        sub_category: e.sub_category,
        tags: e.tags,
        quantity: e.quantity,
        unit: e.unit || "kWh",
        factor_kgco2e_per_unit: e.factor_kgco2e_per_unit,
        total_emission_kgco2e:
          e.quantity * e.factor_kgco2e_per_unit,
      })),
      total_emission_kgco2e: totalEmission,
    };

    // 🔥 SAVE TO DB
    const res = await axios.post(
      "http://62.72.59.146:5000/addemitterpacks",
      payload
    );

    // 💾 Save draft locally (for Edit)
    localStorage.setItem(
      "emitterPackDraft",
      JSON.stringify({
        ...payload,
        _id: res.data.data._id,
      })
    );

    alert("Emitter Pack Saved Successfully 🚀");
  } catch (error: any) {
    console.error(error);
    alert(
      error.response?.data?.message ||
        "Failed to save emitter pack"
    );
  }
};


  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-emerald-700">
        Emitter Pack Creator
      </h1>

      {/* Pack Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          className="border p-3 rounded-lg"
          placeholder="Pack Name"
          value={packName}
          onChange={(e) => setPackName(e.target.value)}
        />
        <input
          className="border p-3 rounded-lg"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Image */}
      <div>
        <label className="bg-emerald-600 text-white px-4 py-2 rounded cursor-pointer">
          Add Image
          <input type="file" hidden onChange={handleImage} />
        </label>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-4 bg-white p-4 rounded-xl shadow">
        <input
          className="border p-2 rounded"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border p-2 rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select className="border p-2 rounded" value={subCategory} onChange={(e) => setSubCategory(e.target.value)}>
          <option value="">All Sub Categories</option>
          {subCategories.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select className="border p-2 rounded" value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">All Tags</option>
          {tags.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

     {/* Emitters Grid (Scrollable) */}
<div className="bg-white rounded-xl shadow p-4">
  <h2 className="font-semibold mb-3">Available Emitters</h2>

  <div className="grid md:grid-cols-3 gap-4 max-h-[420px] overflow-y-auto pr-2">
    {filteredEmitters.map((e) => {
      const isSelected = selected.some((s) => s._id === e._id);

      return (
        <div
          key={e._id}
          className="border rounded-xl p-4 flex flex-col justify-between hover:shadow-md transition"
        >
          <div>
            <p className="font-semibold text-sm">
              {e.emitter_name_standard}
            </p>
            <p className="text-xs text-gray-500">
              {e.category} • {e.sub_category}
            </p>
          </div>

          <button
            onClick={() =>
              isSelected
                ? setSelected((prev) =>
                    prev.filter((s) => s._id !== e._id)
                  )
                : addEmitter(e)
            }
            className={`mt-4 w-full py-1.5 rounded-lg text-white font-medium transition
              ${
                isSelected
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
          >
            {isSelected ? "Remove" : "Add"}
          </button>
        </div>
      );
    })}
  </div>
</div>


      {/* Selected */}
      <div className="bg-emerald-50 p-4 rounded-xl">
        <h2 className="font-semibold mb-2">Selected Emitters</h2>
        {selected.map((e) => (
          <div key={e._id} className="flex justify-between bg-white p-3 mb-2 rounded shadow">
            <span>{e.emitter_name_standard}</span>
            <div className="flex gap-2">
              <button onClick={() => updateQty(e._id, -1)}>−</button>
              {e.quantity}
              <button onClick={() => updateQty(e._id, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>


      {/* Emission Summary */}
{selected.length > 0 && (
  <div className="bg-white rounded-xl shadow p-5">
    <h2 className="text-lg font-bold text-emerald-700 mb-3">
      Emission Summary
    </h2>

    <div className="space-y-2">
      {selected.map((e) => (
        <div
          key={e._id}
          className="flex justify-between items-center border-b pb-2 text-sm"
        >
          <div>
            <p className="font-medium">{e.emitter_name_standard}</p>
            <p className="text-gray-500">
              {e.quantity} × {e.factor_kgco2e_per_unit} kgCO₂e
            </p>
          </div>

          <p className="font-semibold text-gray-800">
            {emitterEmission(
              e.quantity,
              e.factor_kgco2e_per_unit
            ).toFixed(2)} kgCO₂e
          </p>
        </div>
      ))}
    </div>

    <div className="mt-4 pt-3 border-t flex justify-between items-center">
      <span className="text-lg font-bold">Total</span>
      <span className="text-xl font-bold text-emerald-700">
        {totalEmission.toFixed(2)} kgCO₂e
      </span>
    </div>
  </div>
)}


  {/* Actions */}
<div className="flex flex-wrap gap-4">
  <button
    onClick={() => setPreviewOpen(true)}
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
  >
    Preview
  </button>

  <button
    onClick={createPack}
    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg"
  >
    Create / Save
  </button>

  <button
    onClick={resetAll}
    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg"
  >
    Reset
  </button>
</div>


      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white max-w-xl w-full p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-2">{packName}</h2>
            {image && <img src={image} className="rounded mb-3" />}
            <p>{description}</p>
            <ul className="mt-3">
              {selected.map((e) => (
                <li key={e._id}>
                  {e.emitter_name_standard} × {e.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-3 font-bold">
              Total: {totalEmission.toFixed(2)} kgCO₂e
            </p>
            <button
              onClick={() => setPreviewOpen(false)}
              className="mt-4 bg-gray-300 px-4 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
