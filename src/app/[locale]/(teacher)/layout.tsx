import DashboardLayout from "@/components/DashboardLayout";
import { ReactNode } from "react";

const TeacherLayout = ({ children }: { children: ReactNode }) => {
   return <DashboardLayout role="teacher">{children}</DashboardLayout>;
};

export default TeacherLayout;
