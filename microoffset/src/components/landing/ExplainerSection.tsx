import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const ExplainerSection = () => (
  <section id="explainer" className="py-20 md:py-28 bg-background">
    <div className="container max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">What is CO₂IN?</h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A CO₂IN is a simple idea. A small contribution your customer can add to a transaction — that directly funds real carbon removal on the ground.
        </p>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          From a few rupees to tonnes of CO₂ removed — all measured, verified, and traceable.
        </p>
      </motion.div>

      {/* Video placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12 aspect-video rounded-2xl bg-muted flex items-center justify-center border"
      >
        <div className="text-center text-muted-foreground">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-primary ml-1" />
          </div>
          <p className="text-sm font-medium">Explainer Video</p>
        </div>
      </motion.div>

      <div className="mt-10 grid sm:grid-cols-3 gap-6">
        {["Simple to implement", "No operational burden", "Real, verified carbon removal"].map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            className="flex items-start gap-3 p-4 rounded-xl bg-secondary"
          >
            <CheckCircle className="text-primary mt-0.5 shrink-0" size={20} />
            <span className="font-medium text-sm">{t}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ExplainerSection;
