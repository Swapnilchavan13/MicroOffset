import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BuyPack = () => {
  const { apiKey } = useParams();

  const [pack, setPack] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    fetch(`https://microoffsets.nettzero.world/api/public-pack/${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        setPack(data.pack);
        setLoading(false);
      });
  }, [apiKey]);

  const handleBuy = async () => {
    const res = await fetch(`https://microoffsets.nettzero.world/api/buy-pack/${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Purchase Successful!");
    }
  };

 if (loading) return <p className="text-center mt-10">Loading...</p>;

return (
  <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-5xl">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {pack.image_url && (
          <img
            src={
              pack.image_url.startsWith("http")
                ? pack.image_url
                : `https://microoffsets.nettzero.world/api${pack.image_url}`
            }
            alt={pack.pack_name}
            className="w-full md:w-1/3 h-56 object-cover rounded-lg border"
          />
        )}

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{pack.pack_name}</h1>
          <p className="text-gray-600 mb-4">{pack.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm bg-gray-100 p-4 rounded">
            <p><b>Type:</b> {pack.packType}</p>
            <p><b>Buyer:</b> {pack.intendedBuyer}</p>
            <p><b>Duration:</b> {pack.duration}</p>
            <p><b>Status:</b> {pack.status}</p>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-blue-900 text-white p-6 rounded-xl mb-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-sm">Total Emission</p>
          <p className="text-xl font-bold">
            {pack.total_emission_kgco2e?.toFixed(2)} kg
          </p>
        </div>

        <div>
          <p className="text-sm">Price/kg</p>
          <p className="text-xl font-bold">
            {pack.currency} {pack.weighted_price_per_kg?.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-sm">Total Price</p>
          <p className="text-xl font-bold text-green-400">
            {pack.currency} {pack.total_pack_price?.toFixed(2)}
          </p>
        </div>

        <div>
          <p className="text-sm">Version</p>
          <p className="text-xl font-bold">v{pack.version}</p>
        </div>
      </div>

      {/* EMITTERS */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Emitters</h2>
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-right">Qty</th>
                <th className="p-3 text-right">Emission</th>
              </tr>
            </thead>
            <tbody>
              {pack.emitters?.map((em: any, i: number) => (
                <tr key={i} className="border-t">
                  <td className="p-3">{em.emitter_name_standard}</td>
                  <td className="p-3">{em.category}</td>
                  <td className="p-3 text-right">{em.quantity}</td>
                  <td className="p-3 text-right font-bold">
                    {em.calculated_emission_kgco2e?.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PROJECTS */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Projects</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {pack.projects?.map((proj: any) => (
            <div key={proj.project_ref} className="border p-4 rounded-lg flex gap-4">
              {proj.project_image_url && (
                <img
                  src={proj.project_image_url}
                  className="w-24 h-24 object-cover rounded"
                />
              )}

              <div>
                <p className="font-bold">{proj.projectId}</p>
                <p className="text-sm">Allocation: {proj.allocation_percent}%</p>
                <p className="text-sm">
                  Cost: {pack.currency} {proj.allocated_cost}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BUY FORM */}
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Enter Details</h2>

        <div className="space-y-4">
          <input
            placeholder="Name"
            className="w-full border p-3 rounded"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            className="w-full border p-3 rounded"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Mobile"
            className="w-full border p-3 rounded"
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />

          <button
            onClick={handleBuy}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-bold"
          >
            Buy Now - {pack.currency} {pack.total_pack_price}
          </button>
        </div>
      </div>

    </div>
  </div>
);
}

export default BuyPack;