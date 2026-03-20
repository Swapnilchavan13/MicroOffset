import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  
  // State variables for Pack logic
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [packs, setPacks] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);
  const [showPackDetails, setShowPackDetails] = useState<boolean>(false);

  const [analytics, setAnalytics] = useState<any>(null);

useEffect(() => {
  const fetchAnalytics = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      if (!parsedUser) return;

      const res = await fetch(
        `https://microoffsets.nettzero.world/api/user-full-data/${parsedUser._id}`
      );

      const data = await res.json();
      setAnalytics(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  fetchAnalytics();
}, []);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getProfile = async () => {
      try {
        const res = await fetch("https://microoffsets.nettzero.world/api/profile", {
         headers: {
    "Content-Type": "application/json",
    Authorization: token, // ✅ REQUIRED
  },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    const getPacks = async () => {
      try {
        const res = await fetch("https://microoffsets.nettzero.world/api/getemitterpacks");
        const data = await res.json();
        
        if (data.success) {
          setPacks(data.data);
          
          // Extract unique categories from all emitters in all packs
          const allCategories = new Set<string>();
          data.data.forEach((pack: any) => {
            pack.emitters?.forEach((emitter: any) => {
              if (emitter.category) allCategories.add(emitter.category);
            });
          });
          setCategories(Array.from(allCategories));
        }
      } catch (error) {
        console.error("Failed to fetch packs:", error);
      }
    };

    getProfile();
    getPacks();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setSelectedPackId(null);
    setShowPackDetails(false);
  };

  const togglePackSelection = (packId: string) => {
    if (selectedPackId === packId) {
      setSelectedPackId(null);
      setShowPackDetails(false);
    } else {
      setSelectedPackId(packId);
      setShowPackDetails(false);
    }
  };
const handleGenerateApi = async () => {
  if (!selectedPackId) {
    alert("No pack selected");
    return;
  }

  try {
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    console.log("USER:", parsedUser);
    console.log("PACK:", selectedPackId);

    const res = await fetch("https://microoffsets.nettzero.world/api/generate-pack-api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: parsedUser?._id,
        packId: selectedPackId,
      }),
    });

    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    const data = JSON.parse(text);

    console.log("PARSED:", data);

    if (data.success) {
      alert("✅ API Generated!");
      window.location.reload();
    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    console.error("ERROR:", err);
    alert("Something broke. Check console.");
  }
};

  const filteredPacks = packs.filter((pack) => {
    if (selectedCategories.length === 0) return true;
    return pack.emitters?.some((emitter: any) =>
      selectedCategories.includes(emitter.category)
    );
  });

  const selectedPackDetails = packs.find((p) => p._id === selectedPackId);

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      {user && (
        <div className="bg-white p-6 rounded-xl border mb-10 shadow-sm">
          <h2 className="text-xl font-medium mb-4 border-b pb-2">Profile Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <p><b>Name:</b> {user.name}</p>
            <p><b>Mobile:</b> {user.mobile}</p>
            <p><b>Industry:</b> {user.industry}</p>
            <p><b>Location:</b> {user.location}</p>
            <p><b>Email:</b> {user.email}</p>
          </div>
        </div>
      )}

     {loadingAnalytics ? (
  <p className="text-gray-500">Loading analytics...</p>
) : (
  analytics && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-gray-500">Total APIs</h3>
      <p className="text-3xl font-bold">
        {analytics?.generatedApis?.length || 0}
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-gray-500">Total Transactions</h3>
      <p className="text-3xl font-bold">
        {analytics.transactions.length}
      </p>
    </div>

    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-gray-500">Total Revenue</h3>
      <p className="text-3xl font-bold">
        ₹ {analytics?.transactions?.reduce(
  (sum: number, t: any) => sum + (t.amount || 0),
  0
) || 0}
      </p>
    </div>

  </div>
)
)}


{analytics?.generatedApis?.map((api: any) => (
  <div key={api._id} className="bg-white p-4 rounded-lg mb-4 shadow flex justify-between items-center">
    
    <div>
      <p className="font-bold">Pack ID: {api.packId}</p>
      <p className="text-blue-600 text-sm">{api.link}</p>
    </div>

    <button
      onClick={() => {
        navigator.clipboard.writeText(api.link);
        alert("📋 Link Copied!");
      }}
      className="bg-gray-800 text-white px-3 py-1 rounded"
    >
      Copy
    </button>

  </div>
))}

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Register your COIN PACK</h2>

        <div className="mb-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Select your offset area</h3>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                <span className="text-gray-700">{category}</span>
              </label>
            ))}
            {categories.length === 0 && <p className="text-sm text-gray-500">Loading areas...</p>}
          </div>
        </div>

        {selectedCategories.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 uppercase">Choose existing coin packs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPacks.length > 0 ? (
                filteredPacks.map((pack) => {
                  const isSelected = selectedPackId === pack._id;
                  const isGrayedOut = selectedPackId !== null && !isSelected;

                  return (
                    <div
                      key={pack._id}
                      className={`border p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                        isSelected ? "border-blue-500 ring-2 ring-blue-200 bg-blue-50" : "border-gray-200 hover:shadow-md"
                      } ${isGrayedOut ? "opacity-40 grayscale" : "opacity-100"}`}
                      onClick={() => togglePackSelection(pack._id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="w-5 h-5 mt-1"
                            checked={isSelected}
                            readOnly
                          />
                          <div>
                            <h4 className="font-bold text-lg">{pack.pack_name}</h4>
                            <p className="text-sm text-gray-500">{pack.packType}</p>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm text-gray-600 line-clamp-2">{pack.description}</p>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">No packs found for selected areas.</p>
              )}
            </div>
          </div>
        )}

        {/* Actions for Selected Pack */}
        {selectedPackId && selectedPackDetails && (
          <div className="mb-8 flex flex-col items-start gap-4 p-6 bg-blue-50 border border-blue-100 rounded-lg">
            <button
              onClick={() => setShowPackDetails(!showPackDetails)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors"
            >
              {showPackDetails ? "HIDE PACK DETAILS" : "PACK DETAILS"}
            </button>

            {/* FULL PACK DETAILS VIEW */}
            {showPackDetails && (
              <div className="w-full bg-white p-6 rounded-xl border mt-4 shadow-md">
                
                {/* Header and Main Image */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  {selectedPackDetails.image_url && (
                    <img 
                      src={selectedPackDetails.image_url.startsWith('http') ? selectedPackDetails.image_url : `https://microoffsets.nettzero.world/api${selectedPackDetails.image_url}`} 
                      alt={selectedPackDetails.pack_name} 
                      className="w-full md:w-1/3 h-56 object-cover rounded-lg shadow-sm border"
                      onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="text-3xl font-bold text-gray-800 mb-2">{selectedPackDetails.pack_name}</h4>
                    <p className="text-gray-600 mb-6 text-lg">{selectedPackDetails.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-lg border">
                      <p><span className="font-semibold text-gray-500 uppercase">Type:</span> <br/>{selectedPackDetails.packType}</p>
                      <p><span className="font-semibold text-gray-500 uppercase">Intended Buyer:</span> <br/>{selectedPackDetails.intendedBuyer}</p>
                      <p><span className="font-semibold text-gray-500 uppercase">Duration:</span> <br/>{selectedPackDetails.duration}</p>
                      <p><span className="font-semibold text-gray-500 uppercase">Status:</span> <br/><span className="capitalize text-green-600 font-medium">{selectedPackDetails.status}</span></p>
                    </div>
                  </div>
                </div>

                {/* Financial and Emission Summary Grid */}
                <div className="bg-blue-900 text-white p-6 rounded-xl mb-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center shadow-inner">
                  <div>
                    <p className="text-xs text-blue-200 font-semibold uppercase tracking-wider mb-1">Total Emission</p>
                    <p className="text-2xl font-bold">{selectedPackDetails.total_emission_kgco2e.toFixed(2)} kg CO₂e</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 font-semibold uppercase tracking-wider mb-1">Weighted Price</p>
                    <p className="text-2xl font-bold">{selectedPackDetails.currency} {selectedPackDetails.weighted_price_per_kg.toFixed(2)} <span className="text-sm font-normal">/ kg</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 font-semibold uppercase tracking-wider mb-1">Total Pack Price</p>
                    <p className="text-2xl font-bold text-green-400">{selectedPackDetails.currency} {selectedPackDetails.total_pack_price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 font-semibold uppercase tracking-wider mb-1">Version Info</p>
                    <p className="text-2xl font-bold">v{selectedPackDetails.version}</p>
                  </div>
                </div>

                {/* Emitters Section */}
                <div className="mb-8">
                  <h5 className="text-xl font-bold text-gray-800 border-b-2 border-gray-100 pb-2 mb-4">Included Emitters</h5>
                  <div className="overflow-x-auto rounded-lg border">
                    <table className="min-w-full text-sm text-left text-gray-600">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                          <th className="px-4 py-3">Emitter Name</th>
                          <th className="px-4 py-3">Sector & Category</th>
                          <th className="px-4 py-3 text-right">Quantity</th>
                          <th className="px-4 py-3 text-right">Emission (kg CO₂e)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedPackDetails.emitters.map((em: any, index: number) => (
                          <tr key={em.emitter_id || index} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">{em.emitter_name_standard}</td>
                            <td className="px-4 py-3">
                              <span className="font-semibold">{em.sector}</span> &rarr; {em.category}
                              <br /><span className="text-xs text-gray-400">{em.sub_category}</span>
                            </td>
                            <td className="px-4 py-3 text-right">{em.quantity} {em.unit}</td>
                            <td className="px-4 py-3 text-right font-bold text-gray-800">{em.calculated_emission_kgco2e.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Projects Section */}
                <div className="mb-8">
                  <h5 className="text-xl font-bold text-gray-800 border-b-2 border-gray-100 pb-2 mb-4">Supported Projects</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPackDetails.projects.map((proj: any) => (
                      <div key={proj.project_ref} className="flex flex-col sm:flex-row gap-4 border p-4 rounded-xl bg-gray-50 hover:shadow-md transition-shadow">
                        {proj.project_image_url && (
                          <img 
                            src={proj.project_image_url} 
                            alt={proj.projectId} 
                            className="w-full sm:w-32 h-32 object-cover rounded-lg border bg-white"
                            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/150x150?text=Project+Img'; }}
                          />
                        )}
                        <div className="flex flex-col justify-center flex-1">
                          <span className="block font-bold text-gray-900 text-lg mb-2">{proj.projectId}</span>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-sm text-gray-700">
                            <p className="bg-white p-2 rounded border"><span className="text-xs text-gray-500 block uppercase">Allocation</span> <span className="font-bold">{proj.allocation_percent}%</span></p>
                            <p className="bg-white p-2 rounded border"><span className="text-xs text-gray-500 block uppercase">Price/kg</span> <span className="font-bold">{selectedPackDetails.currency} {proj.price_per_kg.toFixed(2)}</span></p>
                            <p className="bg-white p-2 rounded border"><span className="text-xs text-gray-500 block uppercase">Allocated Emission</span> <span className="font-bold">{proj.allocated_emission_kgco2e.toFixed(2)} kg</span></p>
                            <p className="bg-white p-2 rounded border"><span className="text-xs text-gray-500 block uppercase">Allocated Cost</span> <span className="font-bold text-green-600">{selectedPackDetails.currency} {proj.allocated_cost.toFixed(2)}</span></p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Action Button */}
                <div className="pt-6 border-t flex justify-end">
                  <button
                    onClick={handleGenerateApi}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <span>Generate API Configuration</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </button>
                </div>
                
              </div>
            )}
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">Don't see what you are looking for?</p>
          <button
            onClick={() => navigate('/create-pack')}
            className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-bold px-6 py-3 rounded-lg transition-colors"
          >
            CREATE YOUR OWN PACK
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;