import Header from "@/components/Header";
import { Coins, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CoinOptions = () => {
  const [showPartners, setShowPartners] = useState(false);
  return (
    <section className="py-20 bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold text-gray-600 mb-2">
            COIN Platform
          </h2>
          <p className="text-gray-500">
            Participate in the carbon ecosystem by giving or receiving COINS
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* GIVE COINS */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">

            <div className="flex items-center gap-3 mb-4">
              <Coins className="text-emerald-500" />
              <h3 className="text-xl font-semibold text-gray-600">
                GIVE COINS
              </h3>
            </div>

            <p className="text-gray-500 mb-6 leading-relaxed">
              Offset your customers’ emissions by linking the COIN API
            </p>

            <a
              href="#"
              className="flex items-center text-sm text-emerald-500 mb-6 hover:underline" onClick={() => setShowPartners(true)}
>
  View Participating Partners
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>

            <div className="flex gap-4 mb-6">
              <div className="flex gap-4 mb-6">
  <Link to="/coinregister">
    <button className="bg-emerald-500 text-white px-5 py-2 rounded-lg text-sm hover:bg-emerald-600 transition">
      Register
    </button>
  </Link>
  
  <Link to="/login">
              <button className="border border-gray-300 text-gray-500 px-5 py-2 rounded-lg text-sm hover:bg-grey-100 transition">
                Login
              </button>
  </Link>
</div>

            </div>
<Link to="/coinsite">
            <p className="text-sm text-gray-500 underline cursor-pointer">
              Why Register?
            </p>
</Link>
          </div>

          {/* RECEIVE COINS */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">

            <div className="flex items-center gap-3 mb-4">
              <Coins className="text-sky-500" />
              <h3 className="text-xl font-semibold text-gray-600">
                RECEIVE COINS
              </h3>
            </div>

            <p className="text-gray-500 mb-6 leading-relaxed">
              Register your Carbon Dioxide Removal Project to receive COINS
              from our partners & their customers.
            </p>

            <a
              href="/projects"
              className="flex items-center text-sm text-sky-500 mb-6 hover:underline"
            >
              View Participating Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>

            <div className="flex gap-4 mb-6">
              <button className="bg-sky-500 text-white px-5 py-2 rounded-lg text-sm hover:bg-sky-600 transition">
                Register
              </button>

              <button className="border border-gray-300 text-gray-500 px-5 py-2 rounded-lg text-sm hover:bg-gray-100 transition">
                Login
              </button>
            </div>

<a href="/projects">

            <p className="text-sm text-gray-500 underline cursor-pointer">
              Why Register?
            </p>
</a>
          </div>

        </div>
      </div>

      {showPartners && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    
    <div className="bg-white w-[90%] max-w-md rounded-2xl p-6 relative shadow-xl animate-fadeIn">
      
      {/* Close */}
      <button
        onClick={() => setShowPartners(false)}
        className="absolute top-3 right-3 text-gray-500 text-lg"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-3">
        Participating Partners
      </h2>

      {/* Message */}
      <p className="text-sm text-gray-600 mb-4">
        I would like to know who are part of the program.
      </p>

      {/* Example partner list (you can replace later with API) */}
      <div className="space-y-2 text-sm">
        <div className="bg-gray-50 p-3 rounded-lg">🌿 EcoCorp</div>
        <div className="bg-gray-50 p-3 rounded-lg">⚡ Green Energy Ltd.</div>
        <div className="bg-gray-50 p-3 rounded-lg">🚗 Carbon Neutral Mobility</div>
      </div>

      {/* CTA */}
      <button
        onClick={() => setShowPartners(false)}
        className="mt-5 w-full bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600"
      >
        Got it
      </button>
    </div>
  </div>
)}
    </section>
  );
};

export default CoinOptions;