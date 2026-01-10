import { useEffect, useState } from "react";
import { ArrowRight, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = "http://62.72.59.146:5000/getemitterpacks";
const IMAGE_BASE_URL = "http://62.72.59.146:5000";

const colorClasses = {
  emerald: {
    badge: "bg-emerald-light text-emerald",
    icon: "bg-emerald text-white",
    border: "group-hover:border-emerald/40",
  },
};

const FeaturedPacksSection = () => {
  const [packs, setPacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        setPacks(json.data || []);
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
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            Featured MicroOffset Packs
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pre-built packs for your everyday activities.
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
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={`${IMAGE_BASE_URL}${pack.image_url}`}
                    alt={pack.pack_name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {pack.status === "draft" && (
                    <div
                      className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${colors.badge}`}
                    >
                      Draft
                    </div>
                  )}

                  <div
                    className={`absolute -bottom-5 right-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-card ${colors.icon}`}
                  >
                    <Laptop className="h-6 w-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 pt-8">
                  <h3 className="mb-2 text-lg font-bold">
                    {pack.pack_name}
                  </h3>

                  <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
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
                      <span className="text-2xl font-bold">
                        {pack.total_emission_kgco2e.toFixed(2)}
                      </span>
                      <span className="ml-1 text-sm text-muted-foreground">
                        kg CO₂e
                      </span>
                    </div>

                    <Button variant="ghost" size="sm">
                      Offset Now
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