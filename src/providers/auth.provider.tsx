"use client";

import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { jwtDecode } from "jwt-decode";
import { authorizedAPI } from "@/lib/api";

interface AuthProviderProps {
   children: ReactNode;
}

interface DecodedToken {
   id?: string;
   email?: string;
   role?: string;
   exp?: number;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
   const { setUser, setIsAuthenticated, user: storedUser } = useAuthStore();
   const [loading, setLoading] = useState(true);
   const [showLoading, setShowLoading] = useState(false);

   // Initialize auth state from token on component mount - OPTIMIZED
   const initializeAuth = async () => {
      try {
         // Extract token from cookies - FAST synchronous operation
         const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("access_token="))
            ?.split("=")[1];

         // If no token exists, user is not authenticated - FAST EXIT
         if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
         }

         try {
            // Decode the JWT token - FAST synchronous operation
            const decodedToken = jwtDecode<DecodedToken>(token);

            // Check if token has required fields and hasn't expired
            if (!decodedToken.id || !decodedToken.role) {
               setIsAuthenticated(false);
               setLoading(false);
               return;
            }

            // Check token expiration
            if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
               setIsAuthenticated(false);
               setLoading(false);
               return;
            }

            // Use decoded token immediately - DON'T BLOCK ON API CALL
            setUser({
               id: decodedToken.id,
               name: decodedToken.email?.split("@")[0] || "User",
               email: decodedToken.email || "",
               role: decodedToken.role,
            });
            setIsAuthenticated(true);
            setLoading(false);

            // Fetch full profile in background (non-blocking)
            authorizedAPI.get(`/users/profile`)
               .then((response) => {
                  const userData = response.data;
                  setUser({
                     id: userData.id,
                     name: userData.name,
                     email: userData.email,
                     role: userData.role,
                  });
               })
               .catch(() => {
                  // Silent fail - we already have token data
               });
         } catch (decodeError) {
            console.error("Token decode error:", decodeError);
            setIsAuthenticated(false);
            setLoading(false);
         }
      } catch (error) {
         console.error("Auth initialization error:", error);
         setIsAuthenticated(false);
         setLoading(false);
      }
   };

   // Run initialization on component mount
   useEffect(() => {
      initializeAuth();
   }, []);

   // Don't show loading spinner - render immediately with token data

   return <>{children}</>;
};

export default AuthProvider;
