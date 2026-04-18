import { motion } from "framer-motion";
import { DollarSign, Award, Users, Sparkles, Zap } from "lucide-react";

const benefits = [
  { icon: DollarSign, text: "Create a new revenue stream" },
  { icon: Award, text: "Strengthen sustainability credibility" },
  { icon: Users, text: "Increase customer engagement" },
  { icon: Sparkles, text: "Differentiate your brand" },
  { icon: Zap, text: "Simple to implement" },
];

const BenefitsSection = () => (
  <section id="benefits" className="py-20 md:py-28 bg-background font-space">
    <div className="container max-w-4xl">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold tracking-tight text-center">
        Why Join CO₂IN
      </motion.h2>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {benefits.map(({ icon: Icon, text }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * i }}
            className="flex items-center gap-4 p-5 rounded-xl bg-card border hover:shadow-md transition-shadow"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="text-primary" size={20} />
            </div>
            <span className="font-medium text-sm">{text}</span>
          </motion.div>
        ))}
      </div>

      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-center font-display font-semibold text-lg">
        Small action. Strong signal.
      </motion.p>
    </div>
  </section>
);

export default BenefitsSection;
