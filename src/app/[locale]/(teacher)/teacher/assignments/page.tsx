"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Plus } from "lucide-react";

const TeacherAssignmentsPage = () => {
    return (
      <div className="space-y-6">
         <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
               <h1 className="text-2xl font-semibold text-slate-900">
                  Assignments
          </h1>
               <p className="text-slate-600">
                  Create, review, and grade with a few clicks.
          </p>
        </div>
            <Button className="gap-2">
               <Plus className="h-4 w-4" />
               New assignment
                    </Button>
        </div>

         <Card className="border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-3">
               <ClipboardList className="h-5 w-5 text-blue-700" />
               <h2 className="text-lg font-semibold text-slate-900">
                  Your upcoming tasks
               </h2>
                    </div>
            <p className="text-slate-700">
               No assignments loaded yet. This will show your classes
               automatically—no setup needed.
            </p>
                </Card>
      </div>
  );
};

export default TeacherAssignmentsPage;