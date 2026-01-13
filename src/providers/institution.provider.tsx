/**
 * Institution Provider Wrapper
 * 
 * This is a client-side wrapper for InstitutionProvider.
 * It bridges the gap between the server-side layout and the client-side context.
 * 
 * Why this exists:
 * - The root layout is a server component
 * - InstitutionContext is a client component
 * - We need a wrapper to properly pass props from server to client
 * - This ensures the institution profile is available throughout the app
 */

'use client';

import React from 'react';
import { InstitutionProvider } from '@/contexts/InstitutionContext';
import { InstitutionProfile } from '@/types/institution';

/**
 * Props for the Institution Provider Wrapper
 */
interface InstitutionProviderWrapperProps {
  // The institution profile to provide
  profile: InstitutionProfile;
  
  // Child components
  children: React.ReactNode;
}

/**
 * Institution Provider Wrapper Component
 * 
 * This component wraps the InstitutionProvider and is marked as 'use client'.
 * It allows the server-side layout to pass the institution profile to client components.
 * 
 * @param profile - The institution profile (RCA, etc.)
 * @param children - Child components to wrap
 * @returns Wrapped children with institution context
 */
const InstitutionProviderWrapper: React.FC<InstitutionProviderWrapperProps> = ({
  profile,
  children,
}) => {
  return (
    <InstitutionProvider profile={profile}>
      {children}
    </InstitutionProvider>
  );
};

export default InstitutionProviderWrapper;
