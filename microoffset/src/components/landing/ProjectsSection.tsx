import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const locations = [
  "Bandhavgarh, Madhya Pradesh",
  "Damoh, Madhya Pradesh",
  "Puranpur, Uttar Pradesh",
  "Himachal Pradesh",
];

const ProjectsSection = () => (
  <section id="projects" className="py-20 md:py-28 bg-background font-space">
    <div className="container max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Real Projects. Real Impact.</h2>
        <p className="mt-6 text-lg text-muted-foreground">CO₂IN funds active, on-ground carbon removal projects across India.</p>
      </motion.div>

      <div className="mt-12 grid sm:grid-cols-2 gap-4">
        {locations.map((loc, i) => (
          <motion.div
            key={loc}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center gap-4 p-5 rounded-xl bg-coin-emerald-light border border-coin-emerald/20"
          >
            <MapPin className="text-primary shrink-0" size={20} />
            <span className="font-medium text-sm">{loc}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center font-display font-semibold text-lg"
      >
        Real land. Real infrastructure. Real carbon removed.
      </motion.p>
    </div>
  </section>
);

export default ProjectsSection;
