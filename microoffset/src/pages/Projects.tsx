import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  _id: string;
  title: string;
  subHeading: string;
  description: string;
  location: string;
  status: string;
  retired: number;
  available: number;
  pricePerKgCO2: number;
  currency: string;
  projectDeveloper: string;
  verifiedBy: string;
  typeOfProject: string;
  projectType: string;
  projectHighlighters: string[];
  co2Avoided: number;
  sdgs: number[];
  image: string;
}
const Sidebar: React.FC = () => {
  const menu = [
    { name: "Home", icon: "🏠" },
    { name: "Projects", icon: "🌱", active: true },
    { name: "Gen-C Brands", icon: "🚀" },
    { name: "I am Gen-C", icon: "🧬" },
    { name: "Neutralise Now", icon: "💧" },
  ];

  return (
    <div className="w-[260px] bg-white rounded-2xl shadow-md p-5 space-y-4">
      <div className="flex items-center gap-2 font-bold text-purple-600 text-lg">
        ⚙️ COIN
      </div>

      <div className="space-y-2 mt-4">
        {menu.map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-3 px-4 py-3 rounded-full cursor-pointer transition ${
              item.active
                ? "bg-gradient-to-r from-purple-400 to-purple-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <span>{item.icon}</span>
            <span className="text-sm font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

const navigate = useNavigate();


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          "https://microoffsets.nettzero.world/api/projects"
        );
        const data = await res.json();
        setProjects(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        <h1 className="text-2xl font-semibold">
          Pick any high-impact solution from our diverse portfolio
        </h1>
        <p className="text-sm text-gray-500 max-w-xl">
          Our projects include a combination of large-scale projects as well as
          small-scale ones that support local communities
        </p>

        {projects.map((project) => (
          <div
  key={project._id}
  onClick={() => navigate(`/projects/${project._id}`)}
  className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-[1.01] transition"
>
            {/* Background Image */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[260px] object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="absolute inset-0 flex justify-between p-6 text-white">
              {/* Left */}
              <div className="max-w-xl space-y-2">
                <h2 className="text-xl font-bold">{project.title}</h2>
                <p className="text-sm opacity-90">
                  By {project.projectDeveloper} | {project.location}
                </p>

                <div className="flex gap-3 text-xs mt-3">
                  <span className="bg-green-500/80 px-2 py-1 rounded">
                    Verified by {project.verifiedBy}
                  </span>
                  <span className="bg-white/20 px-2 py-1 rounded">
                    {project.typeOfProject}
                  </span>
                </div>
              </div>

              {/* Right Panel */}
              <div className="bg-orange-500/80 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between w-[220px]">
                <div>
                  <p className="text-lg font-bold">
                    {project.available.toLocaleString()} Climes
                  </p>
                  <p className="text-xs opacity-90">
                    available to purchase
                  </p>
                </div>

                <div className="space-y-2 mt-4" >
                  <button className="w-full bg-indigo-900 text-white py-2 rounded-full text-sm">
                    Register Interest
                  </button>
                  <button className="w-full text-white underline text-sm">
                    Send Climes?
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;