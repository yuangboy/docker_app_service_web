import axios from "axios";

const api = axios.create({
  // ✅ Toujours pointer vers ton backend (5000)
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
  withCredentials: true, // indispensable pour les cookies HttpOnly
});

let storeAccessToken = "";

export function setToken(token: string) {
  storeAccessToken = token;
}

api.interceptors.request.use((config) => {
  if (storeAccessToken) {
    config.headers.Authorization = `Bearer ${storeAccessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      try {
      
        const res = await api.post("/auth/refresh-token");
        const newToken = res.data.accessToken;
        setToken(newToken);
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api(error.config); // rejouer la requête
      } catch (refreshError) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
