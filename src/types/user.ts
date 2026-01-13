export interface User {
   id: string;
   name: string;
   email: string;
   username?: string;
   phone?: string;
   country?: string;
   field_of_study?: string;
   role: string;
   grade?: string; // Year/Grade level (e.g., "Year 1", "Year 2", "Year 3")
   year?: string; // Alternative naming for year level
   created_at?: string;
   is_active?: boolean;
   is_superuser?: boolean;
   oauth_provider?: string;
   // Optional profile stats (parent/student dashboards)
   coursesEnrolled?: number;
   completedCourses?: number;
   achievements?: number;
   averageGrade?: string;
}

export interface UserUpdate {
   username?: string;
   name?: string;
   email?: string;
   phone?: string;
   country?: string;
   field_of_study?: string;
   password?: string;
   role?: string;
   is_active?: boolean;
}
