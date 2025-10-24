"use client"

import type React from "react"

import { useState } from "react"
import { useI18n } from "@/lib/i18n-context"
import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { UserCog } from "lucide-react"

export default function ParentSignupPage() {
  const { t } = useI18n()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [inviteToken, setInviteToken] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement registration logic
    console.log("Parent signup:", { fullName, email, password, inviteToken })
  }

  return (
    <AuthLayout title={t("role.parent")} subtitle={t("auth.signup")} roleColor="bg-purple-500/10 text-purple-600">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <UserCog className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">{t("auth.signup")}</CardTitle>
          <CardDescription className="text-center">Create your parent account with an invite token</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t("auth.fullName")}</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Mary Johnson"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="parent@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inviteToken">{t("auth.inviteToken")}</Label>
              <Input
                id="inviteToken"
                type="text"
                placeholder="PARENT-XXXX-XXXX"
                value={inviteToken}
                onChange={(e) => setInviteToken(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full">
              {t("auth.signup")}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              {t("auth.hasAccount")}{" "}
              <Link href="/auth/parent/login" className="text-primary hover:underline font-medium">
                {t("auth.login")}
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </AuthLayout>
  )
}
