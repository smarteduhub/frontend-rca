import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assignmentService } from "@/services";
import type { Assignment } from "@/types/assignments";

export const useGetAllAssignments = () =>
  useQuery<Assignment[], Error>({
    queryKey: ["assignments"],
    queryFn: () => assignmentService.getAll(),
  });

export const useCreateAssignment = () => {
  return useMutation<Assignment, Error, Partial<Assignment>>({
    mutationFn: (data) => assignmentService.create(data),
  });
};

export const useUpdateAssignment = () => {
  return useMutation<
    Assignment,
    Error,
    { id: string; data: Partial<Assignment> }
  >({
    mutationFn: ({ id, data }) => assignmentService.update(id, data),
  });
};

export const useDeleteAssignment = () => {
  return useMutation<void, Error, string>({
    mutationFn: (id) => assignmentService.delete(id),
  });
};

export const useGetAssignmentById = (id?: string) =>
  useQuery<Assignment, Error>({
    queryKey: ["assignment", id],
    queryFn: () => assignmentService.getById(id!),
    enabled: !!id, // Only run the query if id exists
  });

export const useGetTeacherAssignments = () =>
  useQuery<Assignment[], Error>({
    queryKey: ["teacherAssignments"],
    queryFn: () => assignmentService.getTeacherAssignments(),
    retry: false,
    // react-query v5 dropped onError in options; handle errors in services or consumers
  });

export const useGetStudentAssignments = () =>
  useQuery<Assignment[], Error>({
    queryKey: ["studentAssignments"],
    queryFn: () => assignmentService.getStudentAssignments(),
    retry: false,
    // react-query v5 dropped onError in options; handle errors in services or consumers
  });

export const useSubmitAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { assignmentId: string }>({
    mutationFn: ({ assignmentId }) => assignmentService.submit(assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentAssignments"] });
    },
  });
};
