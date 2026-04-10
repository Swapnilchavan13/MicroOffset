import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useRef } from "react";


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
import Header from "@/components/Header";

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
  project_image_url: string;
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

const API_URL = "https://microoffsets.nettzero.world/api/getemitterpacks";

const PACK_IMPACT_CONTENT: Record<string, any> = {
  "Event Day Pack": {
    why: "Large events concentrate energy use into a short period — lighting rigs, sound systems, AV equipment, and temporary infrastructure all increase the carbon footprint of a single day. Micro-offsetting helps balance the environmental impact of gatherings and celebrations.",
    stats: [
      {
        number: "50–100 kg CO₂",
        fact: "A medium-scale event can generate 50–100 kg CO₂ per attendee depending on power use and logistics.",
      },
    ],
  },

  "Fine Dining Meal Pack": {
    why: "Premium dining experiences often involve energy-intensive kitchens, refrigeration, imported ingredients, and food waste. Offsetting these emissions helps make high-quality dining compatible with climate responsibility.",
    stats: [
      {
        number: "30%",
        fact: "Studies show up to 30% of prepared restaurant food is wasted, contributing significantly to food-related emissions.",
      },
    ],
  },

  "Luxury Resort Stay Pack": {
    why: "Luxury resorts operate energy-intensive facilities including pools, air conditioning, laundry, and lighting across large properties. Offsetting a stay helps address the environmental footprint of comfort-focused hospitality.",
    stats: [
      {
        number: "40 kg CO₂",
        fact: "A single luxury hotel night can generate 30–40 kg of CO₂ depending on location and energy source.",
      },
    ],
  },

  "Buffet Pack": {
    why: "Buffets often produce more emissions than plated meals due to over-preparation, refrigeration, and food waste. Offsetting helps address the hidden carbon footprint of abundance.",
    stats: [
      {
        number: "1.3 kg CO₂",
        fact: "The average buffet meal generates about 1.3 kg CO₂ per person, including food waste and kitchen energy.",
      },
    ],
  },

  "ClimeGrove Employee Emission Pack": {
    why: "Offices concentrate daily energy consumption through HVAC systems, lighting, computers, and shared facilities. Even routine workdays collectively create a measurable footprint.",
    stats: [
      {
        number: "15–25 kg CO₂",
        fact: "The average office worker generates 15–25 kg CO₂ per day through energy use and digital activity.",
      },
    ],
  },

  "Event Attendance – Day Pass": {
    why: "Travel to events often produces more emissions than the event itself. Offsetting attendance acknowledges the hidden footprint of gatherings and conferences.",
    stats: [
      {
        number: "70%",
        fact: "Research shows up to 70% of an event’s carbon footprint comes from attendee travel.",
      },
    ],
  },

  "Dinner Buffet – Premium": {
    why: "Dinner buffets combine energy-intensive cooking, refrigeration, and food waste. Micro-offsets allow diners to balance indulgence with climate responsibility.",
    stats: [
      {
        number: "1.5 kg CO₂",
        fact: "A typical buffet dinner generates 1.5 kg CO₂ per guest depending on menu and waste levels.",
      },
    ],
  },

  "Lunch Buffet – 4 Star (Non-Veg)": {
    why: "Meat-heavy meals carry significantly higher emissions due to livestock production and refrigeration. Offsetting helps address the higher carbon footprint of non-vegetarian dining.",
    stats: [
      {
        number: "5×",
        fact: "Meat dishes can produce up to 5× more emissions than plant-based meals.",
      },
    ],
  },

  "Lunch Buffet – 4 Star (Veg)": {
    why: "Plant-based meals generally have lower emissions than meat-based alternatives. Offsetting ensures even low-impact dining contributes to climate solutions.",
    stats: [
      {
        number: "50% lower",
        fact: "Vegetarian meals can have up to 50% lower emissions than meat-based meals.",
      },
    ],
  },

  "Breakfast Buffet – Veg": {
    why: "Breakfast buffets combine food preparation, heating equipment, refrigeration, and waste. Even simple morning meals accumulate energy use across large hotels.",
    stats: [
      {
        number: "0.8 kg CO₂",
        fact: "A hotel breakfast buffet can generate around 0.8 kg CO₂ per guest.",
      },
    ],
  },

  "Hotel Room Night – 4 Star": {
    why: "Hotel rooms require continuous energy for lighting, air conditioning, hot water, and laundry services. Offsetting helps balance the environmental cost of travel and comfort.",
    stats: [
      {
        number: "15–30 kg CO₂",
        fact: "A typical 4-star hotel stay emits 15–30 kg CO₂ per night.",
      },
    ],
  },
};

const EmitterPackDetails = () => {



const printRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

  const { id } = useParams();
  const [pack, setPack] = useState<CarbonPack | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const [isEditingProjects, setIsEditingProjects] = useState(false);
const [allProjects, setAllProjects] = useState<any[]>([]);
const [editableProjects, setEditableProjects] = useState<Project[]>([]);


const getProjectKey = (p: any) =>
  p.projectId || p.project_ref || p._id;


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
const normalizedProjects = json.data.projects.map((p: any) => ({
  ...p,
  projectId: String(p.projectId || p.project_ref || p._id ),
}));

setEditableProjects(normalizedProjects);

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


  const fetchAllProjects = async () => {
  const res = await fetch("https://microoffsets.nettzero.world/api/projects");
  const json = await res.json();
  if (json.success) {
    setAllProjects(json.data);
  }
};

const startEditProjects = async () => {
  await fetchAllProjects();
  setIsEditingProjects(true);
};


const cancelEditProjects = () => {
  setEditableProjects(pack!.projects);
  setIsEditingProjects(false);
};


const saveEditProjects = () => {
  setPack(prev =>
    prev
      ? {
          ...prev,
          projects: editableProjects,
        }
      : prev
  );
  setIsEditingProjects(false);
};


const recalcProjects = (projects: Project[]) => {
  const totalEmission = pack!.total_emission_kgco2e;

  const totalPrice = projects.reduce(
    (sum, p) => sum + p.price_per_kg,
    0
  );

  const updated = projects.map(p => {
    const allocation_percent = (p.price_per_kg / totalPrice) * 100;
    const allocated_emission_kgco2e =
      (allocation_percent / 100) * totalEmission;
    const allocated_cost = allocated_emission_kgco2e * p.price_per_kg;

    return {
      ...p,
      allocation_percent,
      allocated_emission_kgco2e,
      allocated_cost,
    };
  });

  const weighted_price_per_kg =
    updated.reduce(
      (sum, p) =>
        sum + p.price_per_kg * (p.allocation_percent / 100),
      0
    );

  const total_pack_price = updated.reduce(
    (sum, p) => sum + p.allocated_cost,
    0
  );

  setPack(prev =>
    prev
      ? {
          ...prev,
          weighted_price_per_kg,
          total_pack_price,
        }
      : prev
  );

  setEditableProjects(updated);
};



const toggleProject = (project: any) => {
  const projectId = String(project.projectId);

  const exists = editableProjects.some(
    p => String(getProjectKey(p)) === projectId
  );

  // 🚫 DO NOT ADD AGAIN
  if (exists) {
    // Only allow removal
    const updated = editableProjects.filter(
      p => String(getProjectKey(p)) !== projectId
    );
    recalcProjects(updated);
    return;
  }

  // ✅ ADD ONLY IF NOT EXISTS
  const updated = [
    ...editableProjects,
    {
      projectId,
      project_image_url: project.image,
      price_per_kg: project.pricePerKgCO2,
      allocation_percent: 0,
      allocated_emission_kgco2e: 0,
      allocated_cost: 0,
    },
  ];

  recalcProjects(updated);
};






  const handlePrint = () => {
  if (!printRef.current) return;

  const printContents = printRef.current.innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = `
    <html>
      <head>
        <title>Certificate</title>
        <style>
          body {
            font-family: ui-sans-serif, system-ui;
            padding: 10px;
          }
          @page {
            size: A4;
            margin: 20mm;
          }
        </style>
      </head>
      <body>${printContents}</body>
    </html>
  `;

  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
};


const buildProjectSnapshot = (dbProject: any) => {
  const existing = editableProjects.find(
    p => getProjectKey(p) === dbProject.projectId
  );



  return (
    existing || {
      projectId: dbProject.projectId,
      project_image_url: dbProject.image,
      price_per_kg: dbProject.pricePerKgCO2,
      allocation_percent: 0,
      allocated_emission_kgco2e: 0,
      allocated_cost: 0,
    }
  );
};


  const impact = PACK_IMPACT_CONTENT[pack.pack_name];

  return (

      <div className="bg-slate-50 min-h-screen font-sans text-slate-800 pb-20">
        <Header />
      <button
  onClick={() => navigate("/emitter-pack")} // or navigate(-1) if you want browser back
  className="fixed top-20 left-6 z-50 flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm hover:bg-slate-50 transition"
>
  <ArrowLeft className="w-4 h-4 text-slate-600"  />
  <span className="text-sm font-medium text-slate-700">Back to Packs</span>
</button>

      {/* ================= HEADER SECTION ================= */}
      <div className="relative w-full bg-white overflow-hidden">
        {/* Background Gradient/Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50/80 via-white/60 to-emerald-50/40 z-0" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-20 z-0 mask-image-linear-gradient" style={{WebkitMaskImage: "linear-gradient(to right, transparent, black)"}} />

        <div className="relative z-10 container mx-auto max-w-5xl px-6 pt-12 pb-16">
          <div className="inline-flex items-center gap-2 bg-teal-100/50 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide">
            Most Popular
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-gray-500">
            {pack.pack_name}
          </h1>
          
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-8 text-gray-500">
            {pack.description} <br/>
            Perfect for professionals looking to offset their workplace footprint.
          </p>

          <div className="flex items-center gap-4 text-sm text-slate-400 text-gray-500">
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
            <h2 className="text-2xl font-bold text-slate-800 text-gray-500">Why This Pack Matters?</h2>
          </div>
          
          <p className="text-slate-600 mb-8 leading-relaxed text-gray-500">
  {impact?.why ||
    "Everyday activities generate hidden emissions. Offsetting helps balance their environmental impact."}
</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-500">
  {(impact?.stats || []).map((stat: any, i: number) => (
    <div
      key={i}
      className="bg-slate-50 p-6 rounded-2xl border border-slate-100"
    >
      <div className="text-3xl font-bold text-slate-800 mb-2">
        {stat.number}
      </div>

      <div className="text-sm text-slate-500">{stat.fact}</div>
    </div>
  ))}
</div>
        </div>

        {/* ================= EMITTERS IN THIS PACK ================= */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-gray-500">Emitters in This Pack</h2>
            <span className="text-sm text-gray-500">{pack.emitters.length} activities included</span>
          </div>

          <div className="grid gap-4 text-gray-500">
            {pack.emitters.map((emitter, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-emerald-200 transition-colors bg-white">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-500">
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
                <div className="font-bold text-slate-700 text-right text-gray-500">
                  {emitter.calculated_emission_kgco2e.toFixed(2)} <span className="text-xs font-normal text-slate-400 block sm:inline">kg CO₂e</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center pt-6 border-t border-slate-100">
            <div>
              <div className="font-bold text-lg text-gray-500">Total Monthly Emissions</div>
              <div className="text-sm text-gray-500">Calculated sum of all emitters</div>
            </div>
            <div className="text-3xl font-bold text-emerald-600">
              {pack.total_emission_kgco2e.toFixed(2)} <span className="text-lg text-slate-500">kg CO₂e</span>
            </div>
          </div>
        </div>

        {/* ================= EQUIVALENCIES (Dynamic) ================= */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
           <h2 className="text-2xl font-bold text-gray-500 mb-2">
            What Does {pack.total_emission_kgco2e.toFixed(2)} kg CO₂e Mean?
           </h2>
           <p className="text-slate-500 mb-8 text-gray-500">To help visualize the impact, here's what your emissions are equivalent to:</p>

           <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-gray-500">
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
            <h2 className="text-3xl font-bold text-slate-800 mb-4 text-gray-500">Ready to Offset This Pack?</h2>
            <p className="text-slate-600 mb-6 text-gray-500">
              Your contribution directly funds verified carbon removal projects. Every kilogram matters in the fight against climate change.
            </p>
            <div className="flex flex-col gap-2 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />100% Verified
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-500" />Certificate Included
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
               <button
  onClick={() => navigate(`/checkout/${pack._id}?qty=${quantity}`)}
  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
>
  Offset Now <ArrowRight className="w-4 h-4" />
</button>
             </div>
          </div>

        </div>

     {/* ================= CERTIFICATE PREVIEW ================= */}
     <div ref={printRef}>
<div className="bg-emerald-50/40 rounded-3xl p-10 border border-emerald-100">
  <div className="bg-white max-w-3xl mx-auto rounded-2xl border-2 border-emerald-200 shadow-sm px-14 py-12 relative">

    {/* Header */}
    <div className="flex items-center justify-between mb-10">
      <div className="text-2xl font-serif text-slate-700 tracking-wide">
        NettZero<span className="text-emerald-500">.</span>
      </div>
      {/* <div className="text-sm text-slate-500">
        PURO.earth Registry Partner
      </div> */}
      <div className="text-sm text-slate-400">
        ClimeGroove
      </div>
    </div>

    {/* Title */}
    <div className="text-center mb-10">
      <div className="text-xs tracking-widest uppercase text-slate-400 mb-2">
        Emissions Retirement Certificate
      </div>
      <h2 className="text-lg font-semibold text-slate-800">
        Carbon Dioxide Removal Verification
      </h2>
    </div>

    {/* Main Content */}
    <div className="text-center space-y-4">
      <div className="text-slate-500">This certifies that</div>

      <div className="text-2xl font-bold text-slate-900">
        Priya Sharma
      </div>

      <div className="text-slate-500">
        has successfully retired
      </div>

      <div className="text-4xl font-extrabold text-emerald-500 mt-4">
        {(pack.total_emission_kgco2e * quantity).toFixed(1)} kg CO₂e
      </div>

      <div className="text-sm text-slate-400">
        through verified Carbon Dioxide Removal
      </div>
    </div>

    {/* Middle Meta Row */}
    <div className="grid grid-cols-3 items-center gap-6 mt-12 text-sm">
      <div>
        <div className="text-slate-400">Coin Pack</div>
        <div className="font-medium text-slate-700">
          {pack.pack_name}
        </div>
      </div>

      {/* QR */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 border rounded-xl flex items-center justify-center bg-slate-50">
          {/* <div className="grid grid-cols-3 gap-1 w-12 h-12">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-slate-400 rounded-sm"></div>
            ))}
          </div> */}
          <img src="data:image/png;base64,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" alt="" />
        </div>
        <div className="text-xs text-slate-400 mt-2">
          Scan to verify offset impact
        </div>
      </div>

      <div className="text-right">
        <div className="text-slate-400">Certificate ID</div>
        <div className="font-mono font-semibold text-slate-700">
          NZ-2026-BC-XXXXX
        </div>
      </div>
    </div>

    {/* Divider */}
    <div className="my-12 border-t border-slate-200" />

    {/* Footer */}
    <div className="flex justify-between items-end">
      <div>
        <div className="font-serif text-lg text-slate-700 italic">
          Gautam Shiknis
        </div>
        <div className="text-sm font-semibold text-slate-800">
          Gautam Shiknis
        </div>
        <div className="text-xs text-slate-500">
          Chairman<br />
          NettZero Environmental Advisory<br />
          Technologies Pvt. Ltd.
        </div>
      </div>

      <div className="flex gap-6 text-sm text-emerald-600">
        {/* <span className="flex items-center gap-1 cursor-pointer hover:underline">
          🔗 Shareable
        </span> */}
       <span
  onClick={handlePrint}
  className="flex items-center gap-1 cursor-pointer hover:underline"
>
  🖨️ Print Ready
</span>

      </div>
    </div>

  </div>
</div>
</div>

        {/* ================= PROJECTS SECTION ================= */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <div>
               <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2 text-gray-500">
                 <Leaf className="text-emerald-500"/> What Your Offset Supports
               </h2>
               <p className="text-slate-500 text-sm text-gray-500">Your contribution is distributed across these verified CDR projects</p>
            </div>

              {/* <div className="flex gap-2">
    {!isEditingProjects ? (
      <button
  onClick={startEditProjects}
  className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow"
>
  Edit Projects
</button>

    ) : (
      <>
        <button
          onClick={saveEditProjects}
          className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm"
        >
          Save
        </button>
        <button
          onClick={cancelEditProjects}
          className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 text-sm"
        >
          Cancel
        </button>
      </>
    )}
  </div> */}
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
            {!isEditingProjects ? (
  pack.projects.map((proj, i) => (
    <ProjectCard key={i} project={proj} />
  ))
) : (
 allProjects.map(dbProject => {
  const selected = editableProjects.some(
    p => getProjectKey(p) === dbProject.projectId
  );

  const projectSnapshot = buildProjectSnapshot(dbProject);

  return (
    <EditableProjectCard
      key={dbProject.projectId}
      project={projectSnapshot}
      selected={selected}
      onToggle={() => toggleProject(dbProject)}
    />
  );
})

)}

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
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card card-hover text-gray-500">
      
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.project_image_url}
          alt={project.projectId}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay (same as original section) */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* Contribution badge */}
        <div className="absolute top-4 right-4 rounded-full bg-orange-500 text-white text-xs font-semibold px-3 py-1 shadow">
          {project.allocation_percent.toFixed(0)}% contribution
        </div>

        {/* CDR badge */}
        <div className="absolute top-4 left-4 rounded-full bg-emerald px-3 py-1 text-xs font-bold text-white">
          CDR
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-foreground text-lg text-gray-500">
          {project.projectId}
        </h3>

        <p className="text-sm text-muted-foreground leading-snug">
          Capturing CO₂ through verified carbon removal solutions.
        </p>

        {/* Progress */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Emission allocated</span>
            <span className="text-gray-500">{project.allocated_emission_kgco2e.toFixed(2)} kg CO₂e</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald to-sky transition-all duration-500"
              style={{ width: `${project.allocation_percent}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex gap-1">
            {[13, 15, 12].map((n) => (
              <span
                key={n}
                className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold"
              >
                {n}
              </span>
            ))}
          </div>

          <div className="text-right">
            <div className="text-xl font-bold text-foreground text-gray-500">
              ₹{project.price_per_kg}
              <span className="text-xs text-muted-foreground font-normal ml-1">
                / kg CO₂
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              ₹{project.allocated_cost.toFixed(2)} allocated
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const EditableProjectCard = ({
  project,
  selected,
  onToggle,
}: {
  project: any;
  selected: boolean;
  onToggle: () => void;
}) => {
  return (
    <div
      className={`relative transition ${
        selected
          ? "ring-2 ring-emerald-500 rounded-2xl"
          : "opacity-90 hover:opacity-100"
      }`}
    >
      {/* Checkbox */}
      <div className="absolute top-4 right-4 z-20">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="w-5 h-5 accent-emerald-600 cursor-pointer"
        />
      </div>

      {/* Disable card click if already selected */}
      <div
        onClick={!selected ? onToggle : undefined}
        className={selected ? "cursor-not-allowed" : "cursor-pointer"}
      >
        <ProjectCard project={project} />
      </div>
    </div>
  );
};



export default EmitterPackDetails;