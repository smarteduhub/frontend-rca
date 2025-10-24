"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";

export default function AdminCoursesPage() {
  const { t } = useI18n();

  const courses = [
    { id: 1, title: "Web Development", instructor: "Prof. A", students: 45 },
    { id: 2, title: "Data Structures", instructor: "Prof. B", students: 38 },
  ];

  return (
    <DashboardLayout
      role={t("role.admin")}
      roleColor="bg-orange-500/10 text-orange-600"
      navigation={[]}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Courses</h2>
          <Button asChild>
            <a href="/dashboard/admin/courses/new">Create Course</a>
          </Button>
        </div>

        <div className="space-y-3">
          {courses.map((c) => (
            <Card key={c.id} className="hover:shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="font-medium">{c.title}</span>
                  <span className="text-sm text-muted-foreground">
                    {c.students} students
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Instructor: {c.instructor}
                  </div>
                  <div>
                    <Button variant="ghost">Manage</Button>
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
