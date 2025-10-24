"use client";

import { useI18n } from "@/lib/i18n-context";
import { LanguageSelector } from "@/components/language-selector";
import { Button } from "@/components/ui/button";
import { BookOpen, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: string;
  roleColor: string;
  navigation: Array<{
    name: string;
    href: string;
    icon: React.ReactNode;
  }>;
}

export function DashboardLayout({
  children,
  role,
  roleColor,
  navigation,
}: DashboardLayoutProps) {
  const { t } = useI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logging out...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="flex flex-col gap-2 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {t("landing.title")}
                </h1>
                <p className="text-xs text-muted-foreground">
                  Rwanda Coding Academy
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`hidden md:inline-block px-3 py-1 rounded-full text-sm font-medium ${roleColor}`}
            >
              {role}
            </div>
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 border-r bg-card/30 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

/*
  DashboardLayout

  Purpose:
  - Shared layout for any user dashboard (admin, teacher, student, parent).
  - Renders a top header and a responsive sidebar. The sidebar receives a
    `navigation` array and renders links for desktop and a sheet for mobile.

  Props (DashboardLayoutProps):
  - children: React.ReactNode - the page content to render in the main area.
  - role: string - a short label for the current user's role (e.g. "Student").
  - roleColor: string - tailwind utility classes to style role pill (background + text color).
  - navigation: Array<{ name: string; href: string; icon: React.ReactNode }> - items rendered in the sidebar.

  Notes / TODOs for contributors:
  - Add active-route highlighting: use Next's `usePathname()` to compare
    current path with each navigation href and apply an "active" style.
  - Implement proper logout logic in `handleLogout`: currently logs to console.
  - Role-based navigation: if some nav items should be hidden for certain roles,
    filter `navigation` before rendering, or move that logic into the page-level code.
  - Accessibility: the mobile Sheet already provides a nice mobile experience,
    but ensure focus management and aria attributes are adequate when integrating auth.

  Example navigation item shape:
    { name: "Assignments", href: "/dashboard/student/assignments", icon: <FileText/> }
*/
