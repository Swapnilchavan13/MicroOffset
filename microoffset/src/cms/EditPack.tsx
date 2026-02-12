import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, Save } from "lucide-react";

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
}

export const EditPack = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [pack, setPack] = useState<EmitterPack | null>(null);
  const [packName, setPackName] = useState("");
  const [description, setDescription] = useState("");
  const [packType, setPackType] = useState("Office / Workplace");
  const [intendedBuyer, setIntendedBuyer] = useState("Company");
  const [duration, setDuration] = useState("Per Month");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch single pack details
  useEffect(() => {
    const fetchPack = async () => {
      try {
        const res = await axios.get(
          `https://microoffsets.nettzero.world/api/getemitterpacks/${id}`
        );
        const data = res.data.data;
        setPack(data);
        setPackName(data.pack_name);
        setDescription(data.description);
        setPackType(data.packType || "Office / Workplace");
        setIntendedBuyer(data.intendedBuyer || "Company");
        setDuration(data.duration || "Per Month");
        setImagePreview(
          data.image
            ? `https://microoffsets.nettzero.world/api${data.image}`
            : null
        );
      } catch (err) {
        console.error("Failed to fetch pack", err);
      }
    };
    fetchPack();
  }, [id]);

  const handleUpdatePack = async () => {
    try {
      const formData = new FormData();
      formData.append("pack_name", packName);
      formData.append("description", description);
      formData.append("packType", packType);
      formData.append("intendedBuyer", intendedBuyer);
      formData.append("duration", duration);

      if (pack?.emitters) formData.append("emitters", JSON.stringify(pack.emitters));
      if (pack?.projects) formData.append("projects", JSON.stringify(pack.projects));

      if (imageFile) formData.append("image", imageFile);

      await axios.put(
        `https://microoffsets.nettzero.world/api/emitterpacks/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Pack updated successfully!");
      navigate("/all-packs");
    } catch (err) {
      console.error(err);
      alert("Failed to update pack");
    }
  };

  if (!pack) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Pack</h1>

      {/* Image Upload */}
      <div className="mb-6">
        <label className="border-2 border-dashed border-gray-300 rounded-2xl w-40 h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 overflow-hidden">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <Upload className="text-gray-400 mb-2" size={20} />
              <span className="text-xs text-gray-500">Upload Image</span>
            </>
          )}
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
      </div>

      {/* Pack Details */}
      <div className="space-y-4">
        <div>
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
            Description
          </label>
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleUpdatePack}
          className="flex items-center gap-2 px-6 py-2 bg-emerald-700 text-white rounded-lg text-sm font-bold hover:bg-emerald-800 transition"
        >
          <Save size={16} /> Update Pack
        </button>
      </div>
    </div>
  );
};
