"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useChildren, useChildDetails } from "@/hooks/useParent";
import { useParentOverview } from "@/hooks/usePersonalized";
import { useAuthStore } from "@/store/useAuthStore";

const ParentHome = () => {
  const { data: children } = useChildren();
  const firstChild = children?.[0];
  const { data: childDetails } = useChildDetails(firstChild?.id || "");
  const { children: parentChildren, events } = useParentOverview();
  const { user } = useAuthStore();

  const childName = firstChild?.name || "Your child";
  const yearStream =
    childDetails?.year && childDetails?.stream
      ? `${childDetails.year} ${childDetails.stream}`
      : childDetails?.year || childDetails?.stream || "Year info loading";

  const attendancePercent =
    childDetails?.attendance?.percentage ??
    childDetails?.attendancePercentage ??
    null;

  const courses =
    (childDetails?.courses as Array<{
      id?: string;
      title?: string;
      status?: string;
    }>) || [];

  const upcoming = childDetails?.upcoming || [
    { title: "Today’s classes load automatically", when: "Today" },
  ];

  const messages = childDetails?.messages || [
    { title: "No new messages", from: "School", detail: "" },
  ];

  const upcomingEvents = events.data || [];

  const overallStatus =
    childDetails?.overallStatus ||
    (attendancePercent && attendancePercent >= 90
      ? "On track"
      : attendancePercent && attendancePercent < 75
      ? "Needs attention"
      : "Good progress");

  const overallNote =
    childDetails?.overallNote ||
    "You are viewing your child’s academic information. Nothing you do here will change their records.";

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold text-slate-900">
          Welcome {user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="text-slate-600">
          A calm view of your children’s progress and schedule.
        </p>
      </div>
      {/* Child overview */}
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-slate-900">
            {childName}
          </CardTitle>
          <p className="text-lg text-slate-700">{yearStream}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-md bg-slate-50 border border-slate-100 p-3">
            <p className="text-base font-semibold text-slate-900">
              Status: {overallStatus}
            </p>
            <p className="text-slate-700 text-base">{overallNote}</p>
          </div>
          <p className="text-sm text-slate-600">
            You cannot change grades or records here. This is a safe, read-only
            view.
          </p>
        </CardContent>
      </Card>

      {/* Attendance summary */}
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900">Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-base text-slate-800">
          {attendancePercent !== null ? (
            <>
              <p>
                Attendance: {attendancePercent}% this month. Your child attended{" "}
                {childDetails?.attendance?.attended ??
                  childDetails?.attendanceCount ??
                  "—"}{" "}
                out of{" "}
                {childDetails?.attendance?.total ??
                  childDetails?.totalClasses ??
                  "—"}{" "}
                classes.
              </p>
              <p className="text-slate-700">
                If attendance drops below expectations, we will notify you.
              </p>
            </>
          ) : (
            <p>Attendance data will appear here. No action needed.</p>
          )}
        </CardContent>
      </Card>

      {/* Academic progress simplified */}
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900">
            Academic progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {courses.length === 0 ? (
            <p className="text-base text-slate-700">
              Subjects will appear here. You will see a simple status like
              “Good” or “Needs support.”
            </p>
          ) : (
            courses.map((course) => {
              const status = (course as any).status || "Good";
              const color =
                status.toLowerCase() === "needs support"
                  ? "text-red-700"
                  : status.toLowerCase().includes("improv")
                  ? "text-amber-700"
                  : "text-green-700";
              return (
                <div
                  key={course.id || course.title}
                  className="flex items-center justify-between rounded-md border border-slate-100 px-3 py-2"
                >
                  <div className="text-base text-slate-900">
                    {course.title || "Subject"}
                  </div>
                  <div className={`text-base font-semibold ${color}`}>
                    {status}
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Upcoming schedule */}
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900">
            Upcoming schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-base text-slate-800">
          {(upcomingEvents.length ? upcomingEvents : upcoming).map(
            (item: any, idx: number) => (
              <div
                key={item.title || idx}
                className="rounded-md border border-slate-100 px-3 py-2"
              >
                <p className="font-semibold text-slate-900">
                  {item.title || "Class details loading"}
                </p>
                <p className="text-slate-700">
                  {item.when ||
                    (item.start_time
                      ? new Date(item.start_time).toLocaleString()
                      : "Date/time to follow")}
                </p>
              </div>
            )
          )}
        </CardContent>
      </Card>

      {/* Teacher messages & announcements */}
      <Card className="border-slate-200 bg-white">
        <CardHeader>
          <CardTitle className="text-xl text-slate-900">
            Messages & announcements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-base text-slate-800">
          {messages.map((msg: any, idx: number) => (
            <div
              key={msg.title || idx}
              className="rounded-md border border-slate-100 px-3 py-2"
            >
              <p className="font-semibold text-slate-900">
                {msg.title || "Message"}
              </p>
              <p className="text-slate-700">
                {msg.from ? `From: ${msg.from}` : "From school"}
              </p>
              {msg.detail && (
                <p className="text-slate-700 mt-1">{msg.detail}</p>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentHome;
