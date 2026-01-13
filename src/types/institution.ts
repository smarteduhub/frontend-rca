export interface InstitutionProfile {
  id: string;
  name: string;
  slug: string;
  logo: string;
  logoWhite?: string;
  favicon?: string;
  colors: {
    primary: string;
    secondary?: string;
    accent?: string;
  };
  tagline?: string;
  description?: string;
  heroImage?: string;
  features?: {
    showAnnouncements?: boolean;
    showEvents?: boolean;
    showClubs?: boolean;
    showHandbook?: boolean;
    showPrograms?: boolean;
    customDashboard?: boolean;
  };
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}
