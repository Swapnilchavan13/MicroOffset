import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code } from "lucide-react";

const FinalCTASection = () => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="py-20 md:py-28 bg-hero">
      <div className="container max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-hero">
            Start Turning Transactions Into Carbon Removal
          </h2>
          <p className="mt-6 text-lg text-hero-muted">Let your customers take part in something real.</p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={() => scrollTo("signup")} className="h-14 px-8 text-base">
              Join CO₂IN Program <ArrowRight className="ml-1" size={18} />
            </Button>
            <Button
              variant="heroOutline"
              size="lg"
              onClick={() => scrollTo("signup")}
              className="h-14 px-8 text-base text-hero-muted border-hero-muted/20 hover:bg-foreground/5"
            >
              <Code size={18} className="mr-1" /> Request API Access
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
