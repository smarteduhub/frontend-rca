/**
 * Auth Hooks - React Query hooks for authentication
 *
 * Key hooks:
 * - useLoginUser(): Login mutation, updates auth store on success
 * - useRegisterUser(): Registration mutation
 * - useLogoutUser(): Logout mutation, clears auth store
 * - useProfile(): Fetch current user profile
 *
 * All hooks update useAuthStore (Zustand) on success.
 * Token is stored in cookies by authService.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { UserUpdate, User } from "@/types/user";
import type { UserResponse } from "@/types/api";
import { authService } from "@/services";
import type { AuthResponse } from "@/types/api";
import axios from "axios";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";

const cookies = new Cookies();

// Support both email and studentId for backward compatibility
export interface LoginData {
  email?: string;
  studentId?: string; // Legacy field name support
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  username?: string;
  phone?: string;
  country?: string;
  field_of_study?: string;
}

// API call functions using services
const loginUser = (userData: LoginData): Promise<AuthResponse> => {
  // Support both email and studentId for backward compatibility
  const email = userData.email || userData.studentId;
  if (!email) throw new Error("Email or studentId is required");
  return authService.login(email, userData.password);
};

const registerUser = (userData: SignupData): Promise<AuthResponse> => {
  return authService.register(userData);
};

const logoutUser = async (): Promise<void> => {
  return authService.logout();
};

const initiateOAuth = (provider: string, role?: string) => {
  return authService.initiateOAuth(provider, role);
};

const handleOAuthCallback = (
  provider: string,
  code: string
): Promise<AuthResponse> => {
  return authService.handleOAuthCallback(provider, code);
};

const updateUserProfile = async (userData: UserUpdate): Promise<User> => {
  const userId = useAuthStore.getState().user?.id;
  if (!userId) throw new Error("User ID not found");
  return authService.updateUserProfile(userId, userData);
};

const fetchUserProfile = async (): Promise<User> => {
  return authService.getProfile();
};

const mapUserResponseToUser = (u: UserResponse): User => ({
  ...u,
  username: u.username ?? undefined,
  phone: u.phone ?? undefined,
  country: u.country ?? undefined,
  field_of_study: u.field_of_study ?? undefined,
});

export const useLoginUser = () => {
  const { setUser, setIsAuthenticated } = useAuthStore();
  const router = useRouter();

  return useMutation<AuthResponse, Error, LoginData>({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      if (data?.access_token) {
        // Store token in cookie for axios interceptor
        cookies.set("access_token", data.access_token, { path: "/" });
        try {
          // Fetch profile to populate store with role/user data
          const profile = await authService.getProfile();
          setUser(mapUserResponseToUser(profile as UserResponse));
          setIsAuthenticated(true);
          // Redirect by role
          const role = (profile as any)?.role;
          switch (role) {
            case "admin":
              router.replace("/admin");
              break;
            case "teacher":
              router.replace("/teacher");
              break;
            case "parent":
              router.replace("/parent");
              break;
            case "student":
            default:
              router.replace("/student");
              break;
          }
        } catch (err) {
          console.error("Profile fetch after login failed:", err);
        }
      }
    },
    onError: (error) => {
      // Log error details for debugging
      if (axios.isAxiosError(error)) {
        console.error(
          "Login error:",
          error.response?.status,
          error.response?.data
        );
        if (error.response?.status === 401 || error.response?.status === 403) {
          toast.error("Please activate your account and log in.");
        }
      } else {
        console.error("Login error:", error);
      }
    },
  });
};

export const useRegisterUser = () => {
  const { setUser, setIsAuthenticated } = useAuthStore();

  return useMutation<AuthResponse, Error, SignupData>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Ensure we have valid user data and token before setting state
      if (data?.user && data?.access_token) {
        setUser(mapUserResponseToUser(data.user as UserResponse));
        setIsAuthenticated(true);
      }
    },
    onError: (error) => {
      // Log error details for debugging
      if (axios.isAxiosError(error)) {
        console.error(
          "Signup error:",
          error.response?.status,
          error.response?.data
        );
      } else {
        console.error("Signup error:", error);
      }
    },
  });
};

export const useLogoutUser = () => {
  const { clearUser } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: logoutUser,
    onSuccess: () => {
      clearUser(); // Clear user data from Zustand store
      // Clear React Query cache
      queryClient.clear();
      cookies.remove("access_token", { path: "/" });
      // Redirect to login
      if (typeof window !== "undefined") {
        location.replace("/login");
      }
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Even if the API call fails, clear local data
      clearUser();
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth-storage");
        cookies.remove("access_token", { path: "/" });
        location.replace("/login");
      }
    },
  });
};

export const useInitiateOAuth = () => {
  return useMutation<
    { auth_url: string },
    Error,
    { provider: string; role?: string }
  >({
    mutationFn: ({ provider, role }) => initiateOAuth(provider, role),
    onSuccess: (data) => {
      if (data?.auth_url && typeof window !== "undefined") {
        window.location.href = data.auth_url;
      }
    },
    onError: (error) => {
      console.error("OAuth initiation error:", error);
    },
  });
};

export const useOAuthCallback = () => {
  const { setUser, setIsAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<
    AuthResponse,
    Error,
    { provider: string; code: string; state: string }
  >({
    mutationFn: async ({ provider, code }) => {
      try {
        // Call OAuth callback API endpoint
        const response = await handleOAuthCallback(provider, code);

        // Verify we have user data and token
        if (response?.user && response?.access_token) {
          // Update auth store with user data
          setUser(mapUserResponseToUser(response.user));
          setIsAuthenticated(true);

          // Get user role to determine redirect destination
          const role = response.user.role;

          // Redirect to role-specific dashboard
          if (typeof window !== "undefined") {
            switch (role) {
              case "admin":
                location.replace("/admin");
                break;
              case "teacher":
                location.replace("/teacher");
                break;
              case "parent":
                location.replace("/parent");
                break;
              case "student":
                location.replace("/student");
                break;
              default:
                location.replace("/student");
            }
          }
        } else {
          // OAuth response missing required data
          throw new Error("Invalid OAuth response");
        }

        return response;
      } catch (error) {
        // OAuth callback failed - redirect to login
        console.error("OAuth callback error:", error);
        if (typeof window !== "undefined") {
          location.replace("/login");
        }
        throw error;
      }
    },
  });
};

export const useUpdateProfile = () => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<User, Error, UserUpdate>({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      if (data) {
        setUser(data);
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      }
    },
    onError: (error) => {
      console.error("Profile update error:", error);
    },
  });
};

export const useProfile = () => {
  return useQuery<User, Error>({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 5,
  });
};
