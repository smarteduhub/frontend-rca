"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { Button } from "@/components/ui/button";

export default function TeacherClassesPage() {
  const { t } = useI18n();

  const classes = [
    {
      id: 1,
      name: "Web Development 101",
      students: 45,
      nextSession: "Today, 9:00 AM",
    },
    {
      id: 2,
      name: "Advanced JavaScript",
      students: 38,
      nextSession: "Tomorrow, 2:00 PM",
    },
  ];

  return (
    <DashboardLayout
      role={t("role.teacher")}
      roleColor="bg-green-500/10 text-green-600"
      navigation={[]}
    >
      <div className="space-y-6">
        <div className="space-y-3">
          {classes.map((c) => (
            <Card key={c.id} className="hover:shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="font-medium">{c.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {c.nextSession}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {c.students} students
                  </div>
                  <div>
                    <Button variant="outline">Manage</Button>
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
