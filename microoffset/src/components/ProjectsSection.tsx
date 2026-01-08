import { Sprout, Zap, Recycle, TreePine, ShieldCheck } from "lucide-react";

const projectTypes = [
  {
    icon: Sprout,
    title: "Biochar & Soil Carbon",
    description: "Long-term carbon storage in soil",
  },
  {
    icon: Zap,
    title: "Clean Energy & Efficiency",
    description: "Renewable energy and reduced consumption",
  },
  {
    icon: Recycle,
    title: "Waste & Circular Economy",
    description: "Reducing emissions from waste streams",
  },
  {
    icon: TreePine,
    title: "Nature-Based Solutions",
    description: "Forests, wetlands, and ecosystems",
  },
];

const trustCues = [
  "Measured using verified emission factors",
  "Projects audited and transparently tracked",
  "No vague claims. No greenwashing.",
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-terracotta-light px-4 py-1.5 text-sm font-medium text-terracotta">
            Real Impact
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Where Your Offset Goes
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Every MicroOffset Pack supports real, on-ground climate projects.
          </p>
        </div>

        {/* Project Types Grid */}
        <div className="mx-auto mb-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projectTypes.map((project, index) => (
            <div
              key={project.title}
              className="animate-fade-up group flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-all duration-300 hover:shadow-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-light transition-colors group-hover:bg-sage/10">
                <project.icon className="h-7 w-7 text-sage" />
              </div>
              <h3 className="mb-2 text-base font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-sage/20 bg-sage-light/30 p-8">
          <div className="mb-6 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage">
              <ShieldCheck className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <h3 className="mb-6 text-center text-xl font-semibold text-foreground">
            Built on Trust & Transparency
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {trustCues.map((cue, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-xl bg-background p-4 shadow-card"
              >
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sage">
                  <span className="text-xs font-bold text-primary-foreground">✓</span>
                </div>
                <p className="text-sm font-medium text-foreground">{cue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
