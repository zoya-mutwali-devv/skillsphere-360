import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",  // 👈 backend same port
});

export default api;