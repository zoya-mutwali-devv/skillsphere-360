import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";

const StatsPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/skills/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div data-theme="corporate" className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div data-theme="corporate" className="min-h-screen bg-base-200 p-6">

      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">
          Project Statistics
        </h1>

        <Link to="/">
          <button className="btn btn-ghost">
            Back to Home
          </button>
        </Link>
      </div>

      {/* Top Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Total Instructors</div>
          <div className="stat-value text-primary">
            {stats.totalNumberofInstructors}
          </div>
        </div>

        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Languages Covered</div>
          <div className="stat-value text-secondary">
            {stats.noOfStudentsByLanguage.length}
          </div>
        </div>

        <div className="stat bg-base-100 shadow rounded-xl">
          <div className="stat-title">Total Language Groups</div>
          <div className="stat-value text-accent">
            {stats.noOfStudentsByLanguage.length}
          </div>
        </div>

      </div>

      {/* Language Breakdown */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-lg text-secondary">
            Students by Language
          </h2>

          <div className="overflow-x-auto mt-4">
            <table className="table">
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Total Students</th>
                </tr>
              </thead>
              <tbody>
                {stats.noOfStudentsByLanguage.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.totalStudents}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

    </div>
  );
};

export default StatsPage;