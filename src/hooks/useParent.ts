import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authorizedAPI } from "@/lib/api";
import handleApiRequest from "@/utils/handleApiRequest";

export interface Child {
   id: string;
   name: string;
   grade?: string;
   email: string;
   age?: number;
}

export interface ChildCourse {
   id?: string;
   title?: string;
   status?: string;
}

export interface ChildMessage {
   title?: string;
   from?: string;
   detail?: string;
}

export interface ChildUpcoming {
   title?: string;
   when?: string;
   start_time?: string;
}

export interface ChildDetails {
   id: string;
   name: string;
   email: string;
   grade?: string;
   age?: number;
   year?: string;
   stream?: string;
   attendance?: {
      percentage?: number;
      attended?: number;
      total?: number;
   };
   attendancePercentage?: number;
   attendanceCount?: number;
   totalClasses?: number;
   courses: ChildCourse[];
   upcoming: ChildUpcoming[];
   messages: ChildMessage[];
   overallStatus?: string;
   overallNote?: string;
}

interface PerformanceData {
   child_info?: Partial<ChildDetails>;
   attendance?: {
      percentage?: number;
      attended?: number;
      total?: number;
   };
   courses?: ChildCourse[];
   upcoming?: ChildUpcoming[];
   messages?: ChildMessage[];
   overallStatus?: string;
   overallNote?: string;
}

const fetchChildren = () => {
   return handleApiRequest(() =>
      authorizedAPI.get("/parent/children", { withCredentials: true })
   );
};

const fetchChildPerformance = (childId: string) => {
   return handleApiRequest(() =>
      authorizedAPI.get(`/parent/children/${childId}/performance`, {
         withCredentials: true,
      })
   );
};

const normalizeChildDetails = (raw: any, childId: string): ChildDetails => {
   const info = raw?.child_info || {};
   const attendancePercentage =
      raw?.attendance?.percentage ?? raw?.attendancePercentage ?? undefined;
   const attendanceCount =
      raw?.attendance?.attended ?? raw?.attendanceCount ?? undefined;
   const totalClasses =
      raw?.attendance?.total ?? raw?.totalClasses ?? undefined;

   const courses: ChildCourse[] = (raw?.courses || []).map((c: any) => ({
      id: c?.id,
      title: c?.title,
      status:
         c?.status ||
         c?.overall_performance ||
         (typeof c?.progress === "number" && c.progress < 50
            ? "Needs support"
            : "Good"),
   }));

   const upcoming: ChildUpcoming[] =
      raw?.upcoming ||
      raw?.recent_activity ||
      [];

   const messages: ChildMessage[] = raw?.messages || [];

   return {
      id: info.id || childId,
      name: info.name || "Student",
      email: info.email || "",
      grade: info.grade,
      year: info.year,
      stream: info.stream,
      attendance: {
         percentage: attendancePercentage,
         attended: attendanceCount,
         total: totalClasses,
      },
      attendancePercentage,
      attendanceCount,
      totalClasses,
      courses,
      upcoming,
      messages,
      overallStatus:
         raw?.overallStatus ||
         raw?.academic_summary?.overall_performance,
      overallNote: raw?.overallNote,
   };
};

const fetchChildDetails = async (childId: string) => {
   const raw = await handleApiRequest(() =>
      authorizedAPI.get(`/parent/children/${childId}`, {
         withCredentials: true,
      })
   );
   return normalizeChildDetails(raw, childId);
};

export const useChildren = () => {
   return useQuery<Child[], Error>({
      queryKey: ["parent-children"],
      queryFn: fetchChildren,
   });
};

export const useChildPerformance = (childId: string) => {
   return useQuery<PerformanceData, Error>({
      queryKey: ["child-performance", childId],
      queryFn: () => fetchChildPerformance(childId),
      enabled: !!childId,
   });
};

export const useChildDetails = (childId: string) => {
   return useQuery<ChildDetails, Error>({
      queryKey: ["child-details", childId],
      queryFn: () => fetchChildDetails(childId),
      enabled: !!childId,
   });
};
