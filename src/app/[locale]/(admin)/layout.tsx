import DashboardLayout from "@/components/DashboardLayout";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
   return <DashboardLayout role="admin">{children}</DashboardLayout>;
};

export default AdminLayout;
