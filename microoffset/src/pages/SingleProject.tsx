import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Project {
  _id: string;
  title: string;
  description: string;
  location: string;
  retired: number;
  available: number;
  pricePerKgCO2: number;
  projectDeveloper: string;
  verifiedBy: string;
  typeOfProject: string;
  projectHighlighters: string[];
  sdgs: number[];
  image: string;
}

/* ---------------- SIDEBAR ---------------- */
const ProjectSubSidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:block w-[260px] bg-white border rounded-2xl p-5 space-y-4">
      <div
        className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-green-600"
        onClick={() => navigate(-1)}
      >
        ← <span className="font-medium">Projects</span>
      </div>

      <div className="border-t pt-4 space-y-3">
        <div className="text-green-600 font-semibold">Impact</div>
      </div>
    </div>
  );
};

/* ---------------- CAROUSEL ---------------- */
const ExploreCarousel: React.FC<{ currentProjectId?: string }> = ({
  currentProjectId,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://microoffsets.nettzero.world/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.data));
  }, []);

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-4 w-max px-1">
        {projects
          .filter((p) => p._id !== currentProjectId)
          .map((project) => (
            <div
              key={project._id}
              onClick={() => navigate(`/projects/${project._id}`)}
              className="min-w-[300px] bg-white rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
            >
              <img
                src={project.image}
                className="h-[180px] w-full object-cover"
              />

              <div className="p-4 space-y-2">
                <h2 className="text-sm font-semibold text-gray-800 line-clamp-1">
                  {project.title}
                </h2>

                <p className="text-xs text-gray-500">
                  {project.projectDeveloper} • {project.location}
                </p>

                <div className="flex gap-2 text-[10px]">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                    {project.verifiedBy}
                  </span>
                  <span className="bg-gray-100 px-2 py-1 rounded">
                    {project.typeOfProject}
                  </span>
                </div>

                <div className="pt-2 border-t mt-2">
                  <p className="text-sm font-semibold text-gray-800">
                    {project.available.toLocaleString()} Coins
                  </p>
                  <p className="text-xs text-gray-500">Available</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

/* ---------------- MAIN ---------------- */
const SingleProject: React.FC = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("https://microoffsets.nettzero.world/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const found = data.data.find((p: Project) => p._id === id);
        setProject(found);
      });
  }, [id]);

  if (!project) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 bg-[#f6f9f7] min-h-screen">
      <ProjectSubSidebar />

      <div className="flex-1 space-y-6">
        {/* HERO */}
        <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
          <img
            src={project.image}
            className="w-full h-[260px] object-cover"
          />

          <div className="p-5">
            <h1 className="text-2xl font-semibold text-gray-800">
              {project.title}
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              {project.location} • {project.projectDeveloper}
            </p>

            <div className="flex gap-2 mt-3 text-xs">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                Verified by {project.verifiedBy}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded">
                {project.typeOfProject}
              </span>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CARD */}
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {project.available.toLocaleString()} Coins
              </p>
              <p className="text-sm text-gray-500">
                available to purchase
              </p>
            </div>

            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full">
              Register Interest
            </button>

            <p className="text-center text-sm text-green-600 cursor-pointer">
              Send Coins?
            </p>
          </div>

          {/* CONTENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* DESCRIPTION */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Impact on people & planet
              </h2>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* HIGHLIGHTS */}
            <div className="bg-green-50 border rounded-xl p-5 space-y-3">
              {project.projectHighlighters?.map((item, index) => (
                <div key={index} className="flex gap-3 text-sm">
                  <span className="text-green-600">✔</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            {/* SDG */}
            <div>
              <h3 className="font-semibold mb-3">SDGs Impact</h3>

              <div className="flex gap-3 overflow-x-auto">
                {project.sdgs?.map((sdg) => {
                  const fileName = `E Inverted Icons_WEB-${String(
                    sdg
                  ).padStart(2, "0")}.png`;

                  return (
                    <div
                      key={sdg}
                      className="w-16 h-16 bg-white rounded-xl shadow flex items-center justify-center"
                    >
                      <img src={`/${fileName}`} className="h-full" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* EXPLORE */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Explore Other Projects
          </h2>

          <ExploreCarousel currentProjectId={id} />
        </div>
      </div>
    </div>
  );
};

export default SingleProject;