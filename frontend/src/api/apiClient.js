import axios from "axios";

const baseURL = "http://localhost:5000/api";
// Create Axios instance
const apiClient = axios.create({
  baseURL: baseURL,
});

// Add Authorization header if JWT exists
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export { baseURL };
export default apiClient;
