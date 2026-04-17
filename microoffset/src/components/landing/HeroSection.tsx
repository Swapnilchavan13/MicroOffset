import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="bg-hero min-h-screen flex items-center pt-16">
      <div className="container py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-hero leading-tight tracking-tight">
            Turn Every Transaction Into{" "}
            <span className="text-gradient-hero">Carbon Removal</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-hero-muted max-w-2xl mx-auto leading-relaxed">
            Let your customers add a small CO₂IN — and fund real, measurable carbon removal.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-coin-emerald/10 border border-coin-emerald/20"
          >
            <span className="w-3 h-3 rounded-full bg-coin-emerald animate-pulse" />
            <span className="font-display font-semibold text-coin-emerald text-lg">
              1 CO₂IN = 1 kg CO₂ removed
            </span>
          </motion.div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={() => scrollTo("signup")} className="h-14 px-8 text-base">
              Join the CO₂IN Program <ArrowRight className="ml-1" size={18} />
            </Button>
            <Button
              variant="heroOutline"
              size="lg"
              onClick={() => scrollTo("explainer")}
              className="h-14 px-8 text-base text-hero-muted border-hero-muted/20 hover:bg-foreground/5"
            >
              <Play size={18} className="mr-1" /> Watch How It Works
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
