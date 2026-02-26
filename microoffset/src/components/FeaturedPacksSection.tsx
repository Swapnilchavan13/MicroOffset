import { useEffect, useState } from "react";
import { ArrowRight, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const API_URL = "https://microoffsets.nettzero.world/api/getemitterpacks";
const IMAGE_BASE_URL = "https://microoffsets.nettzero.world/api";

const colorClasses = {
  emerald: {
    badge: "bg-emerald-light text-emerald",
    icon: "bg-emerald text-white",
    border: "group-hover:border-emerald/40",
  },
};

const FeaturedPacksSection = () => {
    const navigate = useNavigate();
  
  const [packs, setPacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPacks = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();

      // ✅ Only show packs where show = true
      const visiblePacks = (json.data || []).filter(
        (pack: any) => pack.show === true
      );

      setPacks(visiblePacks);
    } catch (err) {
      console.error("Failed to fetch packs", err);
    } finally {
      setLoading(false);
    }
  };

  fetchPacks();
}, []);


  if (loading) {
    return (
      <section className="py-20 text-center text-muted-foreground">
        Loading packs...
      </section>
    );
  }

  return (
    <section id="featured-packs" className="relative bg-muted py-20 md:py-28">
       <img
    src="https://iili.io/qfdlNKg.png"
    alt="Logo"
    className="absolute top-6 left-6 w-24 md:w-32 opacity-90"
  />
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Featured MicroOffset Packs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pre-built packs for your everyday activities.
          </p>

          <p className="mt-4 text-sm text-muted-foreground">
            We have researched extensively the most common “groups of emissions” - across individuals, professionals, schools, travellers - and built these tailored packs that can be selected to just offset regular activities with ease and accuracy. Select the ones you want to offset, so that you start your individual offsetting journey - one pack at a time.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packs.map((pack, index) => {
            const colors = colorClasses.emerald;

            // Extract unique categories as "brands"
            const brands = [
              ...new Set(pack.emitters?.map((e: any) => e.category)),
            ];

            return (
              <div
                key={pack._id}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card ${colors.border}`}
              >
                {/* Image */}
              {/* Image */}
<div className="relative h-44 overflow-hidden">
  <img
    src={`${IMAGE_BASE_URL}${pack.image_url}`}
    alt={pack.pack_name}
    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
  />

  {/* Project Name Bottom Center */}
  <div className="absolute bottom-2 left-0 w-full text-center">
    <span className="inline-block rounded-md bg-black/50 px-3 py-1 text-sm font-semibold text-white">
      {pack.pack_name}
    </span>
  </div>
</div>
                {/* Content */}
                <div className="p-5 pt-8">
                  {/* <h3 className="mb-2 text-lg font-bold text-gray-600">
                    {pack.pack_name}
                  </h3> */}

                  <p className="mb-4 text-sm text-muted-foreground line-clamp-3 text-gray-600">
                    {pack.description}
                  </p>

                  {/* Categories */}
                  <div className="mb-4">
                    <span className="mb-2 block text-xs font-medium text-muted-foreground">
                      Categories
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {brands.map((brand: string) => (
                        <span
                          key={brand}
                          className="rounded-md bg-muted px-2 py-1 text-xs font-medium"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>

                 {/* Carbon info */}
<div className="flex items-center justify-between border-t border-border pt-4">
  <div>
    <span className="text-2xl font-bold text-gray-600">
      {pack.total_emission_kgco2e.toFixed(2)}
    </span>
    <span className="ml-1 text-sm text-muted-foreground">
      kg CO₂e
    </span>

    {/* Offset Price */}
    <div className="mt-1 text-sm text-muted-foreground">
      Offset price:
      <span className="ml-1 font-semibold text-foreground text-gray-600">
        ₹ {pack.total_pack_price.toFixed(2)}
      </span>
    </div>
  </div>

  <Button
    variant="ghost"
    size="sm"
    onClick={() => navigate(`/emitter-pack/${pack._id}`)}
  >
    View Pack Details
    <ArrowRight className="h-4 w-4 ml-1" />
  </Button>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPacksSection;