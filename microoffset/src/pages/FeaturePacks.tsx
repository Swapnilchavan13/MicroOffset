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
  total_emission_kgco2e: number;
  total_pack_price: number;
  currency: string;
  emitters?: Emitter[];
}

export const FeaturePacks: React.FC = () => {
  const [packs, setPacks] = useState<EmitterPack[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minEmission, setMinEmission] = useState("");
  const [maxEmission, setMaxEmission] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const navigate = useNavigate();
  const IMAGE_BASE_URL = "https://microoffsets.nettzero.world/api";

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

  // Unique categories
  const categories = useMemo(() => {
    return Array.from(
      new Set(packs.flatMap((pack) => pack.emitters?.map((e) => e.category) || []))
    );
  }, [packs]);

  // Unique subcategories (filtered by category)
  const subCategories = useMemo(() => {
    return Array.from(
      new Set(
        packs
          .filter(
            (pack) =>
              !selectedCategory ||
              pack.emitters?.some((e) => e.category === selectedCategory)
          )
          .flatMap((pack) => pack.emitters?.map((e) => e.sub_category) || [])
      )
    );
  }, [packs, selectedCategory]);

  // Filter logic
  const filteredPacks = useMemo(() => {
    return packs.filter((pack) => {
      const priceMatch =
        (!minPrice || pack.total_pack_price >= Number(minPrice)) &&
        (!maxPrice || pack.total_pack_price <= Number(maxPrice));

      const emissionMatch =
        (!minEmission || pack.total_emission_kgco2e >= Number(minEmission)) &&
        (!maxEmission || pack.total_emission_kgco2e <= Number(maxEmission));

      const categoryMatch =
        !selectedCategory ||
        pack.emitters?.some((e) => e.category === selectedCategory);

      const subCategoryMatch =
        !selectedSubCategory ||
        pack.emitters?.some((e) => e.sub_category === selectedSubCategory);

      return priceMatch && emissionMatch && categoryMatch && subCategoryMatch;
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
        <p className="text-muted-foreground">Loading packs...</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <Header />

      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-600">
        Featured Carbon Offset Packs
      </h2>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-border mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubCategory("");
          }}
          className="border border-border rounded-lg px-3 py-2 text-gray-600"
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
          onChange={(e) => setSelectedSubCategory(e.target.value)}
          className="border border-border rounded-lg px-3 py-2 text-gray-600"
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
          className="border border-border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border border-border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          placeholder="Min Emission (kg CO₂e)"
          value={minEmission}
          onChange={(e) => setMinEmission(e.target.value)}
          className="border border-border rounded-lg px-3 py-2"
        />

        <input
          type="number"
          placeholder="Max Emission (kg CO₂e)"
          value={maxEmission}
          onChange={(e) => setMaxEmission(e.target.value)}
          className="border border-border rounded-lg px-3 py-2"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPacks.map((pack) => (
          <div
            key={pack._id}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card"
          >
            {/* Image with hover + white fade (same as Featured) */}
            <div className="group relative overflow-hidden rounded-2xl bg-card shadow-card">
              <img
                src={`${IMAGE_BASE_URL}${pack.image_url}`}
                alt={pack.pack_name}
                className="h-48 w-full object-cover scale-150 transition-transform duration-500 group-hover:scale-155"
              />

              {/* White Fade Bottom */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="mb-2 text-lg font-bold text-gray-600">
                {pack.pack_name}
              </h3>

              <p className="text-sm text-muted-foreground line-clamp-3 text-gray-600">
                {pack.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between border-t border-border mt-4 pt-4">
                <div>
                  <span className="text-sm text-muted-foreground">
                    {pack.total_emission_kgco2e.toFixed(2)} kg CO₂e
                  </span>
                  <div className="text-xs text-muted-foreground mt-1">
                    Price: <span className="font-semibold text-gray-600">
                      {pack.currency} {pack.total_pack_price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/emitter-pack/${pack._id}`)}
                  className="text-sm text-gray-600 hover:underline"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredPacks.length === 0 && (
        <p className="text-center text-muted-foreground mt-10">
          No packs match your filters 🌱
        </p>
      )}
    </div>

    
  );
  
};