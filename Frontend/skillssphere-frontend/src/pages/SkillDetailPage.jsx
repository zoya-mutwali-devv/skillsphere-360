import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../lib/axios";

const SkillDetailPage = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [roadmap, setRoadmap] = useState("");
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);

  useEffect(() => {
    const fetchSkill = async () => {
      const res = await api.get(`/skills/${id}`);
      setSkill(res.data);
    };
    fetchSkill();
  }, [id]);

  const getRoadmap = async () => {
    try {
      setLoadingRoadmap(true);
      const res = await api.get(`/skills/roadmap/${skill.skillName}`);
      setRoadmap(res.data.roadmap);
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    } finally {
      setLoadingRoadmap(false);
    }
  };

  if (!skill) {
    return (
      <div data-theme="corporate" className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div data-theme="corporate" className="min-h-screen bg-base-200 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">

            <h2 className="card-title text-3xl text-primary">
              {skill.skillName}
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
              <p><strong>Instructor:</strong> {skill.instructorName}</p>
              <p><strong>Student:</strong> {skill.studentName}</p>
              <p><strong>Category:</strong> {skill.category}</p>
              <p><strong>Language:</strong> {skill.language}</p>
              <p><strong>Teaching Mode:</strong> {skill.teachingMode}</p>
              <p><strong>Fees:</strong> ₹{skill.sessionFees}</p>
            </div>

            <div className="divider"></div>

            <div>
              <h3 className="font-semibold text-lg mb-2">
                Course Description
              </h3>
              <p className="text-base-content/80">
                {skill.courseDescription}
              </p>
            </div>

            <div className="mt-6 flex gap-4">
              <button
                onClick={getRoadmap}
                className="btn btn-secondary"
              >
                {loadingRoadmap ? "Generating..." : "Get Roadmap"}
              </button>

              <Link to="/">
                <button className="btn btn-ghost">
                  Back
                </button>
              </Link>
            </div>

          </div>
        </div>

        {/* Roadmap Section */}
        {roadmap && (
          <div className="card bg-base-100 shadow-xl mt-6">
            <div className="card-body">
              <h3 className="card-title text-secondary">
                Learning Roadmap
              </h3>
              <p className="whitespace-pre-line">
                {roadmap}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SkillDetailPage;