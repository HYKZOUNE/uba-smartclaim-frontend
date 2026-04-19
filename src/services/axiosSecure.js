// frontend/src/services/axiosSecure.js
import axios from "axios";
import api from "../services/api";

const axiosSecure = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",
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
