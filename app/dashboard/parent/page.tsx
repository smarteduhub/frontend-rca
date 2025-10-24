"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  UserCog,
  Calendar,
  FileText,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  ChevronRight,
  User,
} from "lucide-react"
import { useI18n } from "@/lib/i18n-context"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function ParentDashboardPage() {
  const { t } = useI18n()

  const navigation = [
    { name: "Dashboard", href: "/dashboard/parent", icon: <UserCog className="h-5 w-5" /> },
    { name: "Children", href: "/dashboard/parent/children", icon: <User className="h-5 w-5" /> },
    { name: "Grades", href: "/dashboard/parent/grades", icon: <Award className="h-5 w-5" /> },
    { name: "Attendance", href: "/dashboard/parent/attendance", icon: <Calendar className="h-5 w-5" /> },
    { name: "Messages", href: "/dashboard/parent/messages", icon: <MessageSquare className="h-5 w-5" /> },
  ]

  const children = [
    {
      id: 1,
      name: "John Doe",
      grade: "Year 2",
      avatar: "JD",
      overallGrade: 85,
      attendance: 95,
      status: "good",
    },
    {
      id: 2,
      name: "Jane Doe",
      grade: "Year 1",
      avatar: "JD",
      overallGrade: 92,
      attendance: 98,
      status: "excellent",
    },
  ]

  const recentGrades = [
    { id: 1, student: "John Doe", subject: "Web Development", grade: 88, date: "2 days ago", trend: "up" },
    { id: 2, student: "Jane Doe", subject: "Data Structures", grade: 95, date: "3 days ago", trend: "up" },
    { id: 3, student: "John Doe", subject: "Database Systems", grade: 82, date: "1 week ago", trend: "down" },
  ]

  const upcomingEvents = [
    { id: 1, title: "Parent-Teacher Meeting", date: "Tomorrow, 3:00 PM", type: "meeting" },
    { id: 2, title: "John's Midterm Exam", date: "Friday, 9:00 AM", type: "exam" },
    { id: 3, title: "Jane's Project Presentation", date: "Next Monday, 2:00 PM", type: "presentation" },
  ]

  const teacherMessages = [
    {
      id: 1,
      teacher: "Prof. Smith",
      subject: "John's Progress Update",
      preview: "John has shown great improvement in...",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 2,
      teacher: "Prof. Johnson",
      subject: "Jane's Outstanding Performance",
      preview: "I wanted to commend Jane for her...",
      time: "1 day ago",
      unread: false,
    },
  ]

  return (
    <DashboardLayout role={t("role.parent")} roleColor="bg-purple-500/10 text-purple-600" navigation={navigation}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold text-balance mb-2">Welcome back, Parent!</h2>
          <p className="text-muted-foreground">Monitor your children's academic progress and stay connected.</p>
        </div>

        {/* Children Overview Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {children.map((child) => (
            <Card key={child.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-purple-500/10 text-purple-600 text-lg font-semibold">
                      {child.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{child.name}</CardTitle>
                    <CardDescription>{child.grade}</CardDescription>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      child.status === "excellent"
                        ? "bg-green-500/10 text-green-600"
                        : child.status === "good"
                          ? "bg-blue-500/10 text-blue-600"
                          : "bg-yellow-500/10 text-yellow-600"
                    }`}
                  >
                    {child.status === "excellent" ? "Excellent" : child.status === "good" ? "Good" : "Needs Attention"}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Overall Grade</span>
                    <span className="font-medium">{child.overallGrade}%</span>
                  </div>
                  <Progress value={child.overallGrade} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Attendance</span>
                    <span className="font-medium">{child.attendance}%</span>
                  </div>
                  <Progress value={child.attendance} className="h-2" />
                </div>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  View Full Report
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">88.5%</div>
              <p className="text-xs text-muted-foreground">+4% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96.5%</div>
              <p className="text-xs text-muted-foreground">Excellent attendance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Across both children</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">From teachers</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Grades */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Grades</CardTitle>
              <CardDescription>Latest academic performance updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentGrades.map((grade) => (
                <div
                  key={grade.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center font-bold ${
                        grade.grade >= 90
                          ? "bg-green-500/10 text-green-600"
                          : grade.grade >= 80
                            ? "bg-blue-500/10 text-blue-600"
                            : "bg-yellow-500/10 text-yellow-600"
                      }`}
                    >
                      {grade.grade}
                    </div>
                    <div>
                      <p className="font-medium">{grade.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {grade.student} • {grade.date}
                      </p>
                    </div>
                  </div>
                  {grade.trend === "up" ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                View All Grades
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Important dates and meetings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <Calendar className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <div
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      event.type === "meeting"
                        ? "bg-blue-500/10 text-blue-600"
                        : event.type === "exam"
                          ? "bg-orange-500/10 text-orange-600"
                          : "bg-green-500/10 text-green-600"
                    }`}
                  >
                    {event.type}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2 bg-transparent">
                View Calendar
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Teacher Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Messages from Teachers
            </CardTitle>
            <CardDescription>Stay connected with your children's educators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {teacherMessages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start justify-between p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer ${
                  message.unread ? "bg-purple-500/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.unread && <div className="h-2 w-2 rounded-full bg-purple-600 mt-2" />}
                  <div>
                    <p className="font-medium">{message.subject}</p>
                    <p className="text-sm text-muted-foreground">
                      {message.teacher} • {message.preview}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{message.time}</span>
              </div>
            ))}
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              View All Messages
              <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
