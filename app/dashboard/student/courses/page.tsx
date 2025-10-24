"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

/*
  Student Courses Page

  Purpose:
  - Shows the list of courses a student is enrolled in with quick progress
    indicators and next session information.

  Data Shape (local example):
    const courses = [ { id, title, progress, instructor, nextSession } ]

  Notes for contributors:
  - Replace the local `courses` array with a real data fetch (server or
    client) depending on your auth strategy.
  - Consider moving the progress bar to a reusable component if used in
    multiple places.
  - If you add links to course detail pages, ensure routes like
    `/dashboard/student/courses/[id]` are created.
*/

export default function StudentCoursesPage() {
  const { t } = useI18n();

  const courses = [
    {
      id: 1,
      title: "Web Development",
      progress: 75,
      instructor: "Prof. A",
      nextSession: "Tomorrow, 9:00 AM",
    },
    {
      id: 2,
      title: "Data Structures",
      progress: 60,
      instructor: "Prof. B",
      nextSession: "Today, 2:00 PM",
    },
    {
      id: 3,
      title: "Database Systems",
      progress: 45,
      instructor: "Prof. C",
      nextSession: "Fri, 10:00 AM",
    },
  ];

  return (
    <DashboardLayout
      role={t("role.student")}
      roleColor="bg-blue-500/10 text-blue-600"
      navigation={[]}
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <Card key={c.id} className="hover:shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="font-medium">{c.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {c.nextSession}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Instructor: {c.instructor}
                </p>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span className="font-medium">{c.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
