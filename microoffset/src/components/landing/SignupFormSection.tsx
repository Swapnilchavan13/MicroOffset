import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const SignupFormSection = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Application submitted! We'll be in touch soon.");
    }, 1500);
  };

  return (
    <section id="signup" className="py-20 md:py-28 bg-background">
      <div className="container max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Join the CO₂IN Program</h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-5 p-6 md:p-8 rounded-2xl bg-card border shadow-sm"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Company Name</label>
              <Input placeholder="Acme Inc." required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Website</label>
              <Input placeholder="https://example.com" type="url" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Industry</label>
              <Input placeholder="Hospitality, Retail..." required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Contact Person</label>
              <Input placeholder="Jane Doe" required />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <Input placeholder="jane@company.com" type="email" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Phone</label>
              <Input placeholder="+91 98765 43210" type="tel" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Country</label>
              <Input placeholder="India" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Monthly Transaction Volume</label>
              <Input placeholder="e.g. 10,000" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Integration Preference</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="exploring">Exploring</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Message</label>
            <Textarea placeholder="Tell us about your use case..." rows={3} />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Checkbox id="api-access" />
              <label htmlFor="api-access" className="text-sm">I want API access</label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="pilot" />
              <label htmlFor="pilot" className="text-sm">I want to start a pilot</label>
            </div>
          </div>

          <Button variant="hero" size="lg" className="w-full h-14" type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit & Get Started"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default SignupFormSection;
