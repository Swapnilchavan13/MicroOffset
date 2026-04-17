import { motion } from "framer-motion";

const DemoSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">See It in Action</h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
          A seamless experience for your customers. From a simple add-on at checkout to a transparent view of the impact they've created.
        </p>
        <p className="mt-2 font-display font-semibold text-muted-foreground">Clean. Simple. Meaningful.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="mt-12 aspect-video rounded-2xl bg-muted border flex items-center justify-center"
      >
        <p className="text-sm text-muted-foreground font-medium">Interactive Demo Preview</p>
      </motion.div>
    </div>
  </section>
);

export default DemoSection;
