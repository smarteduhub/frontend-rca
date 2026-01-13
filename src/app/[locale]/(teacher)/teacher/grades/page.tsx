"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart } from "lucide-react";

const TeacherGradesPage = () => {
   return (
      <div className="space-y-6">
         <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
               <h1 className="text-2xl font-semibold text-slate-900">Grades</h1>
               <p className="text-slate-600">
                  Post results and share feedback quickly, class by class.
               </p>
            </div>
            <Button variant="outline" className="gap-2">
               <BarChart className="h-4 w-4" />
               Import grades
            </Button>
         </div>

         <Card className="border-slate-200 bg-white p-5">
            <p className="text-slate-700">
               Your classes will appear here. Choose a class to record grades or
               export summaries. No extra setup needed.
            </p>
         </Card>
      </div>
   );
};

export default TeacherGradesPage;