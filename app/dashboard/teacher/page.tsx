"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  Calendar,
  FileText,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Plus,
} from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export default function TeacherDashboardPage() {
  const { t } = useI18n()

  const navigation = [
    { name: "Dashboard", href: "/dashboard/teacher", icon: <Users className="h-5 w-5" /> },
    { name: "My Classes", href: "/dashboard/teacher/classes", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Assignments", href: "/dashboard/teacher/assignments", icon: <FileText className="h-5 w-5" /> },
    { name: "Schedule", href: "/dashboard/teacher/schedule", icon: <Calendar className="h-5 w-5" /> },
    { name: "Students", href: "/dashboard/teacher/students", icon: <Users className="h-5 w-5" /> },
  ]

  const classes = [
    {
      id: 1,
      name: "Web Development 101",
      students: 45,
      nextSession: "Today, 9:00 AM",
      color: "bg-blue-500",
      attendance: 92,
    },
    {
      id: 2,
      name: "Advanced JavaScript",
      students: 38,
      nextSession: "Tomorrow, 2:00 PM",
      color: "bg-green-500",
      attendance: 88,
    },
    {
      id: 3,
      name: "React Fundamentals",
      students: 42,
      nextSession: "Friday, 10:00 AM",
      color: "bg-purple-500",
      attendance: 95,
    },
  ]

  const pendingGrading = [
    { id: 1, title: "React Project Submission", class: "Web Development 101", submissions: 42, total: 45 },
    { id: 2, title: "JavaScript Quiz", class: "Advanced JavaScript", submissions: 35, total: 38 },
    { id: 3, title: "Component Design", class: "React Fundamentals", submissions: 40, total: 42 },
  ]

  const recentActivity = [
    { id: 1, student: "John Doe", action: "Submitted assignment", class: "Web Development 101", time: "10 min ago" },
    { id: 2, student: "Jane Smith", action: "Asked a question", class: "Advanced JavaScript", time: "1 hour ago" },
    { id: 3, student: "Mike Johnson", action: "Completed quiz", class: "React Fundamentals", time: "2 hours ago" },
  ]

  return (
    <DashboardLayout role={t("role.teacher")} roleColor="bg-green-500/10 text-green-600" navigation={navigation}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-balance mb-2">Welcome back, Teacher!</h2>
            <p className="text-muted-foreground">Manage your classes and track student progress.</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Assignment
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">125</div>
              <p className="text-xs text-muted-foreground">Across 3 classes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Grading</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">117</div>
              <p className="text-xs text-muted-foreground">Submissions to review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92%</div>
              <p className="text-xs text-muted-foreground">+3% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teaching Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18h</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* My Classes */}
          <Card>
            <CardHeader>
              <CardTitle>My Classes</CardTitle>
              <CardDescription>Overview of your current classes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {classes.map((classItem) => (
                <div key={classItem.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg ${classItem.color} flex items-center justify-center`}>
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{classItem.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {classItem.students} students • {classItem.nextSession}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">{classItem.attendance}%</span>
                  </div>
                  <Progress value={classItem.attendance} className="h-2" />
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                View All Classes
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Pending Grading */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Grading</CardTitle>
              <CardDescription>Assignments waiting for review</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingGrading.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-start justify-between p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">{assignment.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {assignment.submissions}/{assignment.total}
                    </p>
                    <p className="text-xs text-muted-foreground">submitted</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                View All Submissions
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest student interactions and submissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <div>
                  <p className="font-medium">
                    {activity.student} <span className="text-muted-foreground font-normal">{activity.action}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{activity.class}</p>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
