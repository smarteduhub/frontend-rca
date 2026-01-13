/**
 * Institution Configurations
 * 
 * This file contains profiles for all institutions using SmartEduHub.
 * Currently configured: Rwanda Coding Academy (RCA)
 * 
 * To add a new institution:
 * 1. Create a new profile object following the InstitutionProfile interface
 * 2. Add it to the institutions object
 * 3. Update the getInstitution function to detect it
 * 
 * No other code changes needed!
 */

import { InstitutionProfile } from '@/types/institution';

/**
 * Rwanda Coding Academy Profile
 * 
 * This is the primary institution using SmartEduHub.
 * All RCA-specific branding, colors, and features are configured here.
 * 
 * Colors:
 * - Primary: #003DA5 (RCA Official Blue)
 * - Secondary: #F2A900 (RCA Official Yellow)
 * 
 * Features enabled:
 * - Announcements: Show RCA announcements
 * - Events: Show RCA bootcamps and events
 * - Clubs: Show student clubs
 * - Handbook: Show student handbook
 * - Programs: Show RCA programs
 * - Custom Dashboard: Show RCA-specific dashboard widgets
 */
export const rcaProfile: InstitutionProfile = {
  // Unique identifier
  id: 'rca-001',
  
  // Display name
  name: 'Rwanda Coding Academy',
  
  // URL slug (used for routing if needed)
  slug: 'rca',
  
  // Logo - using SmartEduHub logo as placeholder
  // TODO: Replace with actual RCA logo when available
  logo: '/images/logo.svg',
  
  // White logo variant for dark backgrounds
  logoWhite: '/images/logo.svg',
  
  // Favicon
  favicon: '/favicon.ico',
  
  // Brand colors
  colors: {
    // RCA Official Blue
    primary: '#003DA5',
    
    // RCA Official Yellow
    secondary: '#F2A900',
    
    // Fallback to SmartEduHub blue for compatibility
    accent: '#1782CF',
  },
  
  // Short tagline
  tagline: 'Learn. Code. Build. Lead.',
  
  // Longer description
  description: 'Rwanda Coding Academy - Your Gateway to Tech Excellence',
  
  // Hero image - using placeholder
  // TODO: Replace with actual RCA hero image when available
  heroImage: '/images/hero.svg',
  
  // Feature flags - all enabled for RCA
  features: {
    showAnnouncements: true,
    showEvents: true,
    showClubs: true,
    showHandbook: true,
    showPrograms: true,
    customDashboard: true,
  },
  
  // Contact information
  website: 'https://rwandacodingacademy.com',
  email: 'info@rca.rw',
  phone: '+250 788 123 456',
  address: 'Kigali, Rwanda',
  
  // Social media links
  socialLinks: {
    facebook: 'https://facebook.com/rwandacodingacademy',
    instagram: 'https://instagram.com/rwandacodingacademy',
    twitter: 'https://twitter.com/rwandacodingacademy',
    linkedin: 'https://linkedin.com/company/rwandacodingacademy',
  },
};

/**
 * All institutions
 * 
 * Add new institutions here as they join SmartEduHub.
 * Each institution gets its own profile object.
 */
export const institutions: Record<string, InstitutionProfile> = {
  // Rwanda Coding Academy (default)
  rca: rcaProfile,
  
  // Add more institutions here:
  // ur: universityOfRwandaProfile,
  // kist: kistProfile,
};

/**
 * Get institution profile by slug
 * 
 * @param slug - Institution slug (e.g., 'rca')
 * @returns Institution profile or RCA profile as default
 * 
 * This function:
 * - Looks up the institution by slug
 * - Returns RCA profile as default if not found
 * - Ensures the app always has a valid institution profile
 */
export const getInstitution = (slug?: string): InstitutionProfile => {
  // If no slug provided, use RCA as default
  if (!slug) {
    return rcaProfile;
  }

  // Look up institution by slug
  const institution = institutions[slug.toLowerCase()];

  // Return found institution or RCA as fallback
  return institution || rcaProfile;
};

/**
 * Get default institution
 * 
 * Currently returns RCA profile.
 * This is used when no specific institution is requested.
 */
export const getDefaultInstitution = (): InstitutionProfile => {
  return rcaProfile;
};
