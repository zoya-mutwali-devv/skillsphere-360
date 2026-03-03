import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const HomePage = () => {
  const [skills, setSkills] = useState([]);
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [searchSkill, setSearchSkill] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get("/skills");
      setSkills(res.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const deleteSkill = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this skill?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/skills/${id}`);
    toast.success("Skill deleted successfully");
    fetchSkills();
  } catch (error) {
    toast.error("Failed to delete skill");
  }
};

  const filteredSkills = skills.filter((skill) =>
    skill.skillName?.toLowerCase().includes(searchSkill.toLowerCase()) &&
    skill.category?.toLowerCase().includes(category.toLowerCase()) &&
    skill.language?.toLowerCase().includes(language.toLowerCase())
  );

  return (
    <div data-theme="corporate" className="min-h-screen bg-base-200">

      {/* Navbar */}
<div className="navbar bg-slate-700 text-white shadow-lg sticky top-0 z-50 px-6 py-8">
          <div className="flex-1">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
  <span className="text-indigo-900 font-bold text-sm">SS</span>
</div>
            <h1 className="text-3xl font-bold tracking-normal text-indigo-300">
  SKILL SPHERE-360
</h1>
            </div>
            <p className="text-xs tracking-widest text-slate-300">
              Discover • Build • Grow
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link to="/stats">
            <button className="btn btn-secondary">
              View Stats
            </button>
          </Link>

          <Link to="/create">
            <button className="btn btn-primary">
              Add Skill
            </button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6">
        <div className="card bg-base-100 shadow-md p-4 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search Skill"
              className="input input-bordered w-full"
              onChange={(e) => setSearchSkill(e.target.value)}
            />

            <input
              type="text"
              placeholder="Category"
              className="input input-bordered w-full"
              onChange={(e) => setCategory(e.target.value)}
            />

            <input
              type="text"
              placeholder="Language"
              className="input input-bordered w-full"
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="alert alert-info shadow-lg">
            <span>No skills found.</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <div
                key={skill._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-3 hover:scale-105 transition-all duration-300"
              >
                <div className="card-body">
                  <h2 className="card-title text-primary">
                    {skill.skillName}
                  </h2>

                  <p><strong>Instructor:</strong> {skill.instructorName}</p>
                  <p><strong>Category:</strong> {skill.category}</p>
                  <p><strong>Language:</strong> {skill.language}</p>
                  <p><strong>Fees:</strong> ₹{skill.sessionFees}</p>

                  <div className="card-actions justify-end mt-4">
                    <Link to={`/view/${skill._id}`}>
                      <button className="btn btn-info btn-sm hover:scale-105 transition">
                        View
                      </button>
                    </Link>

                    <Link to={`/edit/${skill._id}`}>
                      <button className="btn btn-warning btn-sm">
                        Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => deleteSkill(skill._id)}
                      className="btn btn-error btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;