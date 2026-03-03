import axios from "axios";

const api = axios.create({
  baseURL: "https://skillsphere-backend-1r52.onrender.com",  // 👈 backend same port
});

export default api;