"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export default function TeacherSchedulePage() {
  const { t } = useI18n();

  const events = [
    { id: 1, title: "Web Dev Lecture", time: "Today, 9:00 AM", room: "Room A" },
    { id: 2, title: "JS Workshop", time: "Tomorrow, 2:00 PM", room: "Lab 2" },
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
            <CardTitle>My Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {events.map((e) => (
                <li
                  key={e.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-sm text-muted-foreground">{e.room}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{e.time}</div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
