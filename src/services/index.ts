/**
 * Services Index
 * 
 * Central export point for all services.
 * This allows easy swapping between mock and real implementations.
 */

import { CourseService } from './course.service';
import { AuthService } from './auth.service';
import { AssignmentService } from './assignment.service';

// Check if we should use mock services
const USE_MOCK_SERVICES = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

// Export service instances
// In the future, we can conditionally export mock services here
export const courseService = new CourseService();
export const authService = new AuthService();
export const assignmentService = new AssignmentService();

// Export service classes for testing/mocking
export { CourseService } from './course.service';
export { AuthService } from './auth.service';
export { AssignmentService } from './assignment.service';

// Export types
export type { ICourseService } from './interfaces';
export type { IAuthService } from './interfaces';
export type { IAssignmentService } from './interfaces';
export type { ApiResponse, PaginatedResponse, ApiError, ListQueryParams } from './types';




