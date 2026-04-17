const Footer = () => (
  <footer className="bg-hero border-t border-foreground/5 py-8">
    <div className="container text-center">
      <p className="font-display font-bold text-hero text-lg">CO₂IN</p>
      <p className="mt-2 text-sm text-hero-muted">Turning transactions into carbon removal.</p>
      <p className="mt-4 text-xs text-hero-muted/60">© {new Date().getFullYear()} CO₂IN. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
