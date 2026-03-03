import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/axios";
import toast from "react-hot-toast";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    instructorName: "",
    studentName: "",
    skillName: "",
    category: "",
    teachingMode: "",
    language: "",
    sessionFees: "",
    courseDescription: "",
  });

  useEffect(() => {
    const fetchSkill = async () => {
      const res = await api.get(`/skills/${id}`);
      setFormData(res.data);
    };
    fetchSkill();
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await api.put(`/skills/${id}`, formData);
    toast.success("Skill updated successfully");
    navigate("/");
  } catch (error) {
    toast.error("Update failed");
  }
};

  return (
    <div data-theme="corporate" className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl text-warning mb-4">
            Edit Skill
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="label">
                <span className="label-text">Instructor Name</span>
              </label>
              <input
                type="text"
                name="instructorName"
                value={formData.instructorName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Student Name</span>
              </label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Skill Name</span>
              </label>
              <input
                type="text"
                name="skillName"
                value={formData.skillName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Teaching Mode</span>
                </label>
                <select
                  name="teachingMode"
                  value={formData.teachingMode}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Mode</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Language</span>
                </label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Session Fees</span>
                </label>
                <input
                  type="number"
                  name="sessionFees"
                  value={formData.sessionFees}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Course Description</span>
              </label>
              <textarea
                name="courseDescription"
                value={formData.courseDescription}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                rows="3"
                required
              ></textarea>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="btn btn-ghost"
              >
                Cancel
              </button>

              <button type="submit" className="btn btn-warning">
                Update Skill
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPage;