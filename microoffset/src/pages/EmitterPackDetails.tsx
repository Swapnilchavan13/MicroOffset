import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Leaf,
  Factory,
  Target,
  IndianRupee,
} from "lucide-react";

const API_URL = "http://62.72.59.146:5000/getemitterpacks";

const EmitterPackDetails = () => {
  const { id } = useParams();
  const [pack, setPack] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPack = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        const json = await res.json();
        setPack(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPack();
  }, [id]);

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center text-muted-foreground">
        Loading offset pack…
      </div>
    );

  if (!pack)
    return (
      <div className="flex h-64 items-center justify-center">
        Pack not found
      </div>
    );

  return (
    <section className="bg-background py-14">
      <div className="container mx-auto max-w-6xl px-4">

        {/* ===== HERO ===== */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
            <Leaf className="h-4 w-4" />
            Emission Offset Pack
          </span>

          <h1 className="mt-4 text-4xl font-bold">
            {pack.pack_name}
          </h1>

          <p className="mt-3 max-w-3xl text-muted-foreground">
            {pack.description}
          </p>
        </div>

        {/* ===== SUMMARY CARDS ===== */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <SummaryCard
            icon={<Factory />}
            label="Total Emissions"
            value={`${pack.total_emission_kgco2e.toFixed(2)} kg CO₂e`}
          />

          <SummaryCard
            icon={<Target />}
            label="Projects Used"
            value={pack.projects?.length || 0}
          />

          <SummaryCard
            icon={<IndianRupee />}
            label="Total Cost"
            value={`${pack.total_pack_price?.toFixed(2) || "—"} ${pack.currency}`}
          />
        </div>

        {/* ===== EMITTERS ===== */}
        <div className="mb-14">
          <h2 className="mb-4 text-2xl font-bold">
            Emission Sources
          </h2>

          <div className="overflow-hidden rounded-xl border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left">Emitter</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-right">Quantity</th>
                  <th className="px-4 py-3 text-right">Emissions (kg)</th>
                </tr>
              </thead>
              <tbody>
                {pack.emitters.map((e: any, i: number) => (
                  <tr
                    key={i}
                    className="border-t last:border-b-0"
                  >
                    <td className="px-4 py-3 font-medium">
                      {e.emitter_name_standard}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {e.category}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {e.quantity}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      {e.calculated_emission_kgco2e.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== PROJECT ALLOCATION ===== */}
        <div>
          <h2 className="mb-4 text-2xl font-bold">
            Offset Allocation
          </h2>

          <div className="space-y-5">
            {pack.projects.map((p: any, i: number) => (
              <div
                key={i}
                className="rounded-xl border bg-card p-5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold">
                    {p.projectId}
                  </span>
                  <span className="text-sm font-bold text-emerald-600">
                    {p.allocation_percent}%
                  </span>
                </div>

                <div className="mb-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
                    style={{ width: `${p.allocation_percent}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {p.allocated_emission_kgco2e.toFixed(2)} kg CO₂e
                  </span>
                  <span>
                    {p.allocated_cost.toFixed(2)} {pack.currency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default EmitterPackDetails;

/* ===== Helper ===== */

const SummaryCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-center gap-4 rounded-xl border bg-card p-5">
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
      {icon}
    </div>
    <div>
      <p className="text-sm text-muted-foreground">
        {label}
      </p>
      <p className="text-xl font-bold">
        {value}
      </p>
    </div>
  </div>
);
