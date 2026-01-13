// Typed models derived from the backend OpenAPI spec (subset for frontend use)

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  username?: string | null;
  phone?: string | null;
  country?: string | null;
  field_of_study?: string | null;
  is_active: boolean;
  children_ids?: string[] | null;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AdminUserCreate {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  country?: string | null;
  field_of_study?: string | null;
  children_ids?: string[] | null; // for parent
}

export interface AdminUserRow extends UserResponse {}

export interface CourseOut {
  id: string;
  title: string;
  description?: string | null;
  long_description?: string | null;
  prerequisites?: string[] | null;
  category: string;
  level: string;
  created_at: string;
  lastUpdate?: string;
  is_enrolled?: boolean;
  progress?: number | null;
}

export interface UserUpdatePayload {
  username?: string | null;
  name?: string | null;
  email?: string | null;
  password?: string | null;
  phone?: string | null;
  country?: string | null;
  field_of_study?: string | null;
}

export interface EventResponse {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  color?: string | null;
  description?: string | null;
  user_id?: string;
}

export interface AssignmentOut {
  id: string;
  title: string;
  description?: string | null;
  created_at: string;
  submitted_at?: string | null;
  course?: { id?: string; title?: string };
}

export interface ChildInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
}
