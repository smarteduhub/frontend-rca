"use client";

import DashboardNavbar from "@/components/DashboardNavbar";
import React from "react";
import Link from "next/link";
import { Users, BookOpen, Calendar, ClipboardList, Bell } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useFetchUsers } from "@/hooks/useUsers";

const StatCard = ({
   title,
   value,
   helper,
}: {
   title: string;
   value: string;
   helper?: string;
}) => (
   <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
      <p className="text-sm text-slate-600">{title}</p>
      <p className="text-2xl font-semibold text-slate-900 mt-1">{value}</p>
      {helper && <p className="text-xs text-slate-500 mt-1">{helper}</p>}
   </div>
);

const AdminPage = () => {
   const { user } = useAuthStore();
   const { data: users } = useFetchUsers();

   const totalUsers = users?.length ?? 0;
   const activeUsers = users?.filter((u) => u.is_active)?.length ?? 0;
   const inactiveUsers = totalUsers - activeUsers;

   const activity = [
      { title: "New teacher registered", time: "5m ago" },
      { title: "3 students activated", time: "12m ago" },
      { title: "Assignment posted (Math)", time: "30m ago" },
      { title: "Parent account created", time: "1h ago" },
   ];

   const upcoming = [
      { title: "Parent-Teacher Meeting", when: "Tomorrow • 5:00 PM" },
      { title: "Physics Lab Prep", when: "Thu • 10:00 AM" },
      { title: "Midterm schedule", when: "Fri • 9:00 AM" },
   ];

   return (
      <div className="bg-slate-50 min-h-screen">
         <DashboardNavbar title="Admin Dashboard" />

         <div className="container mx-auto px-4 py-6 space-y-6">
            {/* Header */}
            <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
               <div className="flex flex-col md:flex-row justify-between gap-2 md:items-center">
                  <div>
                     <h1 className="text-2xl font-semibold text-slate-900">
                        Welcome, {user?.name || "Admin"}
                     </h1>
                     <p className="text-slate-600 text-sm">
                        Central hub to manage users, courses, and events.
                     </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                     <Link href="/admin/users">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                           Manage users
                        </button>
                     </Link>
                     <Link href="/admin/courses">
                        <button className="bg-white border px-4 py-2 rounded-md text-sm">
                           Courses & assignments
                        </button>
                     </Link>
                     <Link href="/admin/schedule">
                        <button className="bg-white border px-4 py-2 rounded-md text-sm">
                           Events / schedule
                        </button>
                     </Link>
                  </div>
               </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               <StatCard title="Total users" value={String(totalUsers)} helper="All roles" />
               <StatCard title="Active users" value={String(activeUsers)} helper="Activated" />
               <StatCard title="Inactive users" value={String(inactiveUsers)} helper="Awaiting activation" />
               <StatCard title="Active users today" value="—" helper="Logged in today" />
               <StatCard title="Ongoing courses" value="—" helper="Active courses" />
               <StatCard title="Upcoming events" value="—" helper="This week" />
            </div>

            {/* Main panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
               {/* Users */}
               <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-3 lg:col-span-2">
                  <div className="flex items-center justify-between">
                     <h2 className="text-lg font-semibold text-slate-900">
                        Users
                     </h2>
                     <div className="flex gap-2">
                        <Link href="/admin/users">
                           <button className="text-sm text-blue-600">View all</button>
                        </Link>
                        <Link href="/admin/users">
                           <button className="text-sm text-slate-700">Add user</button>
                        </Link>
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                     <div className="flex items-center gap-2 text-slate-700">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span>Students</span>
                     </div>
                     <div className="flex items-center gap-2 text-slate-700">
                        <Users className="h-4 w-4 text-emerald-600" />
                        <span>Teachers</span>
                     </div>
                     <div className="flex items-center gap-2 text-slate-700">
                        <Users className="h-4 w-4 text-amber-600" />
                        <span>Parents</span>
                     </div>
                  </div>
                  <p className="text-sm text-slate-600">
                     Activate, deactivate, or edit accounts from the Users page.
                  </p>
               </div>

               {/* Activity feed */}
               <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                     <h2 className="text-lg font-semibold text-slate-900">
                        Activity
                     </h2>
                     <Bell className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="space-y-2">
                     {activity.map((item) => (
                        <div
                           key={item.title}
                           className="border border-slate-100 rounded-md px-3 py-2"
                        >
                           <p className="text-sm text-slate-900">{item.title}</p>
                           <p className="text-xs text-slate-500">{item.time}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Courses & Assignments, Events */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                     <h2 className="text-lg font-semibold text-slate-900">
                        Courses & assignments
                     </h2>
                     <Link href="/admin/courses" className="text-sm text-blue-600">
                        Open
                     </Link>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                     <BookOpen className="h-4 w-4 text-indigo-600" />
                     <span>View all courses, assign teachers, check enrollments.</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                     <ClipboardList className="h-4 w-4 text-purple-600" />
                     <span>Review assignments posted by teachers.</span>
                  </div>
               </div>

               <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                     <h2 className="text-lg font-semibold text-slate-900">
                        Events / schedule
                     </h2>
                     <Link href="/admin/schedule" className="text-sm text-blue-600">
                        Open
                     </Link>
                  </div>
                  <div className="space-y-2">
                     {upcoming.map((item) => (
                        <div
                           key={item.title}
                           className="border border-slate-100 rounded-md px-3 py-2"
                        >
                           <p className="text-sm text-slate-900">{item.title}</p>
                           <p className="text-xs text-slate-500">{item.when}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdminPage;