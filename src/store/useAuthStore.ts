/**
 * Auth Store - Global authentication state
 * 
 * Manages:
 * - Current user data
 * - Authentication status
 * 
 * Persists to localStorage (survives page refresh).
 * Updated by auth hooks (useLoginUser, useLogoutUser, etc.)
 * 
 * Usage: const { user, isAuthenticated } = useAuthStore();
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user";

interface AuthState {
   user: User | null;
   isAuthenticated: boolean;
   setUser: (user: User | null) => void;
   clearUser: () => void;
   setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create(
   persist<AuthState>(
      (set) => ({
         // No hardcoded user - initialized from token/cookies only
         user: null,
         isAuthenticated: false,
         setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
         clearUser: () => set({ user: null, isAuthenticated: false }),
         setIsAuthenticated: (isAuthenticated: boolean) =>
            set({ isAuthenticated }),
      }),
      {
         name: "auth-storage", // Unique name for localStorage
      }
   )
);






