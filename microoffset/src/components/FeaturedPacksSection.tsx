import { ArrowRight, Laptop, BookOpen, Video, Tv, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import packOffice from "@/assets/pack-office-digital.jpg";
import packSchool from "@/assets/pack-school-stationery.jpg";
import packMeetings from "@/assets/pack-virtual-meetings.jpg";
import packOtt from "@/assets/pack-ott-apps.jpg";
import packMobile from "@/assets/pack-mobile-usage.jpg";

const featuredPacks = [
  {
    title: "Office Digital Usage",
    description: "Emails, cloud storage, video calls & daily work activities",
    carbonAmount: "2.5 kg",
    period: "per week",
    icon: Laptop,
    image: packOffice,
    color: "emerald",
    badge: "Most Popular",
    brands: ["Microsoft", "Google", "Slack", "Zoom"],
  },
  {
    title: "School Stationery",
    description: "Notebooks, pencils, erasers & educational supplies",
    carbonAmount: "1.2 kg",
    period: "per month",
    icon: BookOpen,
    image: packSchool,
    color: "sky",
    badge: null,
    brands: ["Faber-Castell", "Staedtler", "Camlin"],
  },
  {
    title: "Virtual Meetings",
    description: "Video conferences, screen sharing & remote collaboration",
    carbonAmount: "0.8 kg",
    period: "per meeting",
    icon: Video,
    image: packMeetings,
    color: "violet",
    badge: "New",
    brands: ["Zoom", "Teams", "Google Meet", "Webex"],
  },
  {
    title: "OTT & Streaming",
    description: "Netflix, YouTube, Spotify & entertainment streaming",
    carbonAmount: "3.1 kg",
    period: "per month",
    icon: Tv,
    image: packOtt,
    color: "coral",
    badge: null,
    brands: ["Netflix", "Spotify", "YouTube", "Prime"],
  },
  {
    title: "Mobile Usage",
    description: "Apps, social media, calls & everyday phone activities",
    carbonAmount: "1.8 kg",
    period: "per week",
    icon: Smartphone,
    image: packMobile,
    color: "amber",
    badge: null,
    brands: ["Apple", "Samsung", "Meta", "X"],
  },
];

const colorClasses = {
  emerald: {
    badge: "bg-emerald-light text-emerald",
    icon: "bg-emerald text-white",
    border: "group-hover:border-emerald/40",
  },
  sky: {
    badge: "bg-sky-light text-sky",
    icon: "bg-sky text-white",
    border: "group-hover:border-sky/40",
  },
  violet: {
    badge: "bg-violet-light text-violet",
    icon: "bg-violet text-white",
    border: "group-hover:border-violet/40",
  },
  coral: {
    badge: "bg-coral-light text-coral",
    icon: "bg-coral text-white",
    border: "group-hover:border-coral/40",
  },
  amber: {
    badge: "bg-amber-light text-amber",
    icon: "bg-amber text-white",
    border: "group-hover:border-amber/40",
  },
};

const FeaturedPacksSection = () => {
  return (
    <section id="featured-packs" className="relative bg-muted py-20 md:py-28">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      
      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-light px-4 py-1.5 text-sm font-semibold text-emerald">
            Ready to Use
          </div>
          <h2 className="animate-fade-up animation-delay-100 mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Featured MicroOffset Packs
          </h2>
          <p className="animate-fade-up animation-delay-200 mb-12 text-lg text-muted-foreground">
            Pre-built packs for your everyday activities. Start offsetting in seconds.
          </p>
        </div>

        {/* Packs Grid */}
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPacks.map((pack, index) => {
            const colors = colorClasses[pack.color as keyof typeof colorClasses];
            return (
              <div
                key={pack.title}
                className={`animate-fade-up group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card card-hover ${colors.border}`}
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={pack.image}
                    alt={pack.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  
                  {/* Badge */}
                  {pack.badge && (
                    <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${colors.badge}`}>
                      {pack.badge}
                    </div>
                  )}
                  
                  {/* Icon */}
                  <div className={`absolute -bottom-5 right-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-card ${colors.icon}`}>
                    <pack.icon className="h-6 w-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 pt-8">
                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    {pack.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    {pack.description}
                  </p>

                  {/* Participating Brands */}
                  <div className="mb-4">
                    <span className="mb-2 block text-xs font-medium text-muted-foreground">Participating Brands</span>
                    <div className="flex flex-wrap gap-1.5">
                      {pack.brands.map((brand) => (
                        <span
                          key={brand}
                          className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground"
                        >
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Carbon info */}
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <span className="text-2xl font-bold text-foreground">{pack.carbonAmount}</span>
                      <span className="ml-1 text-sm text-muted-foreground">CO₂ {pack.period}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                      Offset Now
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
          <Button variant="outline" size="lg">
            View All Packs
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPacksSection;
