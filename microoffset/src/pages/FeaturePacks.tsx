import Header from "@/components/Header";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

interface Emitter {
  category: string;
  sub_category: string;
}

interface EmitterPack {
  _id: string;
  pack_name: string;
  description: string;
  image_url: string;
  packType: string;
  intendedBuyer: string;
  duration: string;
  total_emission_kgco2e: number;
  total_pack_price: number;
  currency: string;
  status: string;
  emitters?: Emitter[];
}

export const FeaturePacks: React.FC = () => {
  const [packs, setPacks] = useState<EmitterPack[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔎 Filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minEmission, setMinEmission] = useState("");
  const [maxEmission, setMaxEmission] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://microoffsets.nettzero.world/api/getemitterpacks")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPacks(data.data);
        }
      })
      .catch((err) => console.error("API Error:", err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ Unique Categories
  const categories = useMemo(() => {
    return Array.from(
      new Set(
        packs.flatMap((pack) =>
          pack.emitters?.map((e) => e.category) || []
        )
      )
    );
  }, [packs]);

  // ✅ Unique SubCategories (filtered by selectedCategory)
  const subCategories = useMemo(() => {
    return Array.from(
      new Set(
        packs
          .filter(
            (pack) =>
              !selectedCategory ||
              pack.emitters?.some(
                (e) => e.category === selectedCategory
              )
          )
          .flatMap((pack) =>
            pack.emitters?.map((e) => e.sub_category) || []
          )
      )
    );
  }, [packs, selectedCategory]);

  // ✅ Filter Logic
  const filteredPacks = useMemo(() => {
    return packs.filter((pack) => {
      const priceMatch =
        (!minPrice || pack.total_pack_price >= Number(minPrice)) &&
        (!maxPrice || pack.total_pack_price <= Number(maxPrice));

      const emissionMatch =
        (!minEmission ||
          pack.total_emission_kgco2e >= Number(minEmission)) &&
        (!maxEmission ||
          pack.total_emission_kgco2e <= Number(maxEmission));

      const categoryMatch =
        !selectedCategory ||
        pack.emitters?.some(
          (e) => e.category === selectedCategory
        );

      const subCategoryMatch =
        !selectedSubCategory ||
        pack.emitters?.some(
          (e) => e.sub_category === selectedSubCategory
        );

      return (
        priceMatch &&
        emissionMatch &&
        categoryMatch &&
        subCategoryMatch
      );
    });
  }, [
    packs,
    minPrice,
    maxPrice,
    minEmission,
    maxEmission,
    selectedCategory,
    selectedSubCategory,
  ]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading packs...</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <Header />
      <h2 className="text-3xl font-semibold mb-6 text-center">
        🌱 Featured Carbon Offset Packs
      </h2>

      {/* 🔍 Filters */}
      <div className="bg-white p-4 rounded-xl shadow mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubCategory("");
          }}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={selectedSubCategory}
          onChange={(e) =>
            setSelectedSubCategory(e.target.value)
          }
          className="border rounded-lg px-3 py-2"
        >
          <option value="">All Subcategories</option>
          {subCategories.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          placeholder="Min Emission (kg CO₂e)"
          value={minEmission}
          onChange={(e) =>
            setMinEmission(e.target.value)
          }
          className="border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          placeholder="Max Emission (kg CO₂e)"
          value={maxEmission}
          onChange={(e) =>
            setMaxEmission(e.target.value)
          }
          className="border rounded-lg px-3 py-2"
        />
      </div>

      {/* 🧩 Packs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPacks.map((pack) => (
          <div
            key={pack._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
          >
            <div className="h-48 bg-gray-100 overflow-hidden">
              <img
                src={`https://microoffsets.nettzero.world/api${pack.image_url}`}
                alt={pack.pack_name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5 space-y-3">
              <h3 className="text-xl font-semibold">
                {pack.pack_name}
              </h3>

              <p className="text-sm text-gray-500">
                {pack.description}
              </p>

              <div className="border-t pt-3 text-sm">
                <p>
                  🌍 <strong>Emissions:</strong>{" "}
                  {pack.total_emission_kgco2e.toFixed(2)} kg CO₂e
                </p>
                <p>
                  💰 <strong>Price:</strong>{" "}
                  {pack.currency}{" "}
                  {pack.total_pack_price.toFixed(2)}
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/emitter-pack/${pack._id}`)
                }
                className="w-full mt-4 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPacks.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No packs match your filters 🌱
        </p>
      )}
    </div>
  );
};