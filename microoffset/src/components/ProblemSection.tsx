import { AlertCircle, HelpCircle, Sparkles, DollarSign, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import problemAnalysis from "@/assets/problem-analysis.jpg";

const problems = [
  {
    icon: AlertCircle,
    title: "Too Small to Track",
    description: "Most emissions are too small to act on individually. Sending an email, streaming a video — they seem insignificant alone.",
    color: "coral",
  },
  {
    icon: DollarSign,
    title: "Too Expensive in Tons",
    description: "Traditional carbon offsets are sold by the ton — far too large and expensive for individual everyday actions.",
    color: "amber",
  },
  {
    icon: HelpCircle,
    title: "Complex & Distant",
    description: "Carbon offsetting feels complicated and disconnected. Where does your money go? Does it actually help?",
    color: "violet",
  },
  {
    icon: Sparkles,
    title: "Where to Start?",
    description: "People want to help — but don't know where to start. The climate crisis feels overwhelming and personal action unclear.",
    color: "sky",
  },
];

const colorClasses = {
  coral: "bg-coral-light text-coral group-hover:bg-coral group-hover:text-white",
  amber: "bg-amber-light text-amber group-hover:bg-amber group-hover:text-white",
  violet: "bg-violet-light text-violet group-hover:bg-violet group-hover:text-white",
  sky: "bg-sky-light text-sky group-hover:bg-sky group-hover:text-white",
};

const ProblemSection = () => {
  return (
    <section className="relative bg-background py-20 md:py-28 text-gray-600">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Image */}
          <div className="animate-fade-up relative hidden lg:block">
            <div className="sticky top-24">
              <div className="relative overflow-hidden rounded-3xl shadow-hover">
                <img
                  src={problemAnalysis}
                  alt="Climate data analysis"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-lg font-semibold text-white">
                    Understanding the gap in climate action
                  </p>
                  <p className="text-sm text-white/80">
                    Data-driven insights for real impact
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <div className="mb-12">
              <div className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full bg-coral-light px-4 py-1.5 text-sm font-semibold text-coral">
                The Challenge
              </div>
              <h2 className="animate-fade-up animation-delay-100 mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-gray-500">
                The Gap in Climate Action
              </h2>
              <p className="animate-fade-up animation-delay-200 text-lg text-muted-foreground">
                Current approaches leave everyday emissions unaddressed
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {problems.map((problem, index) => (
                <div
                  key={problem.title}
                  className="animate-fade-up group rounded-2xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-hover"
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${colorClasses[problem.color as keyof typeof colorClasses]}`}>
                    <problem.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground text-gray-500">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
                </div>
              ))}
            </div>

            {/* Solution teaser */}
            <div className="animate-fade-up animation-delay-600 mt-8">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald to-sky p-6 md:p-8">
                {/* Decorative elements */}
                <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
                <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
                
                <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="mb-1 text-xl font-bold text-white">
                      CO₂IN Solves This
                    </h3>
                    <p className="text-sm text-white/90">
                      Making small emissions <strong>visible</strong>, <strong>combinable</strong>, and <strong>actionable</strong>.
                    </p>
                  </div>
                <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="glass"
          className="shrink-0 border-white/30 text-white hover:bg-white/20 flex items-center gap-2"
        >
          Read the Theory
          <ArrowRight className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>The Theory</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 text-sm text-muted-foreground">
          <section>
            <h3 className="text-base font-semibold text-foreground">
              Small Actions Add Up
            </h3>
            <p>
              Everyday digital actions create real emissions — even if they feel
              invisible on their own.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-foreground">
              Why Climate Action Feels Hard
            </h3>
            <p>
              Most solutions are built for tons, budgets, and businesses — not
              people. That distance slows action.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-foreground">
              A Smaller Unit of Impact
            </h3>
            <p>
              CO₂IN breaks emissions into human-sized pieces that match
              daily behavior.
            </p>
          </section>

          <section>
            <h3 className="text-base font-semibold text-foreground">
              Simple. Cumulative. Real.
            </h3>
            <p>
              Small contributions stack over time, turning intent into measurable
              climate progress.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
