import { useEffect, useState } from "react";
import { MapPin, Tag, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import cdrBiochar from "@/assets/cdr-biochar.jpg";

interface Project {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  location: string;
  status: string;
  retired: number;
  available: number;
  pricePerKgCO2: number;
  currency: string;
  image?: string;
}

const fallbackImage = cdrBiochar;

const CDRProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://microoffsets.nettzero.world/api/projects")
      .then((res) => res.json())
      .then((res) => {
        setProjects(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 text-center text-muted-foreground">
        Loading projects…
      </section>
    );
  }

  return (
    <section id="cdr-projects" className="relative bg-background py-20 md:py-28 text-gray-600">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-light px-4 py-1.5 text-sm font-semibold text-emerald">
            <Leaf className="h-4 w-4" />
            Carbon Removal
          </div>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            What Offsets Your Emissions
          </h2>

          <p className="mb-6 text-lg text-muted-foreground">
            We hand-pick Carbon Dioxide Removal projects of the highest integrity.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const total = project.available;

            const retiredPercent =
              total > 0
                ? Math.round((project.retired / total) * 100)
                : 0;

            return (
              <div
                key={project._id}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card card-hover text-gray-600"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || fallbackImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                  {/* Status Badge */}
                  <div className="absolute left-4 top-4 rounded-full bg-emerald px-3 py-1 text-xs font-bold text-gray-600">
                    {project.status}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Project ID */}
                  <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Tag className="h-3 w-3" />
                    {project.projectId}
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-lg font-bold text-foreground text-gray-500">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Location */}
                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-emerald" />
                    {project.location}
                  </div>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        COIN Retired
                      </span>
                      <span className="font-semibold text-foreground">
                        {retiredPercent}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald to-sky transition-all duration-500"
                        style={{ width: `${retiredPercent}%` }}
                      />
                    </div>

                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>{project.retired.toLocaleString()} retired</span>
                      <span>{project.available.toLocaleString()} available</span>
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <span className="text-xl font-bold text-foreground text-gray-600">
                        ₹{project.pricePerKgCO2}
                      </span>
                      <span className="ml-1 text-sm text-muted-foreground">
                        per kg CO₂
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-emerald hover:text-emerald"
                    >
                      Project Details
                      <ArrowRight className="h-4 w-4" />
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

export default CDRProjectsSection;
