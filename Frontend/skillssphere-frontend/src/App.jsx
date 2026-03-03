import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditSkillPage from "./pages/EditSkillPage";
import SkillDetailPage from "./pages/SkillDetailPage";
import StatsPage from "./pages/StatsPage";

function App() {
  return (
<div id="root-theme" data-theme="corporate" className="min-h-screen bg-base-200">
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditSkillPage />} />
        <Route path="/view/:id" element={<SkillDetailPage />} />
        <Route path="/stats" element={<StatsPage />} />

        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen">
              <h1 className="text-2xl font-bold">
                404 - Page Not Found
              </h1>
            </div>
          }
        />
      </Routes>
    </div> 
  );
}

export default App;