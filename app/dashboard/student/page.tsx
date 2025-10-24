"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar, FileText, GraduationCap, TrendingUp, Clock, Award, Bell, ChevronRight } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

export default function StudentDashboardPage() {
  const { t } = useI18n()

  const navigation = [
    { name: "Dashboard", href: "/dashboard/student", icon: <GraduationCap className="h-5 w-5" /> },
    { name: "My Courses", href: "/dashboard/student/courses", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Assignments", href: "/dashboard/student/assignments", icon: <FileText className="h-5 w-5" /> },
    { name: "Schedule", href: "/dashboard/student/schedule", icon: <Calendar className="h-5 w-5" /> },
    { name: "Grades", href: "/dashboard/student/grades", icon: <Award className="h-5 w-5" /> },
  ]

  const courses = [
    { id: 1, name: "Web Development", progress: 75, nextClass: "Tomorrow, 9:00 AM", color: "bg-blue-500" },
    { id: 2, name: "Data Structures", progress: 60, nextClass: "Today, 2:00 PM", color: "bg-green-500" },
    { id: 3, name: "Database Systems", progress: 45, nextClass: "Friday, 10:00 AM", color: "bg-purple-500" },
  ]

  const upcomingAssignments = [
    { id: 1, title: "React Project", course: "Web Development", dueDate: "Due in 2 days", priority: "high" },
    { id: 2, title: "Binary Trees Lab", course: "Data Structures", dueDate: "Due in 5 days", priority: "medium" },
    { id: 3, title: "SQL Queries", course: "Database Systems", dueDate: "Due in 1 week", priority: "low" },
  ]

  const recentAnnouncements = [
    { id: 1, title: "Midterm Exam Schedule Released", time: "2 hours ago" },
    { id: 2, title: "New Learning Resources Available", time: "1 day ago" },
    { id: 3, title: "Campus Event: Tech Talk", time: "2 days ago" },
  ]

  return (
    <DashboardLayout role={t("role.student")} roleColor="bg-blue-500/10 text-blue-600" navigation={navigation}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold text-balance mb-2">Welcome back, Student!</h2>
          <p className="text-muted-foreground">Here's what's happening with your courses today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">2 completed this semester</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">3 due this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24h</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Course Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
              <CardDescription>Your current courses and completion status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {courses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg ${course.color} flex items-center justify-center`}>
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">{course.name}</p>
                        <p className="text-sm text-muted-foreground">{course.nextClass}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                View All Courses
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-start justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-2 w-2 rounded-full mt-2 ${
                        assignment.priority === "high"
                          ? "bg-red-500"
                          : assignment.priority === "medium"
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{assignment.dueDate}</span>
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                View All Assignments
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Announcements
            </CardTitle>
            <CardDescription>Stay updated with the latest news</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer"
              >
                <p className="font-medium">{announcement.title}</p>
                <span className="text-sm text-muted-foreground">{announcement.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
