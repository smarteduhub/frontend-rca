/**
 * Course Service - All course API operations
 *
 * Extends BaseService to get automatic error handling.
 * All methods use this.request() which wraps API calls.
 *
 * Key methods:
 * - getAll(): Get all courses
 * - getById(id): Get single course
 * - create(data): Create new course
 * - getEnrolled(): Get user's enrolled courses
 * - enroll(courseId): Enroll in course
 *
 * Called by hooks in src/hooks/useCourses.ts
 * Never called directly by components.
 */

import { BaseService } from "./base.service";
import type { ICourseService } from "./interfaces";
import type { Course, CourseFormData, Material } from "@/types/course";
import type { ListQueryParams } from "./types";

export class CourseService extends BaseService implements ICourseService {
  async getAll(query?: ListQueryParams): Promise<Course[]> {
    const queryString = query ? `?${this.buildQueryString(query)}` : "";
    return this.request(() =>
      this.authorizedAPI.get<Course[]>(`/courses${queryString}`)
    );
  }

  async getById(id: string): Promise<Course> {
    return this.request(() => this.authorizedAPI.get<Course>(`/courses/${id}`));
  }

  async create(data: CourseFormData): Promise<Course> {
    const courseData = {
      title: data.title,
      description: data.description || "",
      long_description: data.long_description || "",
      prerequisites: data.prerequisites || [],
      category: data.category,
      level: data.level,
    };

    return this.request(() =>
      this.authorizedAPI.post<Course>("/courses", courseData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  }

  async update(id: string, data: CourseFormData): Promise<Course> {
    const courseData = {
      ...data,
      prerequisites: data.prerequisites || null,
    };

    return this.request(() =>
      this.authorizedAPI.put<Course>(`/courses/${id}`, courseData)
    );
  }

  async delete(id: string): Promise<void> {
    return this.request(() => this.authorizedAPI.delete(`/courses/${id}`));
  }

  async getEnrolled(): Promise<Course[]> {
    return this.request(() =>
      this.authorizedAPI.get<Course[]>("/courses/enrolled/me")
    );
  }

  async enroll(courseId: string): Promise<Course> {
    return this.request(() =>
      this.authorizedAPI.post<Course>(`/courses/${courseId}/enroll`)
    );
  }

  async getMaterials(courseId: string): Promise<Material[]> {
    return this.request(() =>
      this.authorizedAPI.get<Material[]>(`/courses/${courseId}/materials`)
    );
  }

  async uploadMaterial(
    courseId: string,
    title: string,
    file: File
  ): Promise<Material> {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    return this.request(() =>
      this.authorizedAPI.post<Material>(
        `/courses/${courseId}/materials`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
    );
  }

  async deleteMaterial(materialId: string): Promise<void> {
    return this.request(() =>
      this.authorizedAPI.delete(`/courses/materials/${materialId}`)
    );
  }

  async getRelated(courseId: string): Promise<Course[]> {
    // First get the current course
    const currentCourse = await this.getById(courseId);

    // Get all courses
    const allCourses = await this.getAll();

    // Filter and calculate relevance
    const related = allCourses
      .filter((c) => c.id !== courseId)
      .map((c) => ({
        ...c,
        relevanceScore: this.calculateRelevanceScore(currentCourse, c),
      }))
      .sort(
        (a, b) =>
          (b as Course & { relevanceScore: number }).relevanceScore -
          (a as Course & { relevanceScore: number }).relevanceScore
      )
      .slice(0, 3);

    return related as Course[];
  }

  async markMaterialComplete(materialId: string): Promise<void> {
    return this.request(() =>
      this.authorizedAPI.patch(`/courses/materials/${materialId}/complete`)
    );
  }

  async updateProgress(
    courseId: string,
    progress: number
  ): Promise<{ progress: number }> {
    return this.request(() =>
      this.authorizedAPI.put<{ progress: number }>(
        `/courses/${courseId}/progress`,
        { progress }
      )
    );
  }

  /**
   * Calculate relevance score between two courses
   * Business logic extracted from hook
   */
  private calculateRelevanceScore(
    sourceCourse: Course,
    targetCourse: Course
  ): number {
    let score = 0;

    // Same category (highest weight)
    if (sourceCourse.category === targetCourse.category) {
      score += 5;
    }

    // Same level
    if (sourceCourse.level === targetCourse.level) {
      score += 3;
    }

    // Similar description (basic text matching)
    if (sourceCourse.description && targetCourse.description) {
      const sourceWords = sourceCourse.description.toLowerCase().split(" ");
      const targetWords = targetCourse.description.toLowerCase().split(" ");
      const commonWords = sourceWords.filter(
        (word) => word.length > 3 && targetWords.includes(word)
      );
      score += commonWords.length * 0.1;
    }

    return score;
  }
}
