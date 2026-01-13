"use client";

import axios, { type AxiosRequestHeaders } from "axios";
import { Cookies } from "react-cookie";
import type {
  Token,
  UserLogin,
  UserResponse,
  AdminUserCreate,
  AdminUserRow,
  CourseOut,
  UserUpdatePayload,
  EventResponse,
  AssignmentOut,
  ChildInfo,
  AuthResponse,
} from "@/types/api";

const API_BASE =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "https://backend-rca.onrender.com/api/v1";

const cookies = new Cookies();

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Attach bearer token (cookie first, fallback localStorage)
api.interceptors.request.use((config) => {
  let token = cookies.get("access_token");
  if (!token && typeof window !== "undefined") {
    try {
      token = localStorage.getItem("access_token") || undefined;
    } catch {
      token = undefined;
    }
  }
  if (token) {
    const headers = (config.headers || {}) as AxiosRequestHeaders;
    headers.Authorization = `Bearer ${token}`;
    headers.Accept = "application/json";
    config.headers = headers;
  }
  return config;
});

// Handle auth errors globally
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
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

// Typed API surface (subset of the OpenAPI spec we use in the app)
export const apiClient = {
  // Auth
  login: (payload: UserLogin) =>
    api.post<AuthResponse>("/auth/login", payload).then((r) => r.data),
  logout: () => api.post<void>("/auth/logout").then((r) => r.data),
  profile: () => api.get<UserResponse>("/users/profile").then((r) => r.data),

  // Admin users
  adminListUsers: () =>
    api.get<AdminUserRow[]>("/admin/users").then((r) => r.data),
  adminCreateTeacher: (payload: AdminUserCreate) =>
    api.post("/admin/register-teacher", payload).then((r) => r.data),
  adminCreateStudent: (payload: AdminUserCreate) =>
    api.post("/admin/register-student", payload).then((r) => r.data),
  adminCreateParent: (payload: AdminUserCreate) =>
    api.post("/admin/register-parent", payload).then((r) => r.data),
  adminActivateUser: (userId: string) =>
    api.patch(`/admin/users/${userId}/activate`).then((r) => r.data),
  adminDeactivateUser: (userId: string) =>
    api.patch(`/admin/users/${userId}/deactivate`).then((r) => r.data),

  // Courses (examples for personalization)
  listCourses: () => api.get<CourseOut[]>("/courses/").then((r) => r.data),

  // User activate/update (admin-only activate in backend)
  activateUser: (userId: string) =>
    api.patch(`/users/${userId}/activate`).then((r) => r.data),
  updateUser: (userId: string, payload: UserUpdatePayload) =>
    api.put(`/users/${userId}`, payload).then((r) => r.data),

  // Personalized data
  studentAssignments: () =>
    api.get<AssignmentOut[]>("/assignments/student").then((r) => r.data),
  teacherAssignments: () =>
    api.get<AssignmentOut[]>("/assignments/teacher").then((r) => r.data),
  enrolledCourses: () =>
    api.get<CourseOut[]>("/courses/enrolled/me").then((r) => r.data),
  userEvents: () => api.get<EventResponse[]>("/events/").then((r) => r.data),
  parentChildren: () =>
    api.get<ChildInfo[]>("/parent/children").then((r) => r.data),
};

export type ApiClient = typeof apiClient;
