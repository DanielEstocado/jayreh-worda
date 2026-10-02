import axios from "axios";

// The one HTTP client every request in the app goes through, set VITE_API_URL in .env, not per-call.
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
});

// Fails loudly when VITE_API_URL is missing instead of sending requests to the wrong host.
axiosInstance.interceptors.request.use((config) => {
  if (!config.baseURL) {
    return Promise.reject(
      new Error(
        "VITE_API_URL is not set. Copy .env.example to .env and fill it in.",
      ),
    );
  }
  return config;
});
