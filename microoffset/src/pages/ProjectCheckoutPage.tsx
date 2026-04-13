import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const ProjectCheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const project = state?.project;

  const [coins, setCoins] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [showFullDesc, setShowFullDesc] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!project) {
    return (
      <div className="p-6 text-center">
        <p className="mb-4">No project selected</p>
        <button
          onClick={() => navigate("/projects")}
          className="bg-green-600 px-4 py-2 rounded-full"
        >
          Browse Projects
        </button>
      </div>
    );
  }

  const total = coins * project.pricePerKgCO2;

  const isValid = name && email && phone && coins > 0;

  const handleSubmit = () => {
    setSubmitted(true);
    if (!isValid) return;

    alert("Purchase successful (mock)");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 px-4">
      
      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-gray-500 text-sm">
          Complete your purchase securely
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        
        {/* LEFT */}
       <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
  <img
    src={project.image}
    alt={project.title}
    className="h-56 w-full object-cover"
  />

  <div className="p-6 space-y-4">
    
    {/* Title */}
    <h2 className="text-xl font-bold leading-tight">
      {project.title}
    </h2>

    {/* Meta */}
    <p className="text-sm text-gray-500">
      📍 {project.location}
    </p>

    <p className="text-xs text-gray-400">
      By <span className="font-medium text-gray-600">{project.projectDeveloper}</span>
    </p>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 text-xs">
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
        ✔ Verified by {project.verifiedBy}
      </span>

      <span className="bg-gray-100 px-3 py-1 rounded-full">
        {project.typeOfProject}
      </span>

      <span className="bg-gray-100 px-3 py-1 rounded-full">
        {project.projectType}
      </span>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 gap-3 text-sm mt-3">
      <div className="bg-gray-50 p-3 rounded-xl">
        <p className="text-gray-500 text-xs">Available</p>
        <p className="font-semibold">
          {project.available?.toLocaleString()}
        </p>
      </div>

      <div className="bg-gray-50 p-3 rounded-xl">
        <p className="text-gray-500 text-xs">Retired</p>
        <p className="font-semibold">
          {project.retired?.toLocaleString()}
        </p>
      </div>

      <div className="bg-gray-50 p-3 rounded-xl col-span-2">
        <p className="text-gray-500 text-xs">CO₂ Avoided</p>
        <p className="font-semibold">
          {project.co2Avoided?.toLocaleString()} kg
        </p>
      </div>
    </div>

    {/* Highlights */}
    {project.projectHighlighters?.length > 0 && (
      <div>
        <p className="text-sm font-medium mb-2">Highlights</p>
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          {project.projectHighlighters.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    )}

    {/* SDGs */}
    {project.sdgs?.length > 0 && (
      <div>
        <p className="text-sm font-medium mb-2">SDGs Supported</p>
        <div className="flex flex-wrap gap-2 text-xs">
          {project.sdgs.map((sdg) => (
            <span
              key={sdg}
              className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full"
            >
              SDG {sdg}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Description */}
    <div className="text-sm text-gray-600">
      {showFullDesc
        ? project.description
        : `${project.description?.slice(0, 150)}...`}

      <button
        onClick={() => setShowFullDesc(!showFullDesc)}
        className="ml-2 text-green-600 text-xs underline"
      >
        {showFullDesc ? "Show less" : "Read more"}
      </button>
    </div>
  </div>
</div>

        {/* RIGHT */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-5">
          
          {/* Coins */}
          <div>
            <p className="text-sm mb-2">Coins</p>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
              <button onClick={() => setCoins((c) => Math.max(1, c - 1))}>−</button>
              <span className="font-semibold">{coins}</span>
              <button onClick={() => setCoins((c) => c + 1)}>+</button>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-3">
            
            <div>
              <input
                type="text"
                placeholder="Full Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-3 rounded-xl border ${
                  submitted && !name ? "border-red-500" : "border-gray-200"
                }`}
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full p-3 rounded-xl border ${
                  submitted && !email ? "border-red-500" : "border-gray-200"
                }`}
              />
            </div>

            <div>
              <input
                type="tel"
                placeholder="Contact Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full p-3 rounded-xl border ${
                  submitted && !phone ? "border-red-500" : "border-gray-200"
                }`}
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-4 text-sm">
            <div className="flex justify-between">
              <span>Coins</span>
              <span>{coins}</span>
            </div>

            <div className="flex justify-between">
              <span>Price</span>
              <span>
                {project.pricePerKgCO2} {project.currency}
              </span>
            </div>

            <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>
                {total.toFixed(2)} {project.currency}
              </span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full py-3 rounded-full font-semibold transition ${
              isValid
                ? "bg-gradient-to-r from-green-400 to-green-600 text-black hover:scale-[1.02]"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Confirm & Send Coins
          </button>

          <button
            onClick={() => navigate(-1)}
            className="text-xs text-gray-500 underline w-full"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCheckoutPage;