"use client";

import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarClock,
  CheckSquare,
  ClipboardList,
  Megaphone,
  Users,
  BookOpen,
  Heart,
  Sparkles,
} from "lucide-react";
import { useGetAllCourses } from "@/hooks/useCourses";
import { useAuthStore } from "@/store/useAuthStore";
import { useTeacherOverview } from "@/hooks/usePersonalized";

type CourseLike = {
  id?: string;
  title?: string;
  year?: string;
  className?: string;
  teacher?: { id?: string };
};

const TeacherDashboardPage = () => {
  const { data: coursesData = [] } = useGetAllCourses();
  const courses: CourseLike[] = (coursesData as CourseLike[]) || [];
  const { user } = useAuthStore();
  const { assignments, events } = useTeacherOverview();

  const teacherCourses = useMemo(
    () => courses.filter((course) => course.teacher?.id === user?.id),
    [courses, user?.id]
  );

  const groupedByYear = useMemo(() => {
    const groups: Record<string, CourseLike[]> = {};
    teacherCourses.forEach((course) => {
      const year = course.year || "Year ?";
      if (!groups[year]) groups[year] = [];
      groups[year].push(course);
    });
    return groups;
  }, [teacherCourses]);

  const todaysClasses = [
    { label: "Next", text: "Year 2B – Data Structures", time: "10:30 AM" },
    { label: "Later", text: "Year 1C – Programming Basics", time: "1:00 PM" },
    { label: "Later", text: "Year 3A – Networking", time: "3:30 PM" },
  ];

  const pendingTasks = [
    "Take attendance – Year 1C",
    "Grade 8 submissions – Python Assignment",
    "Post reminder – Year 2B quiz tomorrow",
    "Review AI lesson summary",
  ];

  const studentSupport = [
    { label: "Needs support", value: "5 students", tone: "text-amber-700" },
    { label: "On track", value: "18 students", tone: "text-green-700" },
    { label: "Absent today", value: "2 students", tone: "text-red-700" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold text-slate-900">
          Welcome {user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-slate-600 text-base">
          Clear steps for today. You are in control.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card className="border-slate-200">
          <div className="p-4">
            <p className="text-sm text-slate-600">Your courses</p>
            <p className="text-2xl font-semibold text-slate-900">
              {teacherCourses.length}
            </p>
          </div>
        </Card>
        <Card className="border-slate-200">
          <div className="p-4">
            <p className="text-sm text-slate-600">Assignments to review</p>
            <p className="text-2xl font-semibold text-slate-900">
              {assignments.data?.length ?? 0}
            </p>
          </div>
        </Card>
        <Card className="border-slate-200">
          <div className="p-4">
            <p className="text-sm text-slate-600">Upcoming events</p>
            <p className="text-2xl font-semibold text-slate-900">
              {events.data?.length ?? 0}
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 border-slate-200 bg-white">
          <div className="p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase text-slate-500">
                  Today at a glance
                </p>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Your schedule and actions are available in
                  Courses/Assignments.
                </h2>
                <p className="text-slate-600 mt-1">
                  Use the course and assignment pages to manage classes.
                </p>
              </div>
              <Badge className="bg-blue-50 text-blue-800 border border-blue-100">
                Calm mode
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="border-slate-200 bg-white">
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-semibold text-slate-900">
                Pending tasks
              </h3>
            </div>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div
                  key={task}
                  className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
                >
                  <div className="mt-1 h-3 w-3 rounded-full bg-blue-600" />
                  <p className="text-base text-slate-800">{task}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 border-slate-200 bg-white">
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-semibold text-slate-900">
                Class overview (Year → Stream → Course)
              </h3>
            </div>
            {Object.keys(groupedByYear).length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center">
                <p className="text-slate-700 font-medium">
                  We&apos;ll load your classes automatically.
                </p>
                <p className="text-sm text-slate-600">No setup needed.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(groupedByYear).map(([year, list]) => (
                  <div
                    key={year}
                    className="rounded-lg border border-slate-100"
                  >
                    <div className="flex items-center px-4 py-3 bg-slate-50 border-b border-slate-100">
                      <Users className="h-4 w-4 text-blue-700 mr-2" />
                      <div>
                        <p className="text-xs uppercase text-slate-500">Year</p>
                        <h4 className="text-lg font-semibold text-slate-900">
                          {year}
                        </h4>
                      </div>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {list.map((course) => (
                        <div
                          key={course.id}
                          className="flex items-center justify-between px-4 py-3"
                        >
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold text-slate-900">
                              {course.title || "Course"}
                            </p>
                            <p className="text-sm text-slate-600">
                              {course.className || "Stream"}
                            </p>
                          </div>
                          <div className="flex gap-2 text-sm text-slate-600">
                            Manage classes and assignments from their dedicated
                            pages.
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        <Card className="border-slate-200 bg-white">
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-semibold text-slate-900">
                Student progress snapshot
              </h3>
            </div>
            <div className="space-y-3">
              {studentSupport.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
                >
                  <div className="text-sm text-slate-700">{item.label}</div>
                  <div className={`font-semibold ${item.tone}`}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
              <p className="text-sm text-slate-700">
                “Focus on Year 1C today — 3 students missed last class.”
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="border-slate-200 bg-white">
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-semibold text-slate-900">
                AI teaching assistant
              </h3>
            </div>
            <p className="text-slate-600">
              Suggestions to speed up your work. You stay in control.
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "Summarize lesson performance",
                "Identify students who may need help",
                "Generate quiz from uploaded lesson",
                "Draft feedback comments",
              ].map((item) => (
                <Button
                  key={item}
                  variant="outline"
                  className="justify-start text-left text-base"
                >
                  <Sparkles className="h-4 w-4 mr-2 text-blue-700" />
                  {item}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        <Card className="border-slate-200 bg-white">
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-700" />
              <h3 className="text-lg font-semibold text-slate-900">
                Recent student activity
              </h3>
            </div>
            <div className="space-y-3">
              {[
                "12 submissions received – Year 2B",
                "2 absences marked – Year 1C",
                "Quiz scores posted – Year 3A",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-slate-800"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
