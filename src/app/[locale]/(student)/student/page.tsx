"use client";

import React from "react";
import {
  Book,
  Star,
  Pen,
  Users,
  ArrowRight,
  Loader2,
  TrendingUp,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock3,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  useGetEnrolledCourses,
  calculateCourseProgress,
} from "@/hooks/useCourses";
import { useGetStudentAssignments } from "@/hooks/useAssignments";
import { useStudentOverview } from "@/hooks/usePersonalized";
import { useAuthStore } from "@/store/useAuthStore";
import type { Course } from "@/types/course";
import type { Assignment } from "@/types/assignments";

const StudentHome = () => {
  const { user } = useAuthStore();
  const {
    data: enrolledCourses = [],
    isLoading: isLoadingCourses,
    error: coursesError,
  } = useGetEnrolledCourses();
  const {
    data: assignments = [],
    isLoading: isLoadingAssignments,
    error: assignmentsError,
  } = useGetStudentAssignments();
  const { events } = useStudentOverview();

  const allCourses = enrolledCourses.map((course: Course) => ({
    ...course,
    progress: calculateCourseProgress(course) || 0,
  }));

  const completedCourses = allCourses.filter(
    (course) => course.progress >= 100
  ).length;

  const averageProgress =
    allCourses.length > 0
      ? allCourses.reduce((acc, course) => acc + (course.progress || 0), 0) /
        allCourses.length
      : 0;

  const previewCourses = allCourses.slice(0, 4);
  const isLoading = isLoadingCourses || isLoadingAssignments;
  const error = coursesError || assignmentsError;

  const assignmentList: Assignment[] = (assignments as Assignment[]) || [];

  const pendingAssignments = assignmentList.filter((a) => !a.submitted_at);
  const submittedAssignments = assignmentList.filter(
    (a) => a.submitted_at && !(a as any).grade
  );
  const gradedAssignments = assignmentList.filter((a) => (a as any).grade);

  const dueSoon = [...pendingAssignments]
    .sort((a, b) => {
      const dateA = new Date((a as any).due_date || "").getTime();
      const dateB = new Date((b as any).due_date || "").getTime();
      return dateA - dateB;
    })
    .slice(0, 3);

  const StatCard = ({
    title,
    value,
    helper,
    icon,
  }: {
    title: string;
    value: string | number;
    helper?: string;
    icon: React.ReactNode;
  }) => (
    <Card className="h-full border border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">
          {title}
        </CardTitle>
        <div className="text-slate-500">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        {helper && <p className="text-xs text-slate-500 mt-1">{helper}</p>}
      </CardContent>
    </Card>
  );

  const formatDue = (assignment: Assignment) => {
    const due = (assignment as any).due_date
      ? new Date((assignment as any).due_date)
      : null;
    if (!due) return "No due date";
    return due.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold text-slate-900">
          Welcome {user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-slate-600">
          Here’s what matters today. Stay steady and keep moving forward.
        </p>
      </div>
      {/* Daily Focus */}
      <Card className="border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Today’s focus
          </CardTitle>
          <p className="text-sm text-slate-600">
            Quick wins to keep you on track.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {dueSoon.length === 0 ? (
            <div className="text-slate-700">
              No urgent tasks. Use 20 focused minutes to review a course note.
            </div>
          ) : (
            dueSoon.map((a) => (
              <div
                key={a.id || a.title}
                className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2"
              >
                <div>
                  <p className="font-semibold text-slate-900">{a.title}</p>
                  <p className="text-xs text-slate-600">
                    Due {formatDue(a)} • {(a as any).course?.title || "Course"}
                  </p>
                </div>
              </div>
            ))
          )}
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Finish one pending task
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Clock3 className="h-4 w-4" />
              20-min review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Enrolled courses"
          value={allCourses.length}
          helper="Your current load"
          icon={<Book className="w-4 h-4 text-blue-600" />}
        />
        <StatCard
          title="Completed courses"
          value={completedCourses}
          helper="Keep going"
          icon={<Star className="w-4 h-4 text-green-600" />}
        />
        <StatCard
          title="Pending assignments"
          value={pendingAssignments.length}
          helper="Submit on time"
          icon={<Pen className="w-4 h-4 text-purple-600" />}
        />
        <StatCard
          title="On-track progress"
          value={`${Math.round(averageProgress)}%`}
          helper={averageProgress >= 60 ? "On track" : "Needs attention"}
          icon={<Users className="w-4 h-4 text-orange-600" />}
        />
      </section>

      {/* Learning Progress */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-blue-700" />
              Learning progress
            </CardTitle>
            <p className="text-sm text-slate-600">
              Progress bars per course. Aim for steady daily steps.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <div className="flex items-center gap-3 py-4 text-slate-600">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading your courses...
              </div>
            ) : error ? (
              <div className="text-slate-600 py-4">
                Couldn&apos;t load progress. Please refresh.
              </div>
            ) : previewCourses.length === 0 ? (
              <div className="text-slate-600 py-4">
                No courses yet. Enroll to start tracking progress.
              </div>
            ) : (
              previewCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-lg border border-slate-100 p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900 line-clamp-1">
                        {course.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {(course as any).status === "on-track"
                          ? "On track"
                          : course.progress >= 60
                          ? "On track"
                          : "Needs attention"}
                      </p>
                    </div>
                    <span className="text-sm text-slate-600">
                      {Math.round(course.progress || 0)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-700" />
              AI study assistant
            </CardTitle>
            <p className="text-sm text-slate-600">
              Your personal tutor. Tests remain in one official language.
            </p>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-slate-700">
            <p>AI prompts will appear here when enabled.</p>
          </CardContent>
        </Card>
      </section>

      {/* Assignments & Tests */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          { title: "Pending", list: pendingAssignments },
          { title: "Submitted", list: submittedAssignments },
          { title: "Graded", list: gradedAssignments },
        ].map((group) => (
          <Card key={group.title} className="border border-slate-200">
            <CardHeader>
              <CardTitle>{group.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {group.list.length === 0 ? (
                <p className="text-sm text-slate-500">Nothing here yet.</p>
              ) : (
                group.list.map((a) => (
                  <div
                    key={a.id || a.title}
                    className="rounded-md border border-slate-100 p-3 space-y-1"
                  >
                    <p className="font-semibold text-slate-900 line-clamp-1">
                      {a.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(a as any).course?.title || "Course"} • Due{" "}
                      {formatDue(a)}
                    </p>
                    {group.title === "Graded" && (a as any).grade && (
                      <p className="text-xs text-green-700">
                        Grade: {(a as any).grade} •{" "}
                        {(a as any).feedback || "Feedback ready"}
                      </p>
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Gamified learning */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <p className="text-sm text-slate-600">
              Earned privately for your effort.
            </p>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {["Consistency", "Focus", "On-time", "Improvement"].map((b) => (
              <div
                key={b}
                className="rounded-full bg-blue-50 text-blue-800 px-3 py-1 text-sm"
              >
                {b}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle>Streaks</CardTitle>
            <p className="text-sm text-slate-600">
              Keep daily learning gentle and steady.
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-slate-800">
              3-day streak • Great job staying consistent.
            </p>
            <Button size="sm" variant="outline">
              Keep it going
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle>Milestones</CardTitle>
            <p className="text-sm text-slate-600">
              Celebrate progress, not competition.
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-slate-800">Finish 2 assignments this week.</p>
            <p className="text-slate-800">
              Complete 30% of your lowest-progress course.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default StudentHome;
