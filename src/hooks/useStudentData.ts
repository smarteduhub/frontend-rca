// src/hooks/useStudentData.ts
import { useQuery } from '@tanstack/react-query';
import { authorizedAPI } from '@/lib/api';

export function useStudentCourses() {
  return useQuery({
    queryKey: ["student", "courses"],
    queryFn: async () => {
      const { data } = await authorizedAPI.get("/api/student/courses");
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useStudentAssignments() {
  return useQuery({
    queryKey: ["student", "assignments"],
    queryFn: async () => {
      const { data } = await authorizedAPI.get("/api/student/assignments");
      return data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}