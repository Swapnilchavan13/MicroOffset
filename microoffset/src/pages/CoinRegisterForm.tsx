import { useState } from "react";
import { useNavigate } from "react-router-dom";


const CoinRegisterForm = () => {

    const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    industry: "",
    location: "",
    gst: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("https://microoffsets.nettzero.world/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    console.log(data);
    alert("Registered successfully");

    // Redirect to login page
      navigate("/login");

  } catch (error) {
    console.error(error);
  }
};

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-2xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-600">
            Register for COIN
          </h2>
          <p className="text-gray-500 mt-2">
            Offset your customers’ emissions by connecting to the COIN platform
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                placeholder="Enter your industry"
                value={form.industry}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="City / Country"
                value={form.location}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* GST */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                GST Number
              </label>
              <input
                type="text"
                name="gst"
                placeholder="Enter GST number"
                value={form.gst}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter mobile number"
                value={form.mobile}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Register Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-600 transition"
              >
                Register
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default CoinRegisterForm;