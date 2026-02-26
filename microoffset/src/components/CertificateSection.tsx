import { Award, Shield, CheckCircle2 } from "lucide-react";
import nettZeroLogo from "@/assets/nettzero-logo.png";

const CertificateSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 text-emerald mb-6">
            <Award className="w-4 h-4" />
            <span className="text-sm font-medium">Verified & Certified</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get an Offset Retirement{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald to-sky">
              Certificate
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every MicroOffset retirement comes with an official certificate you can proudly display, 
            share, or present to stakeholders as proof of your climate action.
          </p>
        </div>

        {/* Certificate Display */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald/20 via-sky/20 to-violet/20 rounded-3xl blur-2xl opacity-60" />
            
            {/* Certificate */}
            <div className="relative bg-white border-8 border-double border-emerald/30 rounded-lg shadow-2xl p-8 md:p-12">
              {/* Certificate inner border */}
              <div className="absolute inset-4 border border-emerald/20 rounded pointer-events-none" />
              
              {/* Watermark pattern */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
                <div className="absolute inset-0" style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(16, 185, 129, 0.5) 35px, rgba(16, 185, 129, 0.5) 70px)`,
                }} />
              </div>

              {/* Header Logos */}
              <div className="flex justify-between items-start mb-8 relative">
                <div className="flex flex-col items-center">
                  <img 
                    src={nettZeroLogo} 
                    alt="NettZero" 
                    className="h-12 md:h-16 object-contain"
                  />
                  <span className="text-xs text-muted-foreground mt-1">Issuing Authority</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-12 md:h-16 px-4 flex items-center justify-center bg-slate-100 rounded border border-slate-200">
                    <span className="text-lg font-bold text-slate-600">
                      <img className="h-6" src="https://www.carbon-standards.com/img/09287be72bbe3e9d312c3bf4c49a8b59_033_CARBON-STANDARDS-int_rgb-1-.png" alt="" />
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">Registry Partner</span>
                </div>
              </div>

              {/* Certificate Title */}
              <div className="text-center mb-8 relative">
                <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-24 h-1 bg-gradient-to-r from-emerald to-sky rounded-full" />
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-emerald tracking-wide uppercase">
                  Emissions Retirement Certificate
                </h3>
                <p className="text-sm text-muted-foreground mt-2">Carbon Dioxide Removal Verification</p>
              </div>

              {/* Main Content */}
              <div className="text-center mb-8 space-y-4 relative">
                <p className="text-muted-foreground">This certifies that</p>
                <p className="text-2xl md:text-3xl font-bold text-foreground font-serif">
                  Acme Technologies Pvt. Ltd.
                </p>
                <p className="text-muted-foreground">has successfully retired</p>
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald/10 to-sky/10 rounded-full">
                  <span className="text-4xl md:text-5xl font-bold text-emerald">47.5</span>
                  <span className="text-lg text-muted-foreground">kg CO₂e</span>
                </div>
                <p className="text-muted-foreground">through verified Carbon Dioxide Removal</p>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8 p-6 bg-slate-50/50 rounded-lg border border-slate-100 relative">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">CDR Project</span>
                    <p className="font-semibold text-foreground">Pacific Biochar Carbon Sink</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Project Location</span>
                    <p className="font-semibold text-foreground">Oregon, United States</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">MicroOffset Pack</span>
                    <p className="font-semibold text-foreground">Office Digital Usage Pack</p>
                  </div>
                </div>
                 <div className="flex justify-center items-center mb-6">
    <img
      src="https://iili.io/qfdlNKg.png"
      alt="Logo"
      className="w-24 md:w-32 opacity-90"
    />
  </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Project Beneficiary</span>
                    <p className="font-semibold text-foreground">Climate Action Network</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Certificate ID</span>
                    <p className="font-semibold text-foreground font-mono">NZ-2024-BC-00847</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground">Retirement Date</span>
                    <p className="font-semibold text-foreground">December 25, 2024</p>
                  </div>
                </div>
              </div>

              {/* Participating Brands */}
              <div className="mb-8 text-center relative">
                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-3">Participating Brands</span>
                <div className="flex justify-center items-center gap-6 flex-wrap">
                  <span className="px-4 py-2 bg-slate-100 rounded-lg font-semibold text-slate-600">Microsoft</span>
                  <span className="px-4 py-2 bg-slate-100 rounded-lg font-semibold text-slate-600">Slack</span>
                  <span className="px-4 py-2 bg-slate-100 rounded-lg font-semibold text-slate-600">Zoom</span>
                </div>
              </div>

              {/* Signature Section */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-dashed border-slate-200 relative">
                <div className="flex items-center gap-4">
                  <Shield className="w-12 h-12 text-emerald" />
                  <div>
                    <p className="text-xs text-muted-foreground">Verified by</p>
                    <p className="font-semibold text-foreground">Carbon Standards International</p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="font-serif text-2xl italic text-slate-400 mb-1">
                    Gautam Shiknis
                  </div>
                  <div className="w-48 h-px bg-slate-300 mx-auto md:ml-auto md:mr-0" />
                  <p className="text-sm font-semibold text-foreground mt-2">Gautam Shiknis</p>
                  <p className="text-xs text-muted-foreground">Chairman, NettZero Environmental Technologies</p>
                </div>
              </div>

              {/* Verification Badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald text-white rounded-full shadow-lg text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Blockchain Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Supporting text */}
          <div className="text-center mt-16 space-y-4">
            <div className="flex justify-center gap-8 flex-wrap text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald" />
                <span>Digitally Signed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald" />
                <span>Registry Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald" />
                <span>Shareable Link</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald" />
                <span>Print Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
