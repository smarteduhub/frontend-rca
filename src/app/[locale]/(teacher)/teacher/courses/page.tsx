"use client";

import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useGetAllCourses } from "@/hooks/useCourses";
import { useAuthStore } from "@/store/useAuthStore";

const CoursesPage = () => {
  const { data: coursesData = [] } = useGetAllCourses();
  const { user } = useAuthStore();

  const teacherCourses = useMemo(() => {
    return (coursesData as any[]).filter(
      (c) => c?.teacher?.id && user?.id && c.teacher.id === user.id
    );
  }, [coursesData, user?.id]);

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-slate-900">Courses</h1>
        <p className="text-sm text-slate-500 mt-1">
          Courses assigned to you by admin.
        </p>
      </div>

      {teacherCourses.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center">
          <p className="text-slate-700 font-medium">No assigned courses yet.</p>
          <p className="text-sm text-slate-600">
            Your courses will appear here when assigned by admin.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teacherCourses.map((course: any) => (
            <Card
              key={course.id || course.title}
              className="p-4 border border-slate-200 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 line-clamp-2">
                    {course.title || "Course"}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {course.className || course.level || "Assigned class"}
                  </p>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-600">
                Teacher: {course.teacher?.name || "You"}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
