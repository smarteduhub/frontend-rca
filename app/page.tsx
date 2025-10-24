"use client"

import type React from "react"

import { useI18n } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import {
  ArrowRight,
  BookOpen,
  Users,
  Brain,
  Shield,
  Globe,
  GraduationCap,
  BookOpenCheck,
  UserCircle,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t("landing.title")}</h1>
              <p className="text-xs text-muted-foreground">Rwanda Coding Academy</p>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
            {t("landing.subtitle")}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-balance leading-tight">{t("landing.description")}</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            A comprehensive platform connecting students, teachers, parents, and administrators in a seamless
            educational ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="gap-2 text-base">
              <Link href="/role-selection">
                {t("landing.getStarted")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 text-base bg-transparent">
              <Link href="#features">{t("landing.learnMore")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-center">Quick Access (Testing)</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button asChild variant="outline" className="gap-2 justify-start bg-transparent">
                <Link href="/dashboard/student">
                  <GraduationCap className="h-4 w-4" />
                  Student Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2 justify-start bg-transparent">
                <Link href="/dashboard/teacher">
                  <BookOpenCheck className="h-4 w-4" />
                  Teacher Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2 justify-start bg-transparent">
                <Link href="/dashboard/parent">
                  <UserCircle className="h-4 w-4" />
                  Parent Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-2 justify-start bg-transparent">
                <Link href="/dashboard/admin">
                  <Settings className="h-4 w-4" />
                  Admin Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="Multi-Role Access"
            description="Dedicated portals for students, teachers, parents, and administrators"
          />
          <FeatureCard
            icon={<Brain className="h-8 w-8" />}
            title="AI-Powered Learning"
            description="Intelligent recommendations and personalized learning paths"
          />
          <FeatureCard
            icon={<Shield className="h-8 w-8" />}
            title="Secure & Reliable"
            description="Enterprise-grade security with role-based access control"
          />
          <FeatureCard
            icon={<Globe className="h-8 w-8" />}
            title="Multilingual Support"
            description="Available in English, French, and Kinyarwanda"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Rwanda Coding Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card border rounded-lg p-6 space-y-3 hover:shadow-lg transition-shadow">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
