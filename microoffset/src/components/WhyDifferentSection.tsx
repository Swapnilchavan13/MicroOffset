import { Layers, PackageCheck, Eye, Sparkles } from "lucide-react";
import whyDifferentVisual from "@/assets/why-different-visual.jpg";

const differentiators = [
  {
    icon: Layers,
    text: "Built for micro-actions, not just large emitters",
  },
  {
    icon: PackageCheck,
    text: "Pack-based, not transaction-based",
  },
  {
    icon: Eye,
    text: "Transparent math, visible impact",
  },
  {
    icon: Sparkles,
    text: "Designed for participation, not compliance",
  },
];

const WhyDifferentSection = () => {
  return (
    <section id="why-different" className="relative bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left content */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sage-light px-4 py-1.5 text-sm font-medium text-sage">
                Our Approach
              </div>
              <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
                Why MicroOffsets Is Different
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                We've rethought carbon offsetting from the ground up, making it accessible, actionable, and transparent for everyone.
              </p>

              <div className="space-y-4">
                {differentiators.map((item, index) => (
                  <div
                    key={index}
                    className="animate-fade-up flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card transition-all duration-300 hover:shadow-hover"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-sage-light">
                      <item.icon className="h-5 w-5 text-sage" />
                    </div>
                    <p className="font-medium text-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Image */}
            <div className="animate-fade-up flex items-center justify-center">
              <div className="relative">
                {/* Decorative circles */}
                <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full border-2 border-dashed border-sage/20" />
                <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full border-2 border-dashed border-teal/20" />

                {/* Main image */}
                <div className="relative z-10 overflow-hidden rounded-3xl shadow-hover">
                  <img
                    src={whyDifferentVisual}
                    alt="Innovation in sustainability"
                    className="h-80 w-full object-cover lg:h-96"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <h3 className="mb-2 text-xl font-bold text-white">
                      From Complexity to Clarity
                    </h3>
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                      <Sparkles className="h-4 w-4" />
                      Simple by design
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDifferentSection;
