"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export default function StudentSchedulePage() {
  const { t } = useI18n();

  const events = [
    {
      id: 1,
      title: "Web Dev - Lecture",
      time: "Tomorrow, 9:00 AM",
      location: "Room A",
    },
    {
      id: 2,
      title: "Data Structures - Lab",
      time: "Today, 2:00 PM",
      location: "Lab 1",
    },
    {
      id: 3,
      title: "Database - Tutorial",
      time: "Fri, 10:00 AM",
      location: "Room B",
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
            <CardTitle>Upcoming Schedule</CardTitle>
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
                    <p className="text-sm text-muted-foreground">
                      {e.location}
                    </p>
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
