import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

// Sidebar
const ProjectSubSidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:block w-[260px] bg-white rounded-2xl shadow-md p-5 space-y-4">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        ← <span className="font-medium">Projects</span>
      </div>

      <div className="border-t pt-4 space-y-4">
        <div className="text-purple-600 font-semibold">Impact</div>
        <div className="text-gray-500">About</div>
        <div className="text-gray-500">Updates</div>
      </div>
    </div>
  );
};

const SingleProject: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("https://microoffsets.nettzero.world/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const found = data.data.find((p: Project) => p._id === id);

        if (found) {
          found.sdgs =
            typeof found.sdgs === "string"
              ? JSON.parse(found.sdgs)
              : found.sdgs || [];

          found.projectHighlighters =
            typeof found.projectHighlighters === "string"
              ? JSON.parse(found.projectHighlighters)
              : found.projectHighlighters || [];
        }

        setProject(found);
      });
  }, [id]);

  if (!project) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 sm:p-5 lg:p-6 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <ProjectSubSidebar />

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* HERO */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={`https://microoffsets.nettzero.world/api/uploads/${project.image}`}
            className="w-full h-[200px] sm:h-[260px] lg:h-[340px] object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4 sm:p-5 lg:p-6 text-white">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold max-w-2xl">
              {project.title}
            </h1>

            <p className="mt-2 text-xs sm:text-sm">
              {project.location} | By {project.projectDeveloper}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 text-[10px] sm:text-xs">
              <span className="bg-green-500/80 px-2 py-1 rounded">
                Verified by {project.verifiedBy}
              </span>
              <span className="bg-white/20 px-2 py-1 rounded">
                {project.typeOfProject}
              </span>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* GREEN CARD */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-400 text-white rounded-2xl p-4 sm:p-5 lg:p-6">
            <p className="text-lg sm:text-xl font-bold">
              {project.available.toLocaleString()} Coins
            </p>
            <p className="text-xs sm:text-sm">
              available to purchase
            </p>

            <hr className="my-4 opacity-40" />

            <button className="w-full bg-indigo-900 py-2 text-sm sm:text-base rounded-full">
              Register Interest
            </button>

            <p className="mt-3 underline text-xs sm:text-sm text-center">
              Send Coins?
            </p>
          </div>

          {/* RIGHT CONTENT */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5 lg:space-y-6">
            {/* DESCRIPTION */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">
                Impact on people, communities and planet
              </h2>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* HIGHLIGHTS */}
            <div className="bg-purple-100 p-4 sm:p-5 lg:p-6 rounded-xl space-y-3 sm:space-y-4">
              {project.projectHighlighters?.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <span>✔️</span>
                  <p className="text-xs sm:text-sm">{item}</p>
                </div>
              ))}
            </div>

            {/* SDGs */}
            <div>
              <h3 className="font-semibold mb-3 text-sm sm:text-base">
                SDGs Impact
              </h3>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {project.sdgs?.map((sdg) => {
                  const fileName = `E Inverted Icons_WEB-${String(
                    sdg
                  ).padStart(2, "0")}.png`;

                  const imagePath = `/${encodeURIComponent(fileName)}`;

                  return (
                    <div
                      key={sdg}
                      className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-white rounded-xl shadow flex items-center justify-center p-2"
                    >
                      <img
                        src={imagePath}
                        alt={`SDG ${sdg}`}
                        className="h-full object-contain"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* EXPLORE */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Explore Other Projects
          </h2>

          <p className="text-xs sm:text-sm text-gray-500">
            (You can reuse your list component here for carousel later)
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;