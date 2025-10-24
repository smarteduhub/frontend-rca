"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export default function TeacherAssignmentsPage() {
  const { t } = useI18n();

  const assignments = [
    {
      id: 1,
      title: "React Project Submission",
      class: "Web Development 101",
      submissions: 42,
      total: 45,
    },
    {
      id: 2,
      title: "JS Quiz",
      class: "Advanced JavaScript",
      submissions: 35,
      total: 38,
    },
  ];

  return (
    <DashboardLayout
      role={t("role.teacher")}
      roleColor="bg-green-500/10 text-green-600"
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
                    <p className="text-sm text-muted-foreground">{a.class}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {a.submissions}/{a.total}
                    </p>
                    <p className="text-xs text-muted-foreground">submitted</p>
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
