"use client";
import React, { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { BookOpen, Users } from "lucide-react";

const courseCatalog: Record<string, string[]> = {
  Y1: [
    "Fundamentals of Programming",
    "Applied Physics I",
    "Computer Basics",
    "Applied Mathematics I",
    "English I",
    "Embedded Systems Hardware",
    "JavaScript",
    "Graphical User Interface (GUI)",
    "PHP",
    "Web User Interface",
    "Basics of Database",
    "Basics of Networking",
    "Entrepreneurship I",
    "Citizenship I",
    "Ikinyarwanda I",
  ],
  Y2: [
    "Fundamentals of OOP with Java",
    "Data Structures & Algorithms",
    "Applied Mathematics II",
    "English II",
    "Applied Physics II",
    "Embedded Systems Software Integration",
    "3D Models",
    "Web3 Applications Development",
    "Software Engineering",
    "Advanced Networking",
    "Advanced Database",
    "Advanced Java",
    "Ikinyarwanda II",
    "Entrepreneurship II",
    "Citizenship II",
  ],
  Y3: [
    "Applied Physics III",
    "Applied Mathematics III",
    "English III",
    "IT Project Monetization",
    "Cyber Security",
    "Intelligent Robotics",
    "DevOps",
    "Mobile Development",
    "Entrepreneurship III",
    "Ikinyarwanda III",
  ],
};

const streamsByYear: Record<string, string[]> = {
  Y1: ["Y1A", "Y1B", "Y1C"],
  Y2: ["Y2A", "Y2B", "Y2C"],
  Y3: ["Y3A", "Y3B", "Y3C", "Y3D"],
};

const sharedCourses = ["Applied Maths", "Applied Physics", "English"];

const PageHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="mb-6">
    <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
    <p className="text-sm text-slate-500 mt-1">{description}</p>
         </div>
      );

const CoursesPage = () => {
  const [year, setYear] = useState<string>("Y1");
  const [stream, setStream] = useState<string>("all");

  const courses = useMemo(() => courseCatalog[year] || [], [year]);
  const streams = streamsByYear[year] || [];

   return (
    <div className="space-y-6">
      <PageHeader
        title="Courses"
        description="View and manage courses by class and stream."
      />

      <div className="bg-white border border-slate-200 rounded-lg p-4 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Class</span>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Y1">Year 1</SelectItem>
              <SelectItem value="Y2">Year 2</SelectItem>
              <SelectItem value="Y3">Year 3</SelectItem>
            </SelectContent>
          </Select>
         </div>

                        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Stream</span>
          <Select value={stream} onValueChange={setStream}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select stream" />
                              </SelectTrigger>
                              <SelectContent>
              <SelectItem value="all">All streams</SelectItem>
              {streams.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Badge variant="outline">
            Shared courses: {sharedCourses.join(", ")}
          </Badge>
                  </div>

        <div className="ml-auto flex gap-2">
          <Button size="sm" variant="outline">
            Assign work
                     </Button>
          <Button size="sm">Create course</Button>
               </div>
            </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card
            key={course}
            className="p-4 border border-slate-200 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <BookOpen className="h-5 w-5" />
                        </div>
                              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 line-clamp-2">
                  {course}
                                 </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {year} {stream !== "all" ? `• ${stream}` : "• All streams"}
                                 </p>
                              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" /> — students
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  View
                                    </Button>
                <Button size="sm">Assign</Button>
                           </div>
                        </div>
                     </Card>
               ))}
            </div>
         </div>
   );
};

export default CoursesPage;