import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Ticket, Hotel, Store, Code, Wrench, ArrowRight } from "lucide-react";

const methods = [
  { icon: ShoppingCart, text: "Checkout add-on" },
  { icon: Ticket, text: "Ticketing systems" },
  { icon: Hotel, text: "Hotel bookings" },
  { icon: Store, text: "Retail POS" },
  { icon: Code, text: "API integration" },
  { icon: Wrench, text: "Manual pilot option" },
];

const IntegrationSection = () => (
  <section id="integration" className="py-20 md:py-28 bg-section-alt">
    <div className="container max-w-4xl">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold tracking-tight text-center">
        How You Can Offer CO₂IN
      </motion.h2>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {methods.map(({ icon: Icon, text }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * i }}
            className="flex items-center gap-4 p-5 rounded-xl bg-card border"
          >
            <Icon className="text-primary shrink-0" size={20} />
            <span className="font-medium text-sm">{text}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button variant="hero" size="lg" onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}>
          Request API Access <ArrowRight className="ml-1" size={18} />
        </Button>
      </div>
    </div>
  </section>
);

export default IntegrationSection;
