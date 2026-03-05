import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroEarth from "@/assets/hero-earth.jpg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroEarth}
          alt="Earth from space with green energy connections"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 to-dark/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 animate-float rounded-full bg-emerald/20 blur-3xl" />
        <div className="absolute -right-40 bottom-40 h-80 w-80 animate-float-delayed rounded-full bg-sky/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <Link to="/coinoption">
  <div className="cursor-pointer animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-emerald/30 bg-emerald/10 px-5 py-2 text-sm font-medium text-emerald-500 backdrop-blur-sm hover:bg-emerald/20 transition">
    
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
    </span>

    Join Coin

    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
    </span>

  </div>
</Link>

          {/* Main headline */}
          <h1 className="text-[#10B77F] animate-fade-up animation-delay-100 mb-6 text-4xl leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Offset the Emissions{" "}
            <span className="relative">
              <span className="text-[#10B77F]">You Create Every Day.</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8C50 3 150 3 298 8" stroke="url(#underline-gradient)" strokeWidth="4" strokeLinecap="round" />
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                    <stop stopColor="hsl(160 84% 39%)" />
                    <stop offset="1" stopColor="hsl(199 89% 48%)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
           <span className="text-[#10B77F] text-6xl">
  CO₂IN by CO₂IN
</span>
          <br />
          <br />


          {/* Subheadline */}
          <p className="animate-fade-up animation-delay-200 mx-auto mb-4 max-w-2xl text-lg text-white/80 md:text-lg">
Eliminate the CO₂ footprint of your everyday actions like travel, digital usage, dining out, hotel stays and events through reliable “offset-packs". Because the journey to neutralise billions of carbon footprints, begins with a single <span className="text-[#10B77F]">CO₂IN.</span></p>

          {/* CTA Buttons */}
          <div className="animate-fade-up animation-delay-400 flex flex-col items-center justify-center gap-4 sm:flex-row">
           {/* <Button
  className="bg-[#10B77F] hover:bg-[#0e9f6e] text-white"
  size="xl"
  onClick={() => navigate("/cms")}
>
  Build Your MicroOffset Pack
  <ArrowRight className="h-5 w-5" />
</Button> */}

            {/* <Button
  variant="glass"
  size="lg"
  className="text-white border-white/20 hover:bg-white/10"
  onClick={() => {
    const el = document.getElementById("how-it-works");
    el?.scrollIntoView({ behavior: "smooth" });
  }}
>
  <Play className="h-4 w-4" />
  How it works
</Button> */}
          </div>

          {/* Stats */}
          <div className="animate-fade-up animation-delay-500 mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
            <div className="text-center">
              <div className="mb-1 text-3xl font-bold text-white md:text-lg">50+</div>
              <div className="text-sm text-white/60">Emitter Types</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-3xl font-bold text-emerald md:text-lg">1M+</div>
              <div className="text-sm text-white/60">kg CO₂ Offset</div>
            </div>
            <div className="text-center">
              <div className="mb-1 text-3xl font-bold text-white md:text-lg">100%</div>
              <div className="text-sm text-white/60">Verified Projects</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5">
          <div className="h-2 w-1 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;