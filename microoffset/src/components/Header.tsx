import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Projects", href: "#projects" },
  { label: "Who It's For", href: "#audience" },
  { label: "Why Us", href: "#why-different" },
];

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 shadow-card backdrop-blur-lg"
          : "bg-background/95 shadow-card backdrop-blur-lg"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20 md:px-6">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isScrolled 
                  ? "text-muted-foreground hover:text-foreground" 
                  :"text-muted-foreground hover:text-foreground" 
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button 
            variant="ghost" 
            size="sm"
            className={isScrolled ? "" : "text-white hover:bg-white/10 hover:text-white"}
          >
            Sign In
          </Button>

          
          <Button
  size="sm"
  onClick={() => navigate("/emitter-pack")}
  className="bg-[#10B77F] hover:bg-[#0e9f6e] text-white"
>
  Get Started
</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:hidden ${
            isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="animate-fade-up border-t border-border bg-background/95 backdrop-blur-lg md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              <Button variant="ghost" className="w-full justify-center">
                Sign In
              </Button>
              <Button variant="cta" className="w-full justify-center">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;