import { User, Users, Building2, Heart } from "lucide-react";
import audienceCommunity from "@/assets/audience-community.jpg";

const audiences = [
  {
    icon: User,
    title: "Individuals",
    description: "Offset your daily life emissions with ease",
    context: "Daily life",
  },
  {
    icon: Users,
    title: "Teams & Startups",
    description: "Build climate action into your culture from day one",
    context: "Early-stage teams",
  },
  {
    icon: Building2,
    title: "SMEs & Brands",
    description: "Show customers you care with transparent offsetting",
    context: "Growing businesses",
  },
  {
    icon: Heart,
    title: "Communities & Campaigns",
    description: "Unite groups around shared climate goals",
    context: "Collective action",
  },
];

const AudienceSection = () => {
  return (
    <section id="audience" className="relative bg-stone py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Content */}
          <div>
            <div className="mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-light px-4 py-1.5 text-sm font-medium text-teal">
                For Everyone
              </div>
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Who It's For
              </h2>
              <p className="text-lg text-muted-foreground">
                MicroOffsets scales from personal use to organizational impact
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {audiences.map((audience, index) => (
                <div
                  key={audience.title}
                  className="animate-fade-up group flex flex-col rounded-2xl border border-border bg-background p-5 shadow-card transition-all duration-300 hover:shadow-hover"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-light transition-colors group-hover:bg-teal/10">
                    <audience.icon className="h-6 w-6 text-teal" />
                  </div>
                  <span className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {audience.context}
                  </span>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {audience.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{audience.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="animate-fade-up relative hidden lg:flex lg:items-center">
            <div className="relative overflow-hidden rounded-3xl shadow-hover">
              <img
                src={audienceCommunity}
                alt="Community using MicroOffsets"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-lg font-semibold text-white">
                  Join thousands taking climate action
                </p>
                <p className="text-sm text-white/80">
                  From individuals to enterprises
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full border-2 border-dashed border-teal/20" />
            <div className="absolute -bottom-6 -left-6 h-40 w-40 rounded-full border-2 border-dashed border-sage/20" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
