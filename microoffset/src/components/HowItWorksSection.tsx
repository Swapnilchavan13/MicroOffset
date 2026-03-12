import { ListChecks, Package, Target, BarChart3, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: ListChecks,
    number: "01",
    title: "Choose Emitters",
    description: "Pick from everyday actions (email, ride, meal, purchase). Emitters are pre-measured and tagged.",
  },
  {
    icon: Package,
    number: "02",
    title: "Create a CO₂IN Pack",
    description: "Combine multiple emitters into one pack. See total emissions update live.",
  },
  {
    icon: Target,
    number: "03",
    title: "Match with Climate Projects",
    description: "Your pack funds verified reduction or removal projects around the world.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Track Impact",
    description: "See what you offset and what projects it supports. Real, measurable change.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center  text-gray-600">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-teal-light px-4 py-1.5 text-sm font-medium text-teal">
            Simple Process
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl  text-gray-500">
            How CO₂IN Work
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Four simple steps to real climate impact
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Connection line */}
          <div className="absolute left-8 top-16 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-sage via-teal to-terracotta md:left-1/2 md:block" />

          <div className="grid gap-8 md:gap-0">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`animate-fade-up relative flex flex-col gap-4 md:flex-row md:gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <div
                    className={`group rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-hover ${
                      index % 2 === 0 ? "md:ml-auto md:mr-12" : "md:ml-12 md:mr-auto"
                    } max-w-md`}
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage-light transition-colors group-hover:bg-sage/10">
                        <step.icon className="h-5 w-5 text-sage" />
                      </div>
                      <span className="text-sm font-bold text-sage">{step.number}</span>
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground text-gray-500">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-6 top-6 hidden h-4 w-4 rounded-full border-2 border-sage bg-background md:left-1/2 md:-translate-x-1/2 md:block" />

                {/* Empty space for alignment */}
                <div className="hidden flex-1 md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Pre-created packs option */}
        <div className="animate-fade-up animation-delay-500 mx-auto mt-16 max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-violet/20 bg-gradient-to-br from-violet-light to-sky-light p-8 text-center md:p-10">
            {/* Decorative elements */}
            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-violet/10 blur-3xl" />
            <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-sky/10 blur-3xl" />
            
            <div className="relative">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet/20 backdrop-blur-sm">
                <Sparkles className="h-7 w-7 text-violet" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground md:text-2xl text-gray-500">
                Or Just Choose From Pre-Created Packs
              </h3>
              <p className="mx-auto mb-6 max-w-lg text-muted-foreground">
                Don't want to build your own? We've curated ready-to-use CO₂IN Packs for common activities. Start offsetting in seconds.
              </p>
              <Link to="/emitter-pack">
                <Button variant="outline" className="border-violet/30 hover:bg-violet/10">
                  View Featured Packs
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Visual connector to next section */}
        <div className="mt-12 flex justify-center">
          <ArrowRight className="h-6 w-6 animate-bounce text-sage" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
