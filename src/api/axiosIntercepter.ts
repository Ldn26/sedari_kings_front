import axios from "axios";
import useUserStore from "../store/store.js";

// Create Axios instance
const api = axios.create({
  // baseURL: "http://localhost:4000/api",
  baseURL: "https://sedarri-kings-backend.onrender.com/api",
  withCredentials: true, // sends HTTP-only cookies
});

// Attach access token to every request
api.interceptors.request.use(
  (config) => {
    // Get the latest accessToken from Zustand store
    const accessToken = useUserStore.getState().accessToken;
    console.log(accessToken)
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
    // to avoid infinit loop     _retry flag
    console.log("from the axios intercepter  ")
    console.log("error .responsoe")
    console.log(error.response)
    // console.log("the original resequet retry ")
    // console.log(originalRequest)

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh endpoint (refresh token in HTTP-only cookie)
        const res = await axios.post(
          "https://sedarri-kings-backend.onrender.com/api/auth/refreshToken",
          // "http://localhost:4000/api/auth/refreshToken",
          {},
          { withCredentials: true } // must be inside the request config
        );

        const newAccessToken = res.data.accessToken;
        console.log("the new acees token from the frontend  ");
        console.log(newAccessToken);
        // Update Zustand store
        useUserStore.getState().SetAccessToken(newAccessToken);

        // Retry the original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        // console.log("the error  in axios intercepter ");
        // console.error(err);
        // console.error("Refresh token invalid, redirecting to login...");
        // Optionally: redirect user to login page
        // window.location.href = "/auth";

      }
    }

    return Promise.reject(error);
  }
);

export default api;
