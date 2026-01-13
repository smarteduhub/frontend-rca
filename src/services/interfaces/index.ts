/**
 * Service Interfaces
 * 
 * Define contracts that all services must implement.
 * This allows swapping between mock and real implementations.
 */

import type { Course, CourseFormData, Material } from '@/types/course';
import type { User, UserUpdate } from '@/types/user';
import type { Assignment } from '@/types/assignments';
import type { ListQueryParams, PaginatedResponse } from '../types';

/**
 * Course Service Interface
 */
export interface ICourseService {
  getAll(query?: ListQueryParams): Promise<Course[]>;
  getById(id: string): Promise<Course>;
  create(data: CourseFormData): Promise<Course>;
  update(id: string, data: CourseFormData): Promise<Course>;
  delete(id: string): Promise<void>;
  getEnrolled(): Promise<Course[]>;
  enroll(courseId: string): Promise<Course>;
  getMaterials(courseId: string): Promise<Material[]>;
  uploadMaterial(courseId: string, title: string, file: File): Promise<Material>;
  deleteMaterial(materialId: string): Promise<void>;
  getRelated(courseId: string): Promise<Course[]>;
  markMaterialComplete(materialId: string): Promise<void>;
  updateProgress(courseId: string, progress: number): Promise<{ progress: number }>;
}

/**
 * Auth Service Interface
 */
export interface IAuthService {
  login(email: string, password: string): Promise<{
    access_token: string;
    token_type: string;
    user: User;
  }>;
  register(data: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    username?: string;
    phone?: string;
    country?: string;
    field_of_study?: string;
  }): Promise<{
    access_token: string;
    token_type: string;
    user: User;
  }>;
  logout(): Promise<void>;
  getProfile(): Promise<User>;
  updateProfile(data: UserUpdate): Promise<User>;
  initiateOAuth(provider: string, role?: string): Promise<{ auth_url: string }>;
  handleOAuthCallback(provider: string, code: string): Promise<{
    access_token: string;
    token_type: string;
    user: User;
  }>;
}

/**
 * Assignment Service Interface
 */
export interface IAssignmentService {
  getAll(): Promise<Assignment[]>;
  getById(id: string): Promise<Assignment>;
  create(data: Partial<Assignment>): Promise<Assignment>;
  update(id: string, data: Partial<Assignment>): Promise<Assignment>;
  delete(id: string): Promise<void>;
  getTeacherAssignments(): Promise<Assignment[]>;
  getStudentAssignments(): Promise<Assignment[]>;
  submit(assignmentId: string): Promise<void>;
}

/**
 * User Service Interface
 */
export interface IUserService {
  getAll(query?: ListQueryParams): Promise<User[]>;
  getById(id: string): Promise<User>;
  update(id: string, data: UserUpdate): Promise<User>;
  delete(id: string): Promise<void>;
}






