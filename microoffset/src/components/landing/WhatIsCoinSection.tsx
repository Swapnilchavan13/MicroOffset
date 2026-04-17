import { motion } from "framer-motion";
import { Leaf, Shield, BarChart3, Coins } from "lucide-react";

const bullets = [
  { icon: Coins, text: "₹10–₹100 per transaction (or equivalent)" },
  { icon: Leaf, text: "Funds real carbon removal" },
  { icon: Shield, text: "Backed by issuance-grade carbon credits" },
  { icon: BarChart3, text: "Fully traceable and measurable" },
];

const WhatIsCoinSection = () => (
  <section className="py-20 md:py-28 bg-section-alt">
    <div className="container max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">A Simple Idea</h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          A CO₂IN is a small, voluntary contribution your customer can add at checkout. That small amount goes into real carbon removal projects — where carbon is physically taken out of the atmosphere and permanently stored.
        </p>
        <p className="mt-4 text-muted-foreground">Each contribution is measured and converted into carbon credits.</p>
      </motion.div>

      <div className="mt-12 grid sm:grid-cols-2 gap-4">
        {bullets.map(({ icon: Icon, text }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center gap-4 p-5 rounded-xl bg-card border"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="text-primary" size={20} />
            </div>
            <span className="font-medium text-sm">{text}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center font-display font-semibold text-lg text-foreground"
      >
        Not a donation. A measurable climate action.
      </motion.p>
    </div>
  </section>
);

export default WhatIsCoinSection;
