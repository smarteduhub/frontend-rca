// types/assignments.ts
export interface Assignment {
   id: string;
   title: string;
   description?: string;
   course_id: string;
   google_form_url?: string;
   file_url?: string; // URL for uploaded assignment file
   file_name?: string; // Original file name
   assignment_type?: "file" | "google_form"; // Type of assignment
   created_at: string;
   due_date?: string;
   submitted_at?: string;
   course: {
     id: string;
     title: string;
   };
}
 
 export interface AssignmentFormData {
   title: string;
   description?: string;
   course_id: string;
   google_form_url?: string;
   file?: File; // File to upload (not sent to API directly)
   due_date?: string;
   assignment_type?: "file" | "google_form"; // Type of assignment
 }
 
 export interface AssignmentStats {
   total: number;
   pending: number;
   completed: number;
   overdue: number;
 }
 
 export interface CourseWithAssignments {
   courseId: string;
   courseTitle: string;
   assignments: Assignment[];
 }