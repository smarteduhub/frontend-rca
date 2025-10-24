"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export default function StudentGradesPage() {
  const { t } = useI18n();

  const grades = [
    { id: 1, course: "Web Development", grade: "A-", term: "2025 Q1" },
    { id: 2, course: "Data Structures", grade: "B+", term: "2025 Q1" },
    { id: 3, course: "Database Systems", grade: "B", term: "2025 Q1" },
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
            <CardTitle>Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {grades.map((g) => (
                <div
                  key={g.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{g.course}</p>
                    <p className="text-sm text-muted-foreground">{g.term}</p>
                  </div>
                  <div className="font-bold">{g.grade}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
