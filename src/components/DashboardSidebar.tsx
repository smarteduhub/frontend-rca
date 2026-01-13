"use client";
import Image from "next/image";
import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/images/logo.svg";
import {
   Bell,
   Book,
   Calendar,
   House,
   LogOut,
   MessageSquare,
   Settings,
   User,
   Users,
   Briefcase,
   NotebookText,
   ClipboardList,
   GraduationCap,
   HelpCircle,
   Sparkles,
   FileText,
   CheckCircle2,
   HeartHandshake,
   BarChart3,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useLogoutUser } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";

interface SidebarProps {
   role: "admin" | "student" | "parent" | "teacher";
}

const DashboardSidebar = ({ role }: SidebarProps) => {
   const t = useTranslations("dashboard");
   const { user } = useAuthStore();
   const pathname = usePathname();
   const logout = useLogoutUser();

   const handleLogout = async () => {
      try {
         await logout.mutateAsync();
      } catch (error) {
         console.error("Logout failed:", error);
      }
   };

   // Add this helper function
   const isActiveLink = (link: string) => {
      // For home routes like /student, /admin, etc, require exact match
      if (link === `/${role}`) {
         return pathname.replace(/^\/[a-z]{2}/, '') === link;
      }
      // For other routes, use includes
      return pathname.includes(link);
   };

   const teacherNav = useMemo(
      () => [
         {
            heading: "Teaching",
            items: [
               { icon: <House />, label: "Dashboard", link: "/teacher" },
               { icon: <Briefcase />, label: "Courses", link: "/teacher/courses" },
               { icon: <NotebookText />, label: "Assignments", link: "/teacher/assignments" },
               { icon: <Users />, label: "Students", link: "/teacher/students" },
               { icon: <ClipboardList />, label: "Attendance", link: "/teacher/attendance" },
               { icon: <GraduationCap />, label: "Grades", link: "/teacher/grades" },
            ],
         },
         {
            heading: "Planning & Communication",
            items: [
               { icon: <Calendar />, label: "Schedule", link: "/teacher/schedule" },
               { icon: <MessageSquare />, label: "Messages", link: "/teacher/messages" },
               { icon: <Bell />, label: "Announcements", link: "/teacher/announcements" },
               { icon: <Sparkles />, label: "AI Assistant", link: "/teacher/ai-assistant" },
            ],
         },
         {
            heading: "Account",
            items: [
               { icon: <User />, label: "Profile", link: "/teacher/profile" },
               { icon: <Settings />, label: "Settings", link: "/teacher/settings" },
               { icon: <HelpCircle />, label: "Help", link: "/teacher/help" },
            ],
         },
      ],
      []
   );

   const studentNav = useMemo(
      () => [
         {
            heading: "Learning",
            items: [
               { icon: <House />, label: "Dashboard", link: "/student" },
               { icon: <Book />, label: "My Courses", link: "/student/enrolled-courses" },
               { icon: <NotebookText />, label: "Assignments", link: "/student/assignments" },
               { icon: <GraduationCap />, label: "Grades", link: "/student/grades" },
               { icon: <FileText />, label: "Reports", link: "/student/reports" },
               { icon: <Calendar />, label: "Timetable", link: "/student/timetable" },
            ],
         },
         {
            heading: "Engagement",
            items: [
               { icon: <MessageSquare />, label: "Messages", link: "/student/chat" },
               { icon: <Sparkles />, label: "AI Study Assistant", link: "/student/ai-chat" },
               { icon: <Bell />, label: "Announcements", link: "/student/announcements" },
               { icon: <GraduationCap />, label: "Gamified Learning", link: "/student/gamified-learning" },
            ],
         },
         {
            heading: "Account",
            items: [
               { icon: <User />, label: "Profile", link: "/student/profile" },
               { icon: <Settings />, label: "Settings", link: "/student/settings" },
               { icon: <HelpCircle />, label: "Help", link: "/student/help" },
            ],
         },
      ],
      []
   );

   const parentNav = useMemo(
      () => [
         {
            heading: "Overview",
            items: [
               { icon: <House />, label: "Dashboard", link: "/parent" },
               { icon: <Users />, label: "Children", link: "/parent/child" },
               { icon: <BarChart3 />, label: "Performance", link: "/parent/performance" },
            ],
         },
         {
            heading: "Communication",
            items: [
               { icon: <MessageSquare />, label: "Messages", link: "/parent/messages" },
               { icon: <Bell />, label: "Announcements", link: "/parent/announcements" },
            ],
         },
         {
            heading: "Account",
            items: [
               { icon: <User />, label: "Profile", link: "/parent/profile" },
               { icon: <Settings />, label: "Settings", link: "/parent/settings" },
               { icon: <HelpCircle />, label: "Help", link: "/parent/help" },
            ],
         },
      ],
      []
   );

   const renderNav = (nav: typeof teacherNav) => (
      <div className="space-y-8">
         {nav.map((section) => (
            <div key={section.heading} className="space-y-2">
               <p className="text-xs uppercase tracking-wide text-slate-400 px-2">
                  {section.heading}
               </p>
               <div className="flex flex-col gap-1">
                  {section.items.map(({ icon, label, link }) => (
                  <Link
                     key={label}
                        href={link}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                        isActiveLink(link)
                              ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                              : "text-slate-600 hover:bg-slate-50"
                     }`}
                  >
                        <span className="text-slate-500">{icon}</span>
                        <span>{label}</span>
                  </Link>
               ))}
               </div>
            </div>
         ))}
      </div>
   );

   const navToRender =
      role === "teacher"
         ? teacherNav
         : role === "student"
         ? studentNav
         : role === "parent"
         ? parentNav
         : null;

   const roleLabel =
      role === "teacher"
         ? "Teacher Dashboard"
         : role === "student"
         ? "Student Dashboard"
         : "Dashboard";

   return (
      <aside className="hidden md:flex w-[260px] flex-shrink-0 flex-col min-h-screen border-r border-slate-200 bg-white px-4 py-6 shadow-sm">
         <div className="flex items-center gap-3 mb-8 px-1">
            <Image src={logo} alt="smarteduhub" width={32} height={32} />
            <div className="flex flex-col">
               <span className="text-base font-semibold text-slate-900">
                  Smart EduHub
               </span>
               <span className="text-xs text-slate-500">{roleLabel}</span>
            </div>
         </div>

         {navToRender ? (
            renderNav(navToRender)
         ) : (
            <div className="space-y-2 text-sm text-slate-500">
               <p>Sidebar not configured for this role.</p>
            </div>
         )}

         <div className="mt-auto pt-8 space-y-4">
            <div className="h-px bg-slate-200" />
            <div className="flex items-center gap-3 px-1">
               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <User className="h-5 w-5" />
               </div>
                  <div className="text-xs">
                  <p className="font-semibold text-slate-900 line-clamp-1">
                     {user?.name || "Teacher"}
                  </p>
                  <p className="text-slate-500 line-clamp-1">
                     {user?.email || "teacher@school.edu"}
                  </p>
                  </div>
            </div>
            <button
               className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
               onClick={handleLogout}
            >
               <div className="flex items-center gap-2">
               <LogOut className="h-4 w-4" />
                  <span>Log out</span>
               </div>
               <span className="text-xs text-slate-400">↩</span>
            </button>
         </div>
      </aside>
   );
};

export default DashboardSidebar;