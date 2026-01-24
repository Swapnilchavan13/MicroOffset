import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Mail,
  Video,
  Cloud,
  Smartphone,
  Monitor,
  FileText,
  Trees,
  Car,
  Lightbulb,
  Beef,
  Plane,
  BatteryCharging,
  Info,
  CheckCircle2,
  ArrowRight,
  Minus,
  Plus,
  Leaf,
  Globe,
  HardDrive,
  IndianRupee // Added IndianRupee icon
} from "lucide-react";

// --- Types based on your NEW JSON ---
interface Emitter {
  emitter_id: string;
  emitter_name_standard: string;
  category: string;
  sub_category: string;
  quantity: number;
  unit: string;
  calculated_emission_kgco2e: number;
  factor_kgco2e_per_unit: number;
  source_type: string;
}

interface Project {
  projectId: string;
  allocation_percent: number;
  allocated_emission_kgco2e: number;
  allocated_cost: number;
  price_per_kg: number; // Added from new JSON
  image_url: string;
}

interface CarbonPack {
  _id: string;
  pack_name: string;
  description: string;
  total_emission_kgco2e: number;
  total_pack_price: number;
  currency: string;
  weighted_price_per_kg: number; // Added from new JSON
  emitters: Emitter[];
  projects: Project[];
}

const API_URL = "http://62.72.59.146:5000/getemitterpacks";

const EmitterPackDetails = () => {
  const { id } = useParams();
  const [pack, setPack] = useState<CarbonPack | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  // Helper to map icons to emitter names
  const getIconForEmitter = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("email")) return <Mail className="text-teal-600" />;
    if (lower.includes("video") || lower.includes("conference")) return <Video className="text-blue-500" />;
    if (lower.includes("cloud") || lower.includes("storage")) return <Cloud className="text-sky-400" />;
    if (lower.includes("mobile") || lower.includes("app")) return <Smartphone className="text-indigo-500" />;
    if (lower.includes("screen") || lower.includes("monitor")) return <Monitor className="text-purple-500" />;
    if (lower.includes("web") || lower.includes("browsing")) return <Globe className="text-emerald-500" />;
    if (lower.includes("cup") || lower.includes("pantry")) return <Leaf className="text-amber-600" />; // Added for cup
    return <FileText className="text-gray-500" />;
  };

  useEffect(() => {
    const fetchPack = async () => {
      try {
        setLoading(true);
        // Using the passed ID or falling back to the hardcoded ID for testing if URL param is missing
        const searchId = id; 
        const res = await fetch(`${API_URL}/${searchId}`);
        
        if (!res.ok) throw new Error("Failed to fetch pack");
        
        const json = await res.json();
        
        if (json.success) {
          setPack(json.data);
        } else {
          setError("Pack data not found");
        }
      } catch (err) {
        console.error(err);
        setError("Error connecting to server");
      } finally {
        setLoading(false);
      }
    };

    fetchPack();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-slate-500 gap-2">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
      Loading Pack Details...
    </div>
  );
  
  if (error || !pack) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-slate-500">
      <h2 className="text-xl font-bold text-slate-800 mb-2">Oops!</h2>
      <p>{error || "Pack not found"}</p>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 pb-20">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="relative w-full bg-white overflow-hidden">
        {/* Background Gradient/Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50/80 via-white/60 to-emerald-50/40 z-0" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20 z-0 mask-image-linear-gradient" style={{WebkitMaskImage: "linear-gradient(to right, transparent, black)"}} />

        <div className="relative z-10 container mx-auto max-w-5xl px-6 pt-12 pb-16">
          <div className="inline-flex items-center gap-2 bg-teal-100/50 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide">
            Most Popular
          </div>
          
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {pack.pack_name}
          </h1>
          
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-8">
            {pack.description} <br/>
            Perfect for professionals looking to offset their workplace footprint.
          </p>

          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>Participating Brands:</span>
            <div className="flex gap-2">
              {["Microsoft", "Google", "Slack", "Zoom", "Dropbox"].map(brand => (
                <span key={brand} className="bg-slate-100 px-3 py-1 rounded-full text-slate-600 font-medium">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-6 -mt-8 relative z-20 space-y-8">
        
        {/* ================= WHY THIS PACK MATTERS ================= */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-100 p-2 rounded-full">
              <Info className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Why This Pack Matters</h2>
          </div>
          
          <p className="text-slate-600 mb-8 leading-relaxed">
            The average office worker generates significant emissions through daily activities. Whether it's disposable cups, cloud storage, or digital services, these micro-emissions accumulate. Offsetting them is a crucial step toward Net Zero.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Data centers global emission share", val: "2-3%", icon: <Globe className="w-5 h-5 text-emerald-500"/> },
              { label: "Yearly growth in digital emissions", val: "+9%", icon: <HardDrive className="w-5 h-5 text-emerald-500"/> },
              { label: "Workers unaware of carbon footprint", val: "78%", icon: <Info className="w-5 h-5 text-emerald-500"/> }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-slate-800 mb-2">{stat.val}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= EMITTERS IN THIS PACK ================= */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Emitters in This Pack</h2>
            <span className="text-sm text-slate-400">{pack.emitters.length} activities included</span>
          </div>

          <div className="grid gap-4">
            {pack.emitters.map((emitter, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-emerald-200 transition-colors bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                    {getIconForEmitter(emitter.emitter_name_standard)}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-700 flex items-center gap-2">
                      {emitter.emitter_name_standard}
                      <Info className="w-3 h-3 text-slate-300" />
                    </div>
                    <div className="text-sm text-slate-400">
                      {emitter.quantity} {emitter.unit} ({emitter.category})
                    </div>
                  </div>
                </div>
                <div className="font-bold text-slate-700 text-right">
                  {emitter.calculated_emission_kgco2e.toFixed(2)} <span className="text-xs font-normal text-slate-400 block sm:inline">kg CO₂e</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center pt-6 border-t border-slate-100">
            <div>
              <div className="font-bold text-lg">Total Monthly Emissions</div>
              <div className="text-sm text-slate-400">Calculated sum of all emitters</div>
            </div>
            <div className="text-3xl font-bold text-emerald-600">
              {pack.total_emission_kgco2e.toFixed(2)} <span className="text-lg text-slate-500">kg CO₂e</span>
            </div>
          </div>
        </div>

        {/* ================= EQUIVALENCIES (Dynamic) ================= */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
           <h2 className="text-2xl font-bold text-slate-800 mb-2">
            What Does {pack.total_emission_kgco2e.toFixed(2)} kg CO₂e Mean?
           </h2>
           <p className="text-slate-500 mb-8">To help visualize the impact, here's what your emissions are equivalent to:</p>

           <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <EquivalentCard icon={<Trees />} value={(pack.total_emission_kgco2e * 0.05).toFixed(1)} label="Tree Months" desc="CO₂ absorbed by one mature tree" />
              <EquivalentCard icon={<Car />} value={Math.max(1, Math.round(pack.total_emission_kgco2e * 3.7))} label="Driving km" desc="Distance in a petrol car" />
              <EquivalentCard icon={<Lightbulb />} value={Math.max(1, Math.round(pack.total_emission_kgco2e * 16.8))} label="LED Hours" desc="10W bulb running continuously" />
              <EquivalentCard icon={<Beef />} value={(pack.total_emission_kgco2e * 0.18).toFixed(1)} label="kg Beef" desc="Producing this much beef" />
              <EquivalentCard icon={<Plane />} value={Math.max(1, Math.round(pack.total_emission_kgco2e * 6))} label="Flight km" desc="Economy class air travel" />
              <EquivalentCard icon={<BatteryCharging />} value={Math.max(1, Math.round(pack.total_emission_kgco2e * 45))} label="Charges" desc="Full smartphone battery charges" />
           </div>
        </div>

        {/* ================= OFFSET ACTION SECTION ================= */}
        <div className="bg-emerald-50/50 rounded-3xl p-8 border border-emerald-100 grid md:grid-cols-12 gap-8">
          
          {/* Left Text */}
          <div className="md:col-span-4">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Offset This Pack?</h2>
            <p className="text-slate-600 mb-6">
              Your contribution directly funds verified carbon removal projects. Every kilogram matters in the fight against climate change.
            </p>
            <div className="flex flex-col gap-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Verified
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-500" /> Certificate Included
              </div>
            </div>
          </div>

          {/* Middle List (Scrollable preview) */}
          <div className="md:col-span-4 bg-white rounded-2xl p-4 shadow-sm h-64 overflow-y-auto custom-scrollbar border border-slate-100">
            <div className="text-sm font-semibold mb-3 sticky top-0 bg-white pb-2 border-b">Emissions Offset</div>
            <div className="space-y-3">
               {pack.emitters.map((e, i) => (
                 <div key={i} className="flex justify-between text-sm items-center">
                    <div className="flex items-center gap-2 text-slate-600">
                      {getIconForEmitter(e.emitter_name_standard)}
                      <span className="truncate max-w-[120px]">{e.emitter_name_standard}</span>
                    </div>
                    <span className="text-emerald-600 font-medium">{(e.calculated_emission_kgco2e * quantity).toFixed(2)} kg</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Right Action Card */}
          <div className="md:col-span-4 bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex flex-col items-center justify-center">
             <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-slate-50"><Minus className="w-4 h-4"/></button>
                <div className="text-center">
                  <div className="font-bold text-xl">{quantity}</div>
                  <div className="text-xs text-slate-400">pack</div>
                </div>
                <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-slate-50"><Plus className="w-4 h-4"/></button>
             </div>

             <div className="text-center mb-6">
                <div className="text-sm text-slate-500 mb-1">Total to Offset</div>
                <div className="text-3xl font-bold text-emerald-600">
                  {(pack.total_emission_kgco2e * quantity).toFixed(2)} <span className="text-lg">kg CO₂e</span>
                </div>
             </div>

             <div className="w-full border-t pt-4 mb-4">
               <div className="flex justify-between items-center mb-4">
                 <span className="text-slate-500">Offset Cost</span>
                 <span className="text-2xl font-bold text-slate-800 flex items-center">
                    ₹{(pack.total_pack_price * quantity).toFixed(2)}
                 </span>
               </div>
               <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                 Offset Now <ArrowRight className="w-4 h-4"/>
               </button>
             </div>
          </div>

        </div>

        {/* ================= CERTIFICATE PREVIEW ================= */}
        <div className="bg-emerald-50/30 rounded-3xl p-8 border border-emerald-100 text-center">
            <h3 className="text-lg font-bold text-emerald-800 mb-6 flex items-center gap-2 justify-center">
              <Leaf className="w-4 h-4" /> Your Certificate Preview
            </h3>
            
            <div className="bg-white border-4 border-double border-emerald-100 rounded-lg p-10 max-w-2xl mx-auto shadow-sm relative">
                <div className="absolute top-4 left-4 text-slate-300 font-serif italic text-xl">NettZero</div>
                <div className="text-center space-y-4">
                  <div className="text-xs uppercase tracking-widest text-slate-400">Emissions Retirement Certificate</div>
                  <div className="text-lg font-bold text-slate-800">Carbon Dioxide Removal Verification</div>
                  
                  <div className="py-4">
                    <div className="text-sm text-slate-500">This certifies that</div>
                    <div className="text-2xl font-bold text-slate-900 my-2">Company / Individual Name</div>
                    <div className="text-sm text-slate-500">has successfully retired</div>
                  </div>

                  <div className="text-4xl font-bold text-emerald-500">{(pack.total_emission_kgco2e * quantity).toFixed(2)} kg CO₂e</div>
                  <div className="text-xs text-slate-400">through verified Carbon Dioxide Removal</div>

                  <div className="flex justify-between items-end mt-8 pt-8 border-t border-slate-100">
                     <div className="text-left">
                       <div className="text-xs text-slate-400">Pack</div>
                       <div className="font-semibold text-sm">{pack.pack_name}</div>
                     </div>
                     <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                        <div className="w-10 h-10 border-2 border-slate-300 rounded grid grid-cols-2 gap-1 p-1">
                          <div className="bg-slate-300 rounded-sm"></div>
                          <div className="bg-slate-300 rounded-sm"></div>
                          <div className="bg-slate-300 rounded-sm"></div>
                        </div>
                     </div>
                     <div className="text-right">
                       <div className="text-xs text-slate-400">Certificate ID</div>
                       <div className="font-mono text-xs font-semibold">NZ-2026-X-001</div>
                     </div>
                  </div>
                </div>
            </div>
        </div>

        {/* ================= PROJECTS SECTION ================= */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
               <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                 <Leaf className="text-emerald-500"/> What Your Offset Supports
               </h2>
               <p className="text-slate-500 text-sm">Your contribution is distributed across these verified CDR projects</p>
            </div>
            {/* Dynamic Weighted Price Display */}
            <div className="bg-slate-100 px-4 py-2 rounded-lg text-right hidden md:block">
               <div className="text-xs text-slate-500">Weighted Average Cost</div>
               <div className="font-bold text-emerald-600 flex items-center gap-1 justify-end">
                  ₹{pack.weighted_price_per_kg} 
                  <span className="text-slate-400 text-xs font-normal"> / kg CO₂</span>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pack.projects.map((proj, i) => (
              <ProjectCard key={i} project={proj} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Sub-components ---

const EquivalentCard = ({ icon, value, label, desc }: any) => (
  <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center text-center border border-slate-100 hover:border-emerald-200 transition-all">
    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-emerald-600 mb-3">
      {icon}
    </div>
    <div className="text-xl font-bold text-slate-800">{value}</div>
    <div className="text-xs font-semibold text-slate-600 mb-1">{label}</div>
    <div className="text-[10px] text-slate-400 leading-tight">{desc}</div>
  </div>
);


const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      
      {/* Image / Header */}
      <div className="relative h-44 bg-slate-100">
        <img
          src={project.image_url ?? "/placeholder-project.jpg"}
          alt={project.projectId}
          className="w-full h-full object-cover"
        />

        {/* Allocation badge */}
        <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          {project.allocation_percent.toFixed(0)}% contribution
        </div>

        {/* Project type tag */}
        <div className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          CDR
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-slate-800 text-lg">
          {project.projectId}
        </h3>

        {/* Location / description */}
        <p className="text-sm text-slate-500 leading-snug">
          Capturing CO₂ through verified carbon removal solutions.
        </p>

        {/* Progress bar (allocated emission visual) */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Emission allocated</span>
            <span>{project.allocated_emission_kgco2e.toFixed(2)} kg CO₂e</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500"
              style={{ width: `${project.allocation_percent}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          {/* SDG-like indicators */}
          <div className="flex gap-1">
            {[13, 15, 12].map(n => (
              <span
                key={n}
                className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold"
              >
                {n}
              </span>
            ))}
          </div>

          {/* Pricing */}
          <div className="text-right">
            <div className="font-semibold text-emerald-600">
              ₹{project.price_per_kg}
              <span className="text-xs text-slate-400 font-normal ml-1">
                / kg CO₂
              </span>
            </div>
            <div className="text-xs text-slate-400">
              ₹{project.allocated_cost.toFixed(2)} allocated
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default EmitterPackDetails;