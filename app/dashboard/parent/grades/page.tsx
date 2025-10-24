"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export default function ParentGradesPage() {
  const { t } = useI18n();

  const reports = [
    { id: 1, student: "John Doe", course: "Web Development", grade: "A-" },
    { id: 2, student: "John Doe", course: "Data Structures", grade: "B+" },
  ];

  return (
    <DashboardLayout
      role={t("role.parent")}
      roleColor="bg-purple-500/10 text-purple-600"
      navigation={[]}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Child's Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{r.course}</p>
                    <p className="text-sm text-muted-foreground">{r.student}</p>
                  </div>
                  <div className="font-bold">{r.grade}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
