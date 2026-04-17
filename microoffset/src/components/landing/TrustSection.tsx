import { motion } from "framer-motion";
import { ShieldCheck, Award, Eye, MapPin } from "lucide-react";

const items = [
  { icon: ShieldCheck, text: "Measured and verified projects" },
  { icon: Award, text: "Issuance-grade carbon credits" },
  { icon: Eye, text: "Transparent allocation" },
  { icon: MapPin, text: "India-based infrastructure" },
];

const TrustSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container max-w-4xl">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold tracking-tight text-center">
        Built on High-Integrity Carbon Removal
      </motion.h2>

      <div className="mt-12 grid sm:grid-cols-2 gap-4">
        {items.map(({ icon: Icon, text }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center gap-4 p-5 rounded-xl bg-secondary"
          >
            <Icon className="text-primary shrink-0" size={20} />
            <span className="font-medium text-sm">{text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSection;
