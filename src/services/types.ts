/**
 * Service Layer Types
 * 
 * This file defines the contracts for all services.
 * Services must implement these interfaces to ensure consistency.
 */

/**
 * Base response structure from API
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: number;
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * Standard error response
 */
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

/**
 * Query parameters for list endpoints
 */
export interface ListQueryParams {
  [key: string]: unknown;
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, unknown>;
}




