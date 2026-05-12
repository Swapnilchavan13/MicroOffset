import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";

const ProjectCheckoutPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const project = state?.project;

  const [packs, setPacks] = useState([]);
  const [selectedPack, setSelectedPack] = useState(null);
  const [fullContribution, setFullContribution] = useState(false);
  const [activePack, setActivePack] = useState(null);

  // FETCH PACKS
  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const res = await fetch(
          "https://microoffsets.nettzero.world/api/getemitterpacks"
        );
        const data = await res.json();

        if (data.success) {
          const filtered = data.data.filter((pack) =>
            pack.projects?.some(
              (p) =>
                p.project_ref === project._id ||
                p.projectId === project.projectId
            )
          );

          const top3 = filtered.slice(0, 4);
          setPacks(top3);
          setSelectedPack(top3[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (project) fetchPacks();
  }, [project]);

  if (!project) return <div className="p-6">No project selected</div>;

  // 💳 DUMMY RAZORPAY
  const handlePayment = async () => {
  try {
    if (!selectedPack) return;

    const projectData = selectedPack.projects.find(
      (p) =>
        p.project_ref === project._id ||
        p.projectId === project.projectId
    );

 const amount = Number(
  fullContribution
    ? selectedPack.total_pack_price
    : projectData?.allocated_cost
);

    // 1️⃣ CREATE ORDER
    const orderRes = await fetch(
      "https://microoffsets.nettzero.world/api/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          packId: selectedPack._id,
          quantity: 1,
        }),
      }
    );

    const orderData = await orderRes.json();

    if (!orderData.success) {
      alert("Order creation failed");
      return;
    }
    console.log(orderData);

    // 2️⃣ OPEN RAZORPAY
    const options = {
     key: "rzp_test_SoKde6zgfgB32q",

      amount: orderData.order.amount,
      currency: "INR",
      name: "COIN",
      description: selectedPack.pack_name,

      order_id: orderData.order.id,

      handler: async function (response) {

        // 3️⃣ VERIFY PAYMENT & STORE IN DB
        const verifyRes = await fetch(
          "https://microoffsets.nettzero.world/api/verify-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,

              packId: selectedPack._id,

              quantity: 1,

             userDetails: {
  name: "Test User",
  email: "test@example.com",
  phone: "9999999999",

  projectId: project.projectId,
  projectTitle: project.title,
},
            }),
          }
        );

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          alert("✅ Payment Successful");

          navigate("/success");
        } else {
          alert("Payment verification failed");
        }
      },

      prefill: {
        name: "",
        email: "",
        contact: "",
      },

      theme: {
        color: "#16a34a",
      },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert("Razorpay SDK not loaded");
    }

  } catch (error) {
    console.error(error);
    alert("Payment failed");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <Header />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {/* LEFT PROJECT */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <img
            src={project.image}
            className="h-56 w-full object-cover"
          />

          <div className="p-6 space-y-3">
            <h2 className="text-2xl font-bold">{project.title}</h2>

            <p className="text-sm text-gray-500">
              📍 {project.location}
            </p>

            <p className="text-sm text-gray-600">
              {project.description}
            </p>

            <div className="flex gap-2 flex-wrap text-xs mt-2">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                ✔ {project.verifiedBy}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded-full">
                {project.projectType}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT PACKS */}
        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">

          <h3 className="text-lg font-semibold">Choose a Pack</h3>
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

          {packs.map((pack) => {
            const projectData = pack.projects.find(
              (p) =>
                p.project_ref === project._id ||
                p.projectId === project.projectId
            );

            const contribution = fullContribution
              ? pack.total_pack_price
              : projectData?.allocated_cost;

            return (
              <div
                key={pack._id}
                className={`border rounded-xl p-4 transition ${
                  selectedPack?._id === pack._id
                    ? "border-green-500 bg-green-50"
                    : ""
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={selectedPack?._id === pack._id}
                    onChange={() => {
                      setSelectedPack(pack);
                      setFullContribution(false);
                    }}
                    />

                  <img
                    src={`https://microoffsets.nettzero.world/api${pack.image_url}`}
                    className="w-14 h-14 rounded-lg cursor-pointer"
                    onClick={() => setActivePack(pack)}
                    />

                  <div
                    className="flex-1 cursor-pointer"
                    onClick={() => setActivePack(pack)}
                    >
                    <p className="font-semibold">{pack.pack_name}</p>
                    <p className="text-xs text-gray-500">
                      ₹ {pack.total_pack_price}
                    </p>
                  </div>
                </div>

                {/* CONTRIBUTION */}
                <div className="mt-3 bg-gray-50 p-3 rounded-lg text-xs">
                  🌱 Contribution: <b>₹ {contribution}</b>

                  <button
                    onClick={() => setFullContribution(!fullContribution)}
                    className="block text-green-600 underline mt-1"
                    >
                    {fullContribution
                      ? "Use default allocation"
                      : "Make 100% contribution"}
                  </button>
                </div>
              </div>
            );
          })}
          </div>

          {/* TOTAL */}
          {selectedPack && (
            <div className="bg-gray-100 p-4 rounded-xl flex justify-between font-semibold">
              <span>Total</span>
              <span>
                ₹{" "}
                {fullContribution
                  ? selectedPack.total_pack_price
                  : selectedPack.projects.find(
                      (p) =>
                        p.project_ref === project._id ||
                        p.projectId === project.projectId
                    )?.allocated_cost}
              </span>
            </div>
          )}

          <button
            onClick={handlePayment}
            className="w-full bg-green-500 text-white py-3 rounded-full font-semibold"
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* 🔥 MODAL */}
      {activePack && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-3xl rounded-2xl p-6 overflow-y-auto max-h-[90vh]">

            <button
              onClick={() => setActivePack(null)}
              className="float-right text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-2">
              {activePack.pack_name}
            </h2>

            <img
              src={`https://microoffsets.nettzero.world/api${activePack.image_url}`}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />

            <p className="text-gray-600 mb-4">
              {activePack.description}
            </p>

            {/* EMITTERS */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Emitters</h4>
              {activePack.emitters.map((e, i) => (
                <div key={i} className="text-sm border-b py-2">
                  {e.emitter_name_standard} —{" "}
                  {e.calculated_emission_kgco2e} kgCO₂
                </div>
              ))}
            </div>

            {/* PROJECTS */}
            <div>
              <h4 className="font-semibold mb-2">
                Project Allocation
              </h4>

              {activePack.projects.map((p, i) => {
                const isSelected =
                  p.project_ref === project._id ||
                  p.projectId === project.projectId;

                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-2 rounded-lg text-sm ${
                      isSelected
                        ? "bg-green-100 border border-green-400"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={p.project_image_url}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <span>{p.projectId}</span>
                    </div>

                    <span>{p.allocation_percent}%</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 font-semibold text-right">
              Total: ₹ {activePack.total_pack_price}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCheckoutPage;