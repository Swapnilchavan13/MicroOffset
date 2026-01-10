import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

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
}

interface SelectedEmitter extends Emitter {
  quantity: number;
}

/* ================= COMPONENT ================= */

export const BundleCreator = () => {
  /* ---------- Pack ---------- */
  const [packName, setPackName] = useState("");
  const [description, setDescription] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  /* ---------- Emitters ---------- */
  const [emitters, setEmitters] = useState<Emitter[]>([]);
  const [selected, setSelected] = useState<SelectedEmitter[]>([]);

  /* ---------- Filters ---------- */
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  /* ---------- UI ---------- */
  const [previewOpen, setPreviewOpen] = useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {
    axios.get("http://62.72.59.146:5000/emitters").then((res) => {
      setEmitters(res.data.data);
    });
  }, []);

  /* ================= DERIVED ================= */

  const sectors = useMemo(
    () => [...new Set(emitters.map((e) => e.sector))],
    [emitters]
  );

  const categories = useMemo(
    () =>
      [
        ...new Set(
          emitters
            .filter((e) => selectedSectors.includes(e.sector))
            .map((e) => e.category)
        ),
      ],
    [emitters, selectedSectors]
  );

  const visibleEmitters = useMemo(
    () =>
      emitters.filter(
        (e) =>
          selectedSectors.includes(e.sector) &&
          selectedCategories.includes(e.category)
      ),
    [emitters, selectedSectors, selectedCategories]
  );

  /* ================= EMITTER ACTIONS ================= */

  const addEmitter = (emitter: Emitter) => {
    if (selected.some((s) => s._id === emitter._id)) return;
    setSelected([...selected, { ...emitter, quantity: 1 }]);
  };

  const removeEmitter = (id: string) => {
    setSelected((prev) => prev.filter((e) => e._id !== id));
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

  /* ================= EMISSIONS ================= */

  const emitterEmission = (qty: number, factor: number) =>
    qty * factor;

  const totalEmission = selected.reduce(
    (sum, e) => sum + e.quantity * e.factor_kgco2e_per_unit,
    0
  );

  /* ================= CREATE PACK ================= */

  const createPack = async () => {
    try {
      const formData = new FormData();

      formData.append("pack_name", packName);
      formData.append("description", description);

      formData.append(
        "emitters",
        JSON.stringify(
          selected.map((e) => ({
            emitter_id: e._id,
            emitter_name_standard: e.emitter_name_standard,
            sector: e.sector,
            category: e.category,
            sub_category: e.sub_category,
            tags: e.tags,
            quantity: e.quantity,
            unit: e.unit,
            factor_kgco2e_per_unit: e.factor_kgco2e_per_unit,
            total_emission_kgco2e:
              e.quantity * e.factor_kgco2e_per_unit,
          }))
        )
      );

      formData.append(
        "total_emission_kgco2e",
        totalEmission.toString()
      );

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.post(
        "http://62.72.59.146:5000/addemitterpacks",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Microoffsets Pack Created 🚀");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create pack");
    }
  };

  /* ================= RESET ================= */

  const resetAll = () => {
    if (!window.confirm("Reset everything?")) return;
    setPackName("");
    setDescription("");
    setImageFile(null);
    setImagePreview(null);
    setSelected([]);
    setSelectedSectors([]);
    setSelectedCategories([]);
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-emerald-700">
        Microoffsets Pack Creator
      </h1>

      {/* ---------- PACK INFO ---------- */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          className="border p-3 rounded-lg"
          placeholder="Create Pack Name"
          value={packName}
          onChange={(e) => setPackName(e.target.value)}
        />
        <input
          className="border p-3 rounded-lg"
          placeholder="Describe Your Pack"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* ---------- IMAGE ---------- */}
      <label className="bg-emerald-600 text-white px-4 py-2 rounded cursor-pointer w-fit">
        Add Image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setImageFile(e.target.files[0]);
              setImagePreview(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
      </label>

      {imagePreview && (
        <img src={imagePreview} className="h-32 rounded" />
      )}

      {/* ---------- SECTOR ---------- */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Select Sector(s)</h2>
        <div className="grid md:grid-cols-3 gap-2">
          {sectors.map((s) => (
            <label key={s} className="flex gap-2">
              <input
                type="checkbox"
                checked={selectedSectors.includes(s)}
                onChange={() =>
                  setSelectedSectors((prev) =>
                    prev.includes(s)
                      ? prev.filter((x) => x !== s)
                      : [...prev, s]
                  )
                }
              />
              {s}
            </label>
          ))}
        </div>
      </div>

      {/* ---------- CATEGORY ---------- */}
      {selectedSectors.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Select Category(s)</h2>
          <div className="grid md:grid-cols-3 gap-2">
            {categories.map((c) => (
              <label key={c} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(c)}
                  onChange={() =>
                    setSelectedCategories((prev) =>
                      prev.includes(c)
                        ? prev.filter((x) => x !== c)
                        : [...prev, c]
                    )
                  }
                />
                {c}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ---------- EMITTERS ---------- */}
      {visibleEmitters.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">Add Emitters</h2>

          <div className="grid md:grid-cols-3 gap-4">
            {visibleEmitters.map((e) => {
              const isSelected = selected.some(
                (s) => s._id === e._id
              );

              return (
                <div key={e._id} className="border p-4 rounded-xl">
                  <p className="font-semibold">
                    {e.emitter_name_standard}
                  </p>
                  <p className="text-xs text-gray-500">
                    {e.factor_kgco2e_per_unit} kgCO₂e / {e.unit}
                  </p>

                  <button
                    onClick={() =>
                      isSelected
                        ? removeEmitter(e._id)
                        : addEmitter(e)
                    }
                    className={`mt-3 w-full py-1.5 rounded text-white ${
                      isSelected
                        ? "bg-red-500"
                        : "bg-emerald-600"
                    }`}
                  >
                    {isSelected ? "Remove" : "Add"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------- SELECTED + QUANTITY ---------- */}
      {selected.length > 0 && (
        <div className="bg-emerald-50 p-4 rounded-xl">
          <h2 className="font-semibold mb-3">Selected Emitters</h2>

          {selected.map((e) => (
            <div
              key={e._id}
              className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow"
            >
              <div>
                <p className="font-medium">
                  {e.emitter_name_standard}
                </p>
                <p className="text-xs text-gray-500">
                  {emitterEmission(
                    e.quantity,
                    e.factor_kgco2e_per_unit
                  ).toFixed(2)} kgCO₂e
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQty(e._id, -1)}
                  className="px-2 rounded bg-gray-200"
                >
                  −
                </button>
                <span>{e.quantity}</span>
                <button
                  onClick={() => updateQty(e._id, 1)}
                  className="px-2 rounded bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------- SUMMARY ---------- */}
      {selected.length > 0 && (
        <div className="bg-white p-5 rounded-xl shadow">
          <div className="flex justify-between font-bold">
            <span>Total Emission</span>
            <span className="text-emerald-700">
              {totalEmission.toFixed(2)} kgCO₂e
            </span>
          </div>
        </div>
      )}

      {/* ---------- ACTIONS ---------- */}
      <div className="flex gap-4">
        <button
          onClick={() => setPreviewOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Preview
        </button>

        <button
          onClick={createPack}
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg"
        >
          Create Pack
        </button>

        <button
          onClick={resetAll}
          className="bg-gray-300 px-6 py-2 rounded-lg"
        >
          Reset
        </button>
      </div>

      {/* ---------- PREVIEW ---------- */}
      {previewOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl max-w-xl w-full">
            <h2 className="text-xl font-bold mb-2">{packName}</h2>
            {imagePreview && (
              <img src={imagePreview} className="rounded mb-3" />
            )}
            <p>{description}</p>
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
