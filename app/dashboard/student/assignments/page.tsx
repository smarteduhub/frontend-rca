"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

/*
  Student Assignments Page

  Purpose:
  - Lists pending and submitted assignments for the current student.
  - Includes simple metadata (course, due date, status) for each item.

  Data Shape (local example):
    const assignments = [ { id, title, course, due, status } ]

  Notes / next steps:
  - Wire this page to your assignments API and implement pagination or
    filtering (by course, due date, status) as needed.
  - Add action buttons for submission or viewing details if permitted.
*/

export default function StudentAssignmentsPage() {
  const { t } = useI18n();

  const assignments = [
    {
      id: 1,
      title: "React Project",
      course: "Web Development",
      due: "In 2 days",
      status: "pending",
    },
    {
      id: 2,
      title: "Binary Trees Lab",
      course: "Data Structures",
      due: "In 5 days",
      status: "draft",
    },
    {
      id: 3,
      title: "SQL Queries",
      course: "Database Systems",
      due: "In 1 week",
      status: "submitted",
    },
  ];

  return (
    <DashboardLayout
      role={t("role.student")}
      roleColor="bg-blue-500/10 text-blue-600"
      navigation={[]}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assignments.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="text-sm text-muted-foreground">{a.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{a.due}</p>
                    <p className="text-xs text-muted-foreground">{a.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
