import { ShieldCheck, Database, Brain, Globe, FileCheck, Award } from "lucide-react";

const sources = [
  {
    name: "GHG Protocol",
    description: "The world's most widely used greenhouse gas accounting standards",
    icon: Globe,
  },
  {
    name: "DEFRA",
    description: "UK Department for Environment, Food & Rural Affairs emission factors",
    icon: FileCheck,
  },
  {
    name: "IPCC",
    description: "Intergovernmental Panel on Climate Change guidelines",
    icon: Award,
  },
  {
    name: "EPA",
    description: "US Environmental Protection Agency emission factors",
    icon: ShieldCheck,
  },
];

const MeasurementSection = () => {
  return (
    <section className="relative overflow-hidden bg-dark py-20 md:py-28 text-gray-600">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-1/2 bg-gradient-to-r from-emerald/5 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-sky/5 to-transparent" />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-4 py-1.5 text-sm font-semibold text-emerald">
            <ShieldCheck className="h-4 w-4" />
            Science-Backed
          </div>
          <h2 className="animate-fade-up animation-delay-100 mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            How We Accurately Measure Your Packs
          </h2>
          <p className="animate-fade-up animation-delay-200 mb-16 text-lg text-white/70">
            Every CO₂IN is calculated using globally validated emission factors from the world's most trusted sources.
          </p>
        </div>

        {/* Main content grid */}
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {/* Left - Sources grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {sources.map((source, index) => (
              <div
                key={source.name}
                className="animate-fade-up group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-emerald/30 hover:bg-white/10"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/20 text-emerald transition-colors group-hover:bg-emerald group-hover:text-white">
                  <source.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{source.name}</h3>
                <p className="text-sm text-white/60">{source.description}</p>
              </div>
            ))}
          </div>

          {/* Right - AI Validation */}
          <div className="animate-fade-up animation-delay-400 flex flex-col justify-center">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm md:p-10">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky to-emerald">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white md:text-2xl">AI-Validated Research</h3>
                  <p className="text-white/60">Continuously updated & verified</p>
                </div>
              </div>
              
              <p className="mb-6 text-white/80 leading-relaxed">
                Beyond official emission factors, we leverage extensive <strong className="text-white">secondary research</strong> validated by advanced AI systems. This ensures our pack values remain credible, reliable, and up-to-date with the latest scientific findings.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald/20">
                    <Database className="h-3.5 w-3.5 text-emerald" />
                  </div>
                  <p className="text-sm text-white/70">
                    <strong className="text-white">Comprehensive data fusion</strong> — combining multiple research sources for accuracy
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald/20">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald" />
                  </div>
                  <p className="text-sm text-white/70">
                    <strong className="text-white">Cross-validation</strong> — every factor checked against multiple authoritative sources
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald/20">
                    <Globe className="h-3.5 w-3.5 text-emerald" />
                  </div>
                  <p className="text-sm text-white/70">
                    <strong className="text-white">Regional accuracy</strong> — localized factors where global averages fall short
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom trust badges */}
        <div className="animate-fade-up animation-delay-600 mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-4 text-center">
          <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/70">
            ✓ Globally recognized standards
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/70">
            ✓ Regularly updated factors
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/70">
            ✓ Transparent methodology
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeasurementSection;