"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Users,
  BookOpen,
  Settings,
  BarChart3,
  UserPlus,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ChevronRight,
  Activity,
} from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export default function AdminDashboardPage() {
  const { t } = useI18n()

  const navigation = [
    { name: "Dashboard", href: "/dashboard/admin", icon: <Shield className="h-5 w-5" /> },
    { name: "Users", href: "/dashboard/admin/users", icon: <Users className="h-5 w-5" /> },
    { name: "Courses", href: "/dashboard/admin/courses", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="h-5 w-5" /> },
    { name: "Settings", href: "/dashboard/admin/settings", icon: <Settings className="h-5 w-5" /> },
  ]

  const systemStats = [
    { label: "Total Users", value: 1248, change: "+12%", icon: Users, color: "text-blue-600" },
    { label: "Active Courses", value: 45, change: "+3", icon: BookOpen, color: "text-green-600" },
    { label: "System Uptime", value: "99.9%", change: "Excellent", icon: Activity, color: "text-purple-600" },
    { label: "Pending Approvals", value: 8, change: "Review", icon: Clock, color: "text-orange-600" },
  ]

  const userBreakdown = [
    { role: "Students", count: 856, percentage: 68.6, color: "bg-blue-500" },
    { role: "Teachers", count: 124, percentage: 9.9, color: "bg-green-500" },
    { role: "Parents", count: 245, percentage: 19.6, color: "bg-purple-500" },
    { role: "Admins", count: 23, percentage: 1.9, color: "bg-orange-500" },
  ]

  const recentActivities = [
    {
      id: 1,
      action: "New teacher registered",
      user: "Prof. Sarah Johnson",
      time: "5 minutes ago",
      type: "user",
      status: "pending",
    },
    {
      id: 2,
      action: "Course created",
      user: "Prof. Mike Chen",
      time: "1 hour ago",
      type: "course",
      status: "completed",
    },
    {
      id: 3,
      action: "System backup completed",
      user: "System",
      time: "2 hours ago",
      type: "system",
      status: "completed",
    },
    {
      id: 4,
      action: "Parent account approval",
      user: "Mary Williams",
      time: "3 hours ago",
      type: "user",
      status: "pending",
    },
  ]

  const systemAlerts = [
    {
      id: 1,
      title: "Server maintenance scheduled",
      description: "Scheduled for Sunday, 2:00 AM - 4:00 AM",
      severity: "info",
    },
    {
      id: 2,
      title: "8 pending user approvals",
      description: "Review and approve new registrations",
      severity: "warning",
    },
    {
      id: 3,
      title: "Database backup successful",
      description: "Last backup: 2 hours ago",
      severity: "success",
    },
  ]

  const quickActions = [
    { label: "Add User", icon: UserPlus, href: "/dashboard/admin/users/new", color: "bg-blue-500" },
    { label: "Create Course", icon: BookOpen, href: "/dashboard/admin/courses/new", color: "bg-green-500" },
    { label: "View Reports", icon: BarChart3, href: "/dashboard/admin/analytics", color: "bg-purple-500" },
    { label: "System Settings", icon: Settings, href: "/dashboard/admin/settings", color: "bg-orange-500" },
  ]

  return (
    <DashboardLayout role={t("role.admin")} roleColor="bg-orange-500/10 text-orange-600" navigation={navigation}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-balance mb-2">System Administration</h2>
            <p className="text-muted-foreground">Manage users, courses, and system settings.</p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add New User
          </Button>
        </div>

        {/* System Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {systemStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-accent bg-transparent"
                  asChild
                >
                  <a href={action.href}>
                    <div className={`h-12 w-12 rounded-lg ${action.color} flex items-center justify-center`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* User Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Breakdown by role type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {userBreakdown.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${item.color}`} />
                      <span className="font-medium">{item.role}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{item.count}</span>
                      <span className="text-sm text-muted-foreground ml-2">({item.percentage}%)</span>
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                Manage Users
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* System Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Important notifications and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    alert.severity === "warning"
                      ? "bg-yellow-500/5 border-yellow-500/20"
                      : alert.severity === "success"
                        ? "bg-green-500/5 border-green-500/20"
                        : "bg-blue-500/5 border-blue-500/20"
                  }`}
                >
                  {alert.severity === "warning" ? (
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  ) : alert.severity === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{alert.title}</p>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest system events and user actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      activity.type === "user"
                        ? "bg-blue-500/10"
                        : activity.type === "course"
                          ? "bg-green-500/10"
                          : "bg-purple-500/10"
                    }`}
                  >
                    {activity.type === "user" ? (
                      <Users className="h-5 w-5 text-blue-600" />
                    ) : activity.type === "course" ? (
                      <BookOpen className="h-5 w-5 text-green-600" />
                    ) : (
                      <Settings className="h-5 w-5 text-purple-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    activity.status === "pending"
                      ? "bg-yellow-500/10 text-yellow-600"
                      : "bg-green-500/10 text-green-600"
                  }`}
                >
                  {activity.status}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              View All Activities
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
