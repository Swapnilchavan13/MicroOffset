import { motion } from "framer-motion";
import { Hotel, Palmtree, ShoppingBag, Globe, Building2, Ticket } from "lucide-react";

const items = [
  { icon: Hotel, text: "Hotels & Resorts" },
  { icon: Palmtree, text: "Tourism & Attractions" },
  { icon: ShoppingBag, text: "Retail Brands" },
  { icon: Globe, text: "E-commerce Platforms" },
  { icon: Building2, text: "Corporates" },
  { icon: Ticket, text: "Ticketing Platforms" },
];

const WhoItsForSection = () => (
  <section className="py-20 md:py-28 bg-section-alt">
    <div className="container max-w-4xl">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold tracking-tight text-center">
        Built For
      </motion.h2>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map(({ icon: Icon, text }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 * i }}
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border text-center hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="text-primary" size={24} />
            </div>
            <span className="font-medium text-sm">{text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhoItsForSection;
