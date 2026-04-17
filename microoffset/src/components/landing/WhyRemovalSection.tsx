import { motion } from "framer-motion";
import { TrendingDown, ArrowUpFromLine } from "lucide-react";

const WhyRemovalSection = () => (
  <section className="py-20 md:py-28 bg-section-alt">
    <div className="container max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Why Carbon Removal?</h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          Most sustainability efforts focus on reducing emissions. CO₂IN goes one step further — it removes carbon that already exists in the atmosphere.
        </p>
      </motion.div>

      <div className="mt-12 grid sm:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-card border text-center">
          <TrendingDown className="mx-auto text-muted-foreground mb-3" size={32} />
          <h3 className="font-display font-semibold text-lg">Reduction</h3>
          <p className="mt-2 text-sm text-muted-foreground">Emit less</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 rounded-2xl bg-primary/5 border-2 border-coin-emerald/30 text-center">
          <ArrowUpFromLine className="mx-auto text-primary mb-3" size={32} />
          <h3 className="font-display font-semibold text-lg">Removal</h3>
          <p className="mt-2 text-sm text-muted-foreground">Take carbon out</p>
        </motion.div>
      </div>

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-center font-display font-semibold text-lg">
        Permanent. Measured. High-integrity.
      </motion.p>
    </div>
  </section>
);

export default WhyRemovalSection;
