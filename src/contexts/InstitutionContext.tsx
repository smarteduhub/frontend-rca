/**
 * Institution Context
 *
 * This context provides institution profile data to the entire application.
 * It allows any component to access the current institution's branding,
 * colors, features, and configuration without prop drilling.
 *
 * Usage:
 * const { profile } = useContext(InstitutionContext);
 *
 * Or use the useInstitution hook (recommended):
 * const { profile } = useInstitution();
 */

"use client";

import React, { createContext, ReactNode } from "react";
import { InstitutionProfile } from "@/types/institution";

/**
 * Institution Context Type
 * Defines what data is available in the context
 */
interface InstitutionContextType {
  // The current institution's profile
  profile: InstitutionProfile;

  // Check if a feature is enabled for this institution
  isFeatureEnabled: (feature: keyof InstitutionProfile["features"]) => boolean;
}

/**
 * Create the context with undefined default
 * This will be provided by InstitutionProvider
 */
export const InstitutionContext = createContext<
  InstitutionContextType | undefined
>(undefined);

/**
 * Institution Provider Props
 */
interface InstitutionProviderProps {
  // The institution profile to provide
  profile: InstitutionProfile;

  // Child components
  children: ReactNode;
}

/**
 * Institution Provider Component
 *
 * Wraps the application and provides institution context to all children.
 * This should be placed high in the component tree (ideally in root layout).
 *
 * Example:
 * <InstitutionProvider profile={rcaProfile}>
 *   <App />
 * </InstitutionProvider>
 */
export const InstitutionProvider: React.FC<InstitutionProviderProps> = ({
  profile,
  children,
}) => {
  /**
   * Helper function to check if a feature is enabled
   * Makes it easy to conditionally render features
   */
  const isFeatureEnabled = (
    feature: keyof NonNullable<InstitutionProfile["features"]>
  ): boolean => {
    return profile.features?.[feature] ?? false;
  };

  // Provide context value to all children
  const value: InstitutionContextType = {
    profile,
    isFeatureEnabled,
  };

  return (
    <InstitutionContext.Provider value={value}>
      {children}
    </InstitutionContext.Provider>
  );
};

export default InstitutionProvider;
