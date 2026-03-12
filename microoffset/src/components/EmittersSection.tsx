import emittersVisual from "@/assets/emitters-visual.jpg";

const tagGroups = [
  { label: "Home Digital", color: "bg-sage-light text-sage" },
  { label: "Office Digital", color: "bg-teal-light text-teal" },
  { label: "Personal Mobility", color: "bg-terracotta-light text-terracotta" },
  { label: "Food & Diet", color: "bg-emerald-light text-emerald" },
  { label: "Purchases", color: "bg-sky-light text-sky" },
  { label: "Travel", color: "bg-coral-light text-coral" },
  { label: "Energy Use", color: "bg-amber-light text-amber" },
];

const EmittersSection = () => {
  return (
    <section className="relative bg-warm-white py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div className="flex flex-col justify-center">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-sage-light px-4 py-1.5 text-sm font-medium text-sage text-gray-500">
              Emitters & Tags
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-gray-500">
              What Are "Emitters" & "Tags"?
            </h2>
            <p className="mb-6 text-lg text-muted-foreground">
              <strong>Emitters</strong> are everyday actions that create emissions.
            </p>
            <p className="mb-8 text-lg text-muted-foreground">
              <strong>Tags</strong> help organise them by context and purpose, keeping CO₂IN powerful without being complicated.
            </p>

            <div className="rounded-2xl border border-sage/20 bg-sage-light/50 p-6">
              <p className="text-sm font-medium text-gray-500">
                ✓ Pre-measured emission values
              </p>
              <p className="mt-2 text-sm font-medium text-gray-500">
                ✓ Context-aware organization
              </p>
              <p className="mt-2 text-sm font-medium text-gray-500">
                ✓ Easy to understand & select
              </p>
            </div>

            {/* Tag cloud */}
            <div className="mt-8 flex flex-wrap gap-3">
              {tagGroups.map((tag, index) => (
                <div
                  key={tag.label}
                  className={`animate-fade-up ${tag.color} cursor-default rounded-full px-5 py-2.5 text-sm font-medium shadow-card transition-all duration-300 hover:scale-105 hover:shadow-hover`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tag.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image visualization */}
          <div className="flex items-center justify-center">
            <div className="animate-fade-up relative w-full max-w-md">
              <div className="relative overflow-hidden rounded-3xl shadow-hover">
                <img
                  src={emittersVisual}
                  alt="Digital tagging system for emissions"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-sage/10 blur-2xl" />
              <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-teal/10 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmittersSection;
