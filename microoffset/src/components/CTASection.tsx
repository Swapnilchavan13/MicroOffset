import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import natureForest from "@/assets/nature-forest.jpg";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={natureForest}
          alt="Sunlit forest canopy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-dark/95 via-emerald-dark/90 to-primary/80" />
      </div>

      <div className="container relative mx-auto px-4 text-center md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="animate-fade-up mb-6 inline-flex items-center justify-center">
            <div className="flex h-20 w-60 items-center justify-center rounded-3xl bg-white">
              {/* <Leaf className="h-10 w-10 text-white" /> */}
               <img
        src="https://iili.io/qqSzgpf.png"
        alt="Logo"
      />
            </div>
          </div>

          <h2 className="animate-fade-up animation-delay-100 mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Climate action doesn't need to be big to be real.
          </h2>

          <p className="animate-fade-up animation-delay-200 mb-10 text-lg text-white/80 md:text-xl">
            Start small. Make it count. Join thousands taking meaningful climate action every day.
          </p>

          <div className="animate-fade-up animation-delay-300 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="xl"
              className="bg-white text-primary shadow-hover hover:bg-white/90 hover:shadow-lg"
               onClick={() => {
    const el = document.getElementById("featured-packs");
    el?.scrollIntoView({ behavior: "smooth" });
  }}
            >
              Start with a COIN Pack
              <ArrowRight className="h-5 w-5" />
            </Button>
            {/* <Button
              variant="glass"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Explore Emitters
            </Button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;