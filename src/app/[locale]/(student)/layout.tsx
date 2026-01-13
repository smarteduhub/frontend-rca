import DashboardLayout from "@/components/DashboardLayout";
import { ReactNode } from "react";

const StudentLayout = ({ children }: { children: ReactNode }) => {
   return <DashboardLayout role="student">{children}</DashboardLayout>;
};

export default StudentLayout;
