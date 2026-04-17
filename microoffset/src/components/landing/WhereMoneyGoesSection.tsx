import { motion } from "framer-motion";
import { ArrowDown, Sprout, Recycle, FlaskConical, Mountain } from "lucide-react";

const flow = [
  "Customer CO₂IN",
  "CO₂IN Project Fund",
  "Carbon Removal Projects",
  "Carbon Credits Generated",
  "Allocated to Your Brand",
];

const bullets = [
  { icon: Sprout, text: "Biochar-based carbon removal" },
  { icon: Recycle, text: "Agricultural waste diversion" },
  { icon: Mountain, text: "Soil carbon storage" },
  { icon: FlaskConical, text: "Scientific measurement and verification" },
];

const WhereMoneyGoesSection = () => (
  <section className="py-20 md:py-28 bg-section-alt">
    <div className="container max-w-4xl">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold tracking-tight text-center">
        Where Your CO₂INs Go
      </motion.h2>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 flex flex-col items-center gap-2">
        {flow.map((step, i) => (
          <div key={step} className="flex flex-col items-center">
            <div className="px-6 py-3 rounded-xl bg-card border text-sm font-medium text-center">{step}</div>
            {i < flow.length - 1 && <ArrowDown className="text-primary my-1" size={18} />}
          </div>
        ))}
      </motion.div>

      <p className="mt-10 text-center text-muted-foreground">Each contribution maps to real carbon removal capacity.</p>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {bullets.map(({ icon: Icon, text }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center gap-4 p-4 rounded-xl bg-card border"
          >
            <Icon className="text-primary shrink-0" size={20} />
            <span className="text-sm font-medium">{text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhereMoneyGoesSection;
