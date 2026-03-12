import Header from "@/components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    mobile: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      const res = await fetch("https://microoffsets.nettzero.world/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      // Save JWT
      localStorage.setItem("token", data.token);

      navigate("/dashboard");

    } catch {
      setError("Server error");
    }

  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
<Header />
      <div className="max-w-md w-full px-6">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-700">
            Login to COIN
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-8 shadow-sm">

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-lg"
            />

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-3 rounded-lg"
            >
              Login
            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default Login;