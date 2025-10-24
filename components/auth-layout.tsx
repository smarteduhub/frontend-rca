"use client"

import { useI18n } from "@/lib/i18n-context"
import { LanguageSelector } from "@/components/language-selector"
import { BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type React from "react"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  roleColor: string
}

export function AuthLayout({ children, title, subtitle, roleColor }: AuthLayoutProps) {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
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
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          {/* Back Button */}
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/role-selection">
              <ArrowLeft className="h-4 w-4" />
              {t("common.back")}
            </Link>
          </Button>

          {/* Title */}
          <div className="text-center space-y-2">
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${roleColor}`}>{title}</div>
            <h2 className="text-2xl md:text-3xl font-bold">{subtitle}</h2>
          </div>

          {/* Auth Form */}
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Rwanda Coding Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
