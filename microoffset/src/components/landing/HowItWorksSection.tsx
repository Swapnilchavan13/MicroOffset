import { motion } from "framer-motion";
import { ShoppingCart, Leaf, FileCheck, BarChart3, Settings, Calendar, LayoutDashboard, ArrowRight } from "lucide-react";

const customerSteps = [
  { icon: ShoppingCart, label: "Customer checks out" },
  { icon: Leaf, label: "Adds a CO₂IN" },
  { icon: FileCheck, label: "Funds carbon removal" },
  { icon: BarChart3, label: "Impact is recorded" },
];

const businessSteps = [
  { icon: Leaf, label: "Add CO₂IN at checkout" },
  { icon: Settings, label: "We handle the backend" },
  { icon: Calendar, label: "Monthly reconciliation" },
  { icon: LayoutDashboard, label: "Track impact on dashboard" },
];

const StepRow = ({ steps, line }: { steps: typeof customerSteps; line: string }) => (
  <div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0">
      {steps.map(({ icon: Icon, label }, i) => (
        <div key={label} className="flex items-center gap-3 sm:gap-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Icon className="text-primary" size={20} />
            </div>
            <span className="text-sm font-medium whitespace-nowrap">{label}</span>
          </div>
          {i < steps.length - 1 && (
            <ArrowRight className="hidden sm:block mx-3 text-muted-foreground shrink-0" size={16} />
          )}
        </div>
      ))}
    </div>
    <p className="mt-4 text-sm font-display font-semibold text-muted-foreground">{line}</p>
  </div>
);

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 md:py-28 bg-background">
    <div className="container max-w-4xl">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold tracking-tight text-center">
        How It Works
      </motion.h2>

      <div className="mt-16 space-y-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-lg font-display font-semibold mb-6 text-coin-emerald">For Your Customer</h3>
          <StepRow steps={customerSteps} line="Simple. Voluntary. Transparent." />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="text-lg font-display font-semibold mb-6 text-coin-emerald">For Your Business</h3>
          <StepRow steps={businessSteps} line="No complexity. No operational load." />
        </motion.div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
