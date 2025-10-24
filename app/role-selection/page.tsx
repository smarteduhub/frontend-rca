"use client"

import { useI18n } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LanguageSelector } from "@/components/language-selector"
import { BookOpen, GraduationCap, Users, UserCog, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RoleSelectionPage() {
  const { t } = useI18n()

  const roles = [
    {
      id: "student",
      title: t("role.student"),
      description: "Access courses, assignments, and track your learning progress",
      icon: <GraduationCap className="h-12 w-12" />,
      href: "/auth/student/login",
      color: "from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20",
      iconBg: "bg-blue-500/10 text-blue-600",
    },
    {
      id: "teacher",
      title: t("role.teacher"),
      description: "Manage classes, create content, and monitor student performance",
      icon: <Users className="h-12 w-12" />,
      href: "/auth/teacher/login",
      color: "from-green-500/10 to-green-600/10 hover:from-green-500/20 hover:to-green-600/20",
      iconBg: "bg-green-500/10 text-green-600",
    },
    {
      id: "parent",
      title: t("role.parent"),
      description: "Monitor your child's progress and communicate with teachers",
      icon: <UserCog className="h-12 w-12" />,
      href: "/auth/parent/login",
      color: "from-purple-500/10 to-purple-600/10 hover:from-purple-500/20 hover:to-purple-600/20",
      iconBg: "bg-purple-500/10 text-purple-600",
    },
    {
      id: "admin",
      title: t("role.admin"),
      description: "Manage system settings, users, and institutional operations",
      icon: <Shield className="h-12 w-12" />,
      href: "/auth/admin/login",
      color: "from-orange-500/10 to-orange-600/10 hover:from-orange-500/20 hover:to-orange-600/20",
      iconBg: "bg-orange-500/10 text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t("landing.title")}</h1>
              <p className="text-xs text-muted-foreground">Rwanda Coding Academy</p>
            </div>
          </Link>
          <LanguageSelector />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-6 gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              {t("common.back")}
            </Link>
          </Button>

          {/* Title Section */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-balance">{t("role.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">{t("role.subtitle")}</p>
          </div>

          {/* Role Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {roles.map((role) => (
              <Link key={role.id} href={role.href} className="group">
                <Card
                  className={`h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] bg-gradient-to-br ${role.color} border-2 hover:border-primary/50`}
                >
                  <CardHeader className="space-y-4">
                    <div
                      className={`h-20 w-20 rounded-xl ${role.iconBg} flex items-center justify-center transition-transform group-hover:scale-110`}
                    >
                      {role.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl mb-2">{role.title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed">{role.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full gap-2 bg-transparent" variant="outline">
                      {t("common.continue")}
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Rwanda Coding Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
