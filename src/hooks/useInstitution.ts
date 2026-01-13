/**
 * useInstitution Hook
 * 
 * Custom React hook to access institution profile data.
 * This is the recommended way to access institution context in components.
 * 
 * Usage:
 * const { profile, isFeatureEnabled } = useInstitution();
 * 
 * Examples:
 * 1. Get institution name:
 *    const { profile } = useInstitution();
 *    console.log(profile.name); // "Rwanda Coding Academy"
 * 
 * 2. Check if feature is enabled:
 *    const { isFeatureEnabled } = useInstitution();
 *    if (isFeatureEnabled('showAnnouncements')) {
 *      return <AnnouncementsWidget />;
 *    }
 * 
 * 3. Use institution colors:
 *    const { profile } = useInstitution();
 *    return <div style={{ color: profile.colors.primary }}>
 *      Colored text
 *    </div>
 */

'use client';

import { useContext } from 'react';
import { InstitutionContext } from '@/contexts/InstitutionContext';

/**
 * Hook to access institution profile
 * 
 * @returns Institution context with profile and feature checking
 * @throws Error if used outside InstitutionProvider
 * 
 * Error handling:
 * If you see "useInstitution must be used within InstitutionProvider",
 * it means the component is not wrapped by InstitutionProvider.
 * Make sure InstitutionProvider is in your root layout.
 */
export const useInstitution = () => {
  const context = useContext(InstitutionContext);

  // Throw error if context is not available
  // This helps catch configuration issues early
  if (context === undefined) {
    throw new Error(
      'useInstitution must be used within an InstitutionProvider. ' +
      'Make sure your root layout wraps the app with <InstitutionProvider>.'
    );
  }

  return context;
};
