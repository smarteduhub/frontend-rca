/**
 * Auth Service - All authentication API operations
 *
 * Key methods:
 * - login(email, password): Authenticate user, returns token + user
 * - register(data): Create new user account
 * - logout(): Clear session
 * - getProfile(): Get current user profile
 * - initiateOAuth(provider): Start OAuth flow
 *
 * Called by hooks in src/hooks/useAuth.ts
 * Token is stored in cookies automatically by API client.
 */

import { BaseService } from "./base.service";
import type { IAuthService } from "./interfaces";
import type { User, UserUpdate } from "@/types/user";
import { apiClient } from "@/lib/apiClient";
import type { AuthResponse } from "@/types/api";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
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

export interface OAuthResponse {
  auth_url: string;
}

export class AuthService extends BaseService implements IAuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    return apiClient.login({ email, password });
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    return this.request(() =>
      this.unauthorizedAPI.post<AuthResponse>("/auth/signup", data)
    );
  }

  async logout(): Promise<void> {
    try {
      await apiClient.logout();
      // Clear cookies manually as fallback
      if (typeof document !== "undefined") {
        document.cookie =
          "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        localStorage.removeItem("auth-storage");
      }
    } catch (error) {
      // Even if API call fails, clear local data
      if (typeof document !== "undefined") {
        document.cookie =
          "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        localStorage.removeItem("auth-storage");
      }
      throw error;
    }
  }

  async getProfile(): Promise<User> {
    return apiClient.profile() as unknown as User;
  }

  async updateProfile(data: UserUpdate): Promise<User> {
    // This method signature is required by the interface
    // The hook will handle getting the userId
    throw new Error(
      "updateProfile requires userId - use updateUserProfile(userId, data) instead"
    );
  }

  async updateUserProfile(userId: string, data: UserUpdate): Promise<User> {
    return this.request(() =>
      this.authorizedAPI.put<User>(`/users/${userId}`, data, {
        withCredentials: true,
      })
    );
  }

  async initiateOAuth(provider: string, role?: string): Promise<OAuthResponse> {
    const stateString = role
      ? `${provider}-${role}-${Math.random().toString(36).substring(7)}`
      : `${provider}-${Math.random().toString(36).substring(7)}`;

    const url = `/auth/oauth/${provider}?state=${stateString}${
      role ? `&role=${role}` : ""
    }`;

    return this.request(() => this.unauthorizedAPI.get<OAuthResponse>(url));
  }

  async handleOAuthCallback(
    provider: string,
    code: string
  ): Promise<AuthResponse> {
    return this.request(() =>
      this.unauthorizedAPI.get<AuthResponse>(
        `/auth/oauth/${provider}/callback`,
        {
          params: { code },
          withCredentials: true,
        }
      )
    );
  }
}
