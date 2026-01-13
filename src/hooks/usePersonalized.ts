"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import type { EventResponse, AssignmentOut, ChildInfo } from "@/types/api";

const fetchUserEvents = async (): Promise<EventResponse[]> => {
  return apiClient.userEvents();
};

/**
 * Student overview data: currently surfaces upcoming/past events.
 * Extend here to include personalized summaries as backend expands.
 */
export const useStudentOverview = () => {
  const {
    data = [],
    isLoading,
    error,
  } = useQuery<EventResponse[], Error>({
    queryKey: ["student-overview-events"],
    queryFn: fetchUserEvents,
  });

  return { events: data, isLoading, error };
};

/**
 * Teacher overview: assignments to review + events.
 */
export const useTeacherOverview = () => {
  const assignments = useQuery<AssignmentOut[], Error>({
    queryKey: ["teacher-overview-assignments"],
    queryFn: () => apiClient.teacherAssignments(),
  });

  const events = useQuery<EventResponse[], Error>({
    queryKey: ["teacher-overview-events"],
    queryFn: fetchUserEvents,
  });

  return {
    assignments,
    events,
  };
};

/**
 * Parent overview: children list + events.
 */
export const useParentOverview = () => {
  const children = useQuery<ChildInfo[], Error>({
    queryKey: ["parent-overview-children"],
    queryFn: () => apiClient.parentChildren(),
  });

  const events = useQuery<EventResponse[], Error>({
    queryKey: ["parent-overview-events"],
    queryFn: fetchUserEvents,
  });

  return {
    children,
    events,
  };
};
