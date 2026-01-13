"use client";

import React from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useNotificationsWebSocket } from "@/hooks/useNotificationsWebSocket";

type Role = "admin" | "student" | "parent" | "teacher";

interface DashboardLayoutProps {
   children: React.ReactNode;
   role: Role;
}

export default function DashboardLayout({
   children,
   role,
}: DashboardLayoutProps) {
   useNotificationsWebSocket();

   return (
      <div className="min-h-screen bg-neutral-50">
         <div className="mx-auto flex w-full max-w-[1600px] gap-4 px-3 py-4 lg:gap-6 lg:px-6">
            <DashboardSidebar role={role} />
            <div className="flex-1">
               <div className="relative h-full rounded-[28px] border border-neutral-200/60 bg-white/90 p-2 shadow-sm backdrop-blur-md">
                  <div className="h-full overflow-y-auto rounded-[22px] bg-white/90 p-4 sm:p-6">
                     {children}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
