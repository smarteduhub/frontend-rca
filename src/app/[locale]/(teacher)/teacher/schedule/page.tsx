"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";

const TeacherSchedulePage = () => {
   return (
      <div className="space-y-6">
         <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
               <h1 className="text-2xl font-semibold text-slate-900">
                  Schedule
               </h1>
               <p className="text-slate-600">
                  See today and this week at a glance. No configuration needed.
               </p>
            </div>
            <Button variant="outline" className="gap-2">
               <CalendarClock className="h-4 w-4" />
               View calendar
            </Button>
         </div>

         <Card className="border-slate-200 bg-white p-5">
            <p className="text-slate-700">
               Your classes and streams are preloaded. Pick a time slot to open
               the class or take attendance.
            </p>
         </Card>
      </div>
   );
};

export default TeacherSchedulePage;