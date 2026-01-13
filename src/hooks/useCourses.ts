/**
 * Course Hooks - React Query hooks for course data
 *
 * These hooks use React Query for:
 * - Automatic caching and refetching
 * - Loading/error states
 * - Optimistic updates
 *
 * All hooks call courseService methods (never directly call APIs).
 *
 * Usage in components:
 * const { data, isLoading, error } = useGetAllCourses();
 * const createMutation = useCreateCourse();
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Course, CourseFormData, Material } from "@/types/course";
import React from "react";
import { courseService } from "@/services";

// Service-based query functions
const getAllCourses = (): Promise<Course[]> => {
  return courseService.getAll();
};

const createCourse = (data: CourseFormData): Promise<Course> => {
  return courseService.create(data);
};

const updateCourse = ({
  data,
  id,
}: {
  data: CourseFormData;
  id: string;
}): Promise<Course> => {
  return courseService.update(id, data);
};

const getCourseById = ({
  queryKey,
}: {
  queryKey: [string, string];
}): Promise<Course> => {
  const [_, id] = queryKey;
  return courseService.getById(id);
};

const deleteCourseById = (id: string): Promise<void> => {
  return courseService.delete(id);
};

const getEnrolledCourses = (): Promise<Course[]> => {
  return courseService.getEnrolled();
};

const enrollInCourse = (id: string): Promise<Course> => {
  return courseService.enroll(id);
};

const uploadMaterial = ({
  courseId,
  title,
  file,
}: {
  courseId: string;
  title: string;
  file: File;
}): Promise<Material> => {
  return courseService.uploadMaterial(courseId, title, file);
};

const getMaterials = (courseId: string): Promise<Material[]> => {
  return courseService.getMaterials(courseId);
};

const deleteMaterial = (materialId: string): Promise<void> => {
  return courseService.deleteMaterial(materialId);
};

const getRelatedCourses = async (courseId: string): Promise<Course[]> => {
  return courseService.getRelated(courseId);
};

export const useGetAllCourses = () =>
  useQuery<Course[], Error>({ queryKey: ["courses"], queryFn: getAllCourses });

export const useGetEnrolledCourses = () =>
  useQuery<Course[], Error>({
    queryKey: ["enrolledCourses"],
    queryFn: getEnrolledCourses,
  });

export const useCreateCourse = () => {
  return useMutation<Course, Error, CourseFormData>({
    mutationFn: createCourse,
  });
};

export const useUpdateCourse = () => {
  return useMutation<Course, Error, { data: CourseFormData; id: string }>({
    mutationFn: updateCourse,
  });
};

export const useDeleteCourse = () => {
  return useMutation<void, Error, string>({
    mutationFn: deleteCourseById,
  });
};

export const useGetCourseById = (id: string) => {
  return useQuery({
    queryKey: ["course", id || ""],
    queryFn: getCourseById,
    enabled: !!id,
  });
};

export const useEnrollInCourse = () => {
  return useMutation<Course, Error, string>({
    mutationFn: enrollInCourse,
  });
};

export const useUploadMaterial = () => {
  return useMutation<
    Material,
    Error,
    { courseId: string; title: string; file: File }
  >({
    mutationFn: uploadMaterial,
  });
};

export const useGetMaterials = (courseId: string) => {
  return useQuery<Material[], Error>({
    queryKey: ["materials", courseId],
    queryFn: () => getMaterials(courseId),
    enabled: !!courseId,
  });
};

export const useDeleteMaterial = () => {
  return useMutation<void, Error, string>({
    mutationFn: deleteMaterial,
  });
};

export const useGetRelatedCourses = (courseId: string) => {
  return useQuery<Course[], Error>({
    queryKey: ["relatedCourses", courseId],
    queryFn: () => getRelatedCourses(courseId),
    enabled: !!courseId, // Only run when we have a course ID
  });
};

export const useGetAllCoursesWithEnrollment = () => {
  const { data: allCourses, isLoading: isLoadingAll } = useGetAllCourses();
  const { data: enrolledCourses, isLoading: isLoadingEnrolled } =
    useGetEnrolledCourses();

  const mergedCourses = React.useMemo(() => {
    if (!allCourses) return [];

    return allCourses.map((course) => ({
      ...course,
      isEnrolled:
        enrolledCourses?.some((enrolled) => enrolled.id === course.id) ?? false,
      materials: course.materials || [], // Ensure materials is always an array
    }));
  }, [allCourses, enrolledCourses]);

  return {
    data: mergedCourses,
    isLoading: isLoadingAll || isLoadingEnrolled,
  };
};

export const useUpdateCourseProgress = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { progress: number },
    Error,
    { courseId: string; progress: number }
  >({
    mutationFn: async ({ courseId, progress }) => {
      return courseService.updateProgress(courseId, progress);
    },
    onSuccess: () => {
      // Invalidate and refetch enrolled courses
      queryClient.invalidateQueries({ queryKey: ["enrolledCourses"] });
    },
  });
};

// Add function to calculate course progress
export const calculateCourseProgress = (course: Course): number => {
  if (!course.materials || course.materials.length === 0) return 0;

  const materialsViewed = course.materials.filter((m) => m.viewed).length;
  return (materialsViewed / course.materials.length) * 100;
};

export const useMarkMaterialComplete = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { materialId: string }>({
    mutationFn: async ({ materialId }) => {
      return courseService.markMaterialComplete(materialId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      queryClient.invalidateQueries({ queryKey: ["enrolledCourses"] });
    },
  });
};
