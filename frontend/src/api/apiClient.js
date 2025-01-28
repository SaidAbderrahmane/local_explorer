import axios from "axios";

// Create Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add Authorization header if JWT exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
