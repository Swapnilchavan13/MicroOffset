import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

interface CarbonPack {
  _id: string;
  pack_name: string;
  description: string;
  total_emission_kgco2e: number;
  total_pack_price: number;
  currency: string;
}

const CheckoutPage = () => {

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const quantity = Number(searchParams.get("qty") || 1);

  const navigate = useNavigate();

  const [pack, setPack] = useState<CarbonPack | null>(null);
  const [loading, setLoading] = useState(true);

  const [showPopup, setShowPopup] = useState(false);
  const [toast, setToast] = useState(false);
  const [countdown, setCountdown] = useState(10);


const [form, setForm] = useState({
  name: "",
  email: "",
  phone: "",
  utr: "",
  upi: "", // ✅ NEW
});

const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const fetchPack = async () => {
      try {
        const res = await fetch(
          `https://microoffsets.nettzero.world/api/getemitterpacks/${id}`
        );
        const json = await res.json();

        if (json.success) {
          setPack(json.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPack();
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!pack) return <div className="p-10">Pack not found</div>;

  const total = (pack.total_pack_price * quantity).toFixed(2);


const validateForm = () => {
  const newErrors: any = {};

  if (!form.name.trim()) newErrors.name = "Name is required";
  if (!form.email.trim()) newErrors.email = "Email is required";
  if (!form.phone.trim()) newErrors.phone = "Phone is required";

  // ✅ At least one required
  if (!form.utr.trim() && !form.upi.trim()) {
    newErrors.payment = "Enter UTR number or UPI ID";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};



const handleSubmit = () => {
  if (!validateForm()) return; // ❌ STOP if invalid

  setShowPopup(false);
  setToast(true);
  setCountdown(10);

  let time = 10;

  const interval = setInterval(() => {
    time -= 1;
    setCountdown(time);

    if (time === 0) {
      clearInterval(interval);
      navigate("/emitter-pack");
    }
  }, 1000);
};

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* BACK */}
      <button onClick={() => navigate(-1)} className="mb-6">
        ← Back
      </button>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow p-6 max-w-xl mx-auto space-y-4">
        <h1 className="text-xl font-bold">{pack.pack_name}</h1>

        <p className="text-gray-500">{pack.description}</p>

        <div className="flex justify-between">
          <span>Quantity</span>
          <span>{quantity}</span>
        </div>

        <div className="flex justify-between">
          <span>Total Emissions</span>
          <span>
            {(pack.total_emission_kgco2e * quantity).toFixed(2)} kg CO₂e
          </span>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>Total Price</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={() => setShowPopup(true)}
          className="w-full bg-green-600 text-white py-3 rounded-xl"
        >
          Pay Now
        </button>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
             {/* ❌ CLOSE BUTTON */}
    <button
      onClick={() => setShowPopup(false)}
      className="absolute top-3 text-black-400 hover:text-gray-700 text-xl border"
    >
      ✕
    </button>
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md space-y-4">
            <h2 className="text-lg font-bold">Complete Payment</h2>
 
           {/* NAME */}
<input
  placeholder="Name"
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setForm({ ...form, name: e.target.value })
  }
/>
{errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

{/* EMAIL */}
<input
  placeholder="Email"
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setForm({ ...form, email: e.target.value })
  }
/>
{errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

{/* PHONE */}
<input
  placeholder="Phone"
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setForm({ ...form, phone: e.target.value })
  }
/>
{errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

{/* QR */}
<div className="flex justify-center">
  <img
    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?am=${total}`}
    alt="QR"
  />
</div>

{/* UTR */}
<input
  placeholder="Enter UTR Number"
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setForm({ ...form, utr: e.target.value })
  }
/>

{/* OR TEXT */}
<p className="text-center text-xs text-gray-400">OR</p>

{/* UPI ID */}
<input
  placeholder="Enter UPI ID (e.g. name@upi)"
  className="w-full border p-2 rounded"
  onChange={(e) =>
    setForm({ ...form, upi: e.target.value })
  }
/>

{/* PAYMENT ERROR */}
{errors.payment && (
  <p className="text-red-500 text-xs text-center">
    {errors.payment}
  </p>
)}

            <button
              onClick={handleSubmit}
              className="w-full bg-orange-500 text-white py-2 rounded"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* TOAST */}
     {toast && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white max-w-md w-[90%] rounded-2xl shadow-2xl p-6 text-center animate-scaleIn">

      {/* Icon */}
      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">
        <span className="text-3xl">✅</span>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Payment Submitted Successfully
      </h2>

      {/* Message */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Your transaction details have been securely recorded. <br />
        Once our team verifies your payment, your purchased pack details
        will be sent to your email.
      </p>

      {/* Countdown */}
      <div className="bg-gray-100 rounded-xl py-3 px-4 text-sm text-gray-700">
        Redirecting to packs in{" "}
        <span className="font-bold text-green-600 text-lg">
          {countdown}s
        </span>
      </div>

      {/* Optional Button */}
      <button
        onClick={() => navigate("/emitter-pack")}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-medium"
      >
        Go Now
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default CheckoutPage;