
import DashboardLayout from "@/components/DashboardLayout";
import { ReactNode } from "react";

const ParentLayout = ({ children }: { children: ReactNode }) => {
   return <DashboardLayout role="parent">{children}</DashboardLayout>;
};

export default ParentLayout;
