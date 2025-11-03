import axios from "axios";

// In-memory access token
let accessToken = null;

// Function to update the access token
export const setAccessToken = (token) => {
  accessToken = token;
};

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true, // ensures cookies (refresh token) are sent
});

// Attach access token to every request
api.interceptors.request.use(

  (config) => {
    console.log("access Token");
    console.log(accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401: try refresh token automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh endpoint (refresh token stored in HTTP-only cookie)
        const res = await axios.post(
          "http://localhost:4000/api/auth/refereshToken",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        setAccessToken(newAccessToken);

        // Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token invalid, redirecting to login...");
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
