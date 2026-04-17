import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-hero/95 backdrop-blur-md border-b border-foreground/5">
      <div className="container flex items-center justify-between h-16">
        <button onClick={() => scrollTo("hero")} className="font-display font-bold text-xl text-hero">
          CO₂IN
        </button>

        <div className="hidden md:flex items-center gap-8">
          {[
            ["How It Works", "how-it-works"],
            ["Projects", "projects"],
            ["Benefits", "benefits"],
            ["Integration", "integration"],
          ].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-sm text-hero-muted hover:text-hero transition-colors">
              {label}
            </button>
          ))}
          <Button variant="hero" size="sm" onClick={() => scrollTo("signup")}>
            Join Program
          </Button>
        </div>

        <button className="md:hidden text-hero" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-hero border-t border-foreground/5 p-4 flex flex-col gap-3">
          {[
            ["How It Works", "how-it-works"],
            ["Projects", "projects"],
            ["Benefits", "benefits"],
            ["Integration", "integration"],
          ].map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)} className="text-sm text-hero-muted hover:text-hero text-left py-2">
              {label}
            </button>
          ))}
          <Button variant="hero" size="sm" onClick={() => scrollTo("signup")}>
            Join Program
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
