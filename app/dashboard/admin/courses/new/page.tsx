"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminNewCoursePage() {
  const { t } = useI18n();

  return (
    <DashboardLayout
      role={t("role.admin")}
      roleColor="bg-orange-500/10 text-orange-600"
      navigation={[]}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Create Course
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground">
                  Course title
                </label>
                <Input placeholder="e.g. Web Development" className="mt-1" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Instructor
                </label>
                <Input placeholder="Instructor name" className="mt-1" />
              </div>
              <div className="pt-2">
                <Button>Create</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
