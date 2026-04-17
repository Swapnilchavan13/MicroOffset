import { motion } from "framer-motion";

const steps = [
  { num: "1", text: "We review your application" },
  { num: "2", text: "Schedule a quick walkthrough" },
  { num: "3", text: "Set up integration or pilot" },
  { num: "4", text: "You go live with CO₂IN" },
];

const WhatHappensNextSection = () => (
  <section className="py-20 md:py-28 bg-section-alt">
    <div className="container max-w-4xl">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold tracking-tight text-center">
        What Happens After You Sign Up
      </motion.h2>

      <div className="mt-12 grid sm:grid-cols-4 gap-6">
        {steps.map(({ num, text }, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            className="text-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto font-display font-bold text-lg">
              {num}
            </div>
            <p className="mt-4 text-sm font-medium">{text}</p>
          </motion.div>
        ))}
      </div>

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-center text-sm text-muted-foreground">
        Typically within 1–3 weeks
      </motion.p>
    </div>
  </section>
);

export default WhatHappensNextSection;
