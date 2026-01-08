import { MapPin, Tag, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import cdrBiochar from "@/assets/cdr-biochar.jpg";
import cdrErw from "@/assets/cdr-erw.jpg";
import cdrBeccs from "@/assets/cdr-beccs.jpg";
import cdrAfforestation from "@/assets/cdr-afforestation.jpg";
import cdrDac from "@/assets/cdr-dac.jpg";
import cdrOcean from "@/assets/cdr-ocean.jpg";

const cdrProjects = [
  {
    id: "CDR-2024-BC001",
    title: "Sustainable Biochar Karnataka",
    type: "Biochar",
    description: "Converting agricultural waste into long-term carbon storage through pyrolysis, enriching soil health while sequestering CO₂ for centuries.",
    location: "Karnataka, India",
    pricePerKg: "$0.045",
    image: cdrBiochar,
    microOffsetsAvailable: 12500,
    microOffsetsRetired: 8340,
    sdgs: [13, 15, 12],
    color: "amber",
  },
  {
    id: "CDR-2024-ERW02",
    title: "Enhanced Rock Weathering Midwest",
    type: "ERW",
    description: "Spreading silicate minerals on farmland to accelerate natural weathering, capturing CO₂ while improving crop yields.",
    location: "Iowa, USA",
    pricePerKg: "$0.062",
    image: cdrErw,
    microOffsetsAvailable: 8200,
    microOffsetsRetired: 5100,
    sdgs: [13, 2, 15],
    color: "emerald",
  },
  {
    id: "CDR-2024-BECCS3",
    title: "Biomass Carbon Capture Sweden",
    type: "BECCS",
    description: "Bioenergy with carbon capture and storage, producing clean energy while permanently storing captured CO₂ underground.",
    location: "Gothenburg, Sweden",
    pricePerKg: "$0.089",
    image: cdrBeccs,
    microOffsetsAvailable: 6800,
    microOffsetsRetired: 4200,
    sdgs: [13, 7, 9],
    color: "sky",
  },
  {
    id: "CDR-2024-AF004",
    title: "Community Reforestation Kenya",
    type: "Afforestation",
    description: "Planting native tree species with local communities, creating carbon sinks while restoring biodiversity and livelihoods.",
    location: "Kakamega, Kenya",
    pricePerKg: "$0.028",
    image: cdrAfforestation,
    microOffsetsAvailable: 25000,
    microOffsetsRetired: 18750,
    sdgs: [13, 15, 1, 8],
    color: "emerald",
  },
  {
    id: "CDR-2024-DAC05",
    title: "Direct Air Capture Iceland",
    type: "DAC",
    description: "Capturing CO₂ directly from ambient air using innovative technology, then mineralizing it in basalt rock formations.",
    location: "Hellisheidi, Iceland",
    pricePerKg: "$0.142",
    image: cdrDac,
    microOffsetsAvailable: 3500,
    microOffsetsRetired: 2100,
    sdgs: [13, 9, 17],
    color: "violet",
  },
  {
    id: "CDR-2024-OAE06",
    title: "Ocean Alkalinity Enhancement",
    type: "OAE",
    description: "Adding minerals to ocean water to enhance its natural carbon absorption capacity while counteracting acidification.",
    location: "Cornwall, UK",
    pricePerKg: "$0.055",
    image: cdrOcean,
    microOffsetsAvailable: 9200,
    microOffsetsRetired: 3800,
    sdgs: [13, 14, 17],
    color: "sky",
  },
];

const colorClasses = {
  emerald: {
    badge: "bg-emerald text-white",
    border: "group-hover:border-emerald/40",
  },
  sky: {
    badge: "bg-sky text-white",
    border: "group-hover:border-sky/40",
  },
  violet: {
    badge: "bg-violet text-white",
    border: "group-hover:border-violet/40",
  },
  amber: {
    badge: "bg-amber text-white",
    border: "group-hover:border-amber/40",
  },
};

const sdgColors: { [key: number]: string } = {
  1: "bg-red-500",
  2: "bg-amber-600",
  7: "bg-yellow-500",
  8: "bg-rose-600",
  9: "bg-orange-500",
  12: "bg-amber-700",
  13: "bg-emerald-600",
  14: "bg-sky-600",
  15: "bg-green-600",
  17: "bg-indigo-600",
};

const CDRProjectsSection = () => {
  return (
    <section id="cdr-projects" className="relative bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-light px-4 py-1.5 text-sm font-semibold text-emerald">
            <Leaf className="h-4 w-4" />
            Carbon Removal
          </div>
          <h2 className="animate-fade-up animation-delay-100 mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            What Offsets Your Emissions
          </h2>
          <p className="animate-fade-up animation-delay-200 mb-6 text-lg text-muted-foreground">
            We hand-pick Carbon Dioxide Removal projects of the highest integrity. Your micro-offset money goes directly to these projects, helping them scale real CDR solutions.
          </p>
        </div>

        {/* CDR Projects Grid */}
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cdrProjects.map((project, index) => {
            const colors = colorClasses[project.color as keyof typeof colorClasses];
            const retiredPercent = Math.round((project.microOffsetsRetired / project.microOffsetsAvailable) * 100);
            
            return (
              <div
                key={project.id}
                className={`animate-fade-up group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card card-hover ${colors.border}`}
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  
                  {/* CDR Type Badge */}
                  <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${colors.badge}`}>
                    {project.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <Tag className="h-3 w-3" />
                    {project.id}
                  </div>
                  
                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    {project.title}
                  </h3>
                  
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  
                  <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-emerald" />
                    {project.location}
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">MicroOffsets Retired</span>
                      <span className="font-semibold text-foreground">{retiredPercent}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-emerald to-sky transition-all duration-500"
                        style={{ width: `${retiredPercent}%` }}
                      />
                    </div>
                    <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{project.microOffsetsRetired.toLocaleString()} retired</span>
                      <span>{project.microOffsetsAvailable.toLocaleString()} available</span>
                    </div>
                  </div>

                  {/* SDGs */}
                  <div className="mb-4 flex items-center gap-1">
                    <span className="mr-2 text-xs text-muted-foreground">SDGs:</span>
                    {project.sdgs.map((sdg) => (
                      <div
                        key={sdg}
                        className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold text-white ${sdgColors[sdg] || 'bg-gray-500'}`}
                      >
                        {sdg}
                      </div>
                    ))}
                  </div>
                  
                  {/* Price and CTA */}
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <span className="text-xl font-bold text-foreground">{project.pricePerKg}</span>
                      <span className="ml-1 text-sm text-muted-foreground">per kg CO₂</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-emerald hover:text-emerald">
                      Support
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="animate-fade-up animation-delay-600 mt-12 text-center">
          <Button variant="cta" size="lg">
            View All CDR Projects
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CDRProjectsSection;
