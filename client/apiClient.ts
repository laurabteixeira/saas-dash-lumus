import axios from "axios";

const API_URL = process.env.LUMUS_API_DEV_URL || "http://localhost:4000";

function getApiTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; apiToken=`);

  if (parts.length === 2) return parts.pop()!.split(";").shift() || null;

  return null;
}

export const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = getApiTokenFromCookie();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }
);

export default apiClient;
