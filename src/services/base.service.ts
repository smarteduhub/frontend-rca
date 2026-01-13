/**
 * Base Service Class
 *
 * All services extend this class to get:
 * - Automatic error handling via handleApiRequest()
 * - Access to authorizedAPI and unauthorizedAPI
 * - Query string building utilities
 *
 * Usage: Extend this class and use this.request() for all API calls.
 * Example: return this.request(() => this.authorizedAPI.get('/endpoint'));
 */

import { authorizedAPI, unauthorizedAPI } from "@/lib/api";
import handleApiRequest from "@/utils/handleApiRequest";
import type { ApiResponse, ApiError } from "./types";

export class BaseService {
  protected authorizedAPI = authorizedAPI;
  protected unauthorizedAPI = unauthorizedAPI;

  /**
   * Handle API request with error handling
   */
  protected async request<T>(apiCall: () => Promise<{ data: T }>): Promise<T> {
    return handleApiRequest(apiCall);
  }

  /**
   * Build query string from params
   */
  protected buildQueryString(params: Record<string, unknown>): string {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.append(key, String(value));
      }
    });
    return query.toString();
  }

  /**
   * Handle API errors consistently
   */
  protected handleError(error: unknown): ApiError {
    // Error handling logic will be implemented here
    // For now, throw the error as-is
    throw error;
  }
}
