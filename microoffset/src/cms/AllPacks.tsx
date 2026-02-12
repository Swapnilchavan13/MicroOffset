import React, { useEffect, useState } from "react";
import axios from "axios";
import { Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmitterPack {
  _id: string;
  pack_name: string;
  description: string;
  image_url: string;
  total_emission_kgco2e?: number;
}

export const AllPacks = () => {
  const [packs, setPacks] = useState<EmitterPack[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const res = await axios.get(
          "https://microoffsets.nettzero.world/api/getemitterpacks"
        );
        setPacks(res.data.data);
      } catch (err) {
        console.error("Failed to fetch packs", err);
      }
    };
    fetchPacks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">All Packs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packs.map((pack) => (
          <div
            key={pack._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {pack.image_url && (
              <img
                src={`https://microoffsets.nettzero.world/api${pack.image_url}`}
                alt={pack.pack_name}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="font-bold text-lg">{pack.pack_name}</h2>
              <p className="text-sm text-gray-500">{pack.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-400">
                  {pack.total_emission_kgco2e?.toFixed(1)} kg CO₂e
                </span>
                <button
                  onClick={() => navigate(`/edit-pack/${pack._id}`)}
                  className="flex items-center gap-1 text-emerald-600 hover:text-emerald-800 text-xs font-medium"
                >
                  <Edit2 size={14} /> Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
