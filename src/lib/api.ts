/**
 * API Client Configuration
 * 
 * Sets up two axios instances:
 * - unauthorizedAPI: For public endpoints (login, register)
 * - authorizedAPI: For protected endpoints (adds auth token automatically)
 * 
 * Token is stored in cookies and automatically added to requests.
 * On 401/403 errors, token is cleared and user redirected to login.
 */

import axios, { AxiosInstance } from "axios";
import { Cookies } from "react-cookie";

// Initialize cookie handler
const cookies = new Cookies();

// API base URL
// Always prefer an explicit backend URL; default to the hosted API.
// Avoid pointing at Next.js `/api` to prevent HTML 404 responses when no mock backend exists.
export const API_URL =
   process.env.NEXT_PUBLIC_SERVER_URL ||
   "https://smarteduhub-server.onrender.com/api/v1";

// Common headers for all requests
const commonHeaders = {
   "Content-Type": "application/json",
};

// Create axios instance for unauthenticated requests (login, register, public endpoints)
const unauthorizedAxiosInstance: AxiosInstance = axios.create({
   baseURL: API_URL,
   headers: commonHeaders,
   withCredentials: true, // Allow cookies to be sent with requests
});

// Create axios instance for authenticated requests (requires token)
const authorizedAxiosInstance: AxiosInstance = axios.create({
   baseURL: API_URL,
   headers: commonHeaders,
   withCredentials: true, // Allow cookies to be sent with requests
});

// Request interceptor for authorized API - adds token to Authorization header
authorizedAxiosInstance.interceptors.request.use(
   async (config) => {
      // Extract token from cookies
      const token = cookies.get("access_token");

      // If token exists, add it to the Authorization header
      if (token) {
         config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

// Response interceptor for authorized API - handles authentication errors
authorizedAxiosInstance.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
         cookies.remove("access_token", { path: "/" });
         if (typeof window !== "undefined") {
            const loginUrl = new URL("/login", window.location.origin);
            loginUrl.searchParams.set("reason", "session_expired");
            window.location.replace(loginUrl.toString());
         }
      }
      return Promise.reject(error);
   }
);

// Export both API instances for use in the application
export const unauthorizedAPI = unauthorizedAxiosInstance;
export const authorizedAPI = authorizedAxiosInstance;