"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import type { EventResponse } from "@/types/api";

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
