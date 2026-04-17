// frontend/src/services/axiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ❌ AUCUNE REDIRECTION AUTOMATIQUE
axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("Accès refusé ou token invalide");
      // ❗ ON NE SUPPRIME PAS LE TOKEN ICI
    }
    return Promise.reject(error);
  }
);

export default axiosSecure;
