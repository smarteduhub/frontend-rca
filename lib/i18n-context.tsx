"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "fr" | "rw"

interface Translations {
  [key: string]: {
    en: string
    fr: string
    rw: string
  }
}

const translations: Translations = {
  // Landing Page
  "landing.title": {
    en: "Smart Eduhub RCA",
    fr: "Smart Eduhub RCA",
    rw: "Smart Eduhub RCA",
  },
  "landing.subtitle": {
    en: "Intelligent Learning Management System",
    fr: "Système de Gestion de l'Apprentissage Intelligent",
    rw: "Sisitemu Yubwenge yo Gucunga Kwiga",
  },
  "landing.description": {
    en: "Empowering education at Rwanda Coding Academy with AI-driven learning experiences",
    fr: "Autonomiser l'éducation à la Rwanda Coding Academy avec des expériences d'apprentissage basées sur l'IA",
    rw: "Gutera inkunga uburezi muri Rwanda Coding Academy hamwe n'uburambe bwo kwiga bushingiye kuri AI",
  },
  "landing.getStarted": {
    en: "Get Started",
    fr: "Commencer",
    rw: "Tangira",
  },
  "landing.learnMore": {
    en: "Learn More",
    fr: "En Savoir Plus",
    rw: "Menya Byinshi",
  },
  // Role Selection
  "role.title": {
    en: "Select Your Role",
    fr: "Sélectionnez Votre Rôle",
    rw: "Hitamo Uruhare Rwawe",
  },
  "role.subtitle": {
    en: "Choose how you want to access Smart Eduhub",
    fr: "Choisissez comment vous souhaitez accéder à Smart Eduhub",
    rw: "Hitamo uburyo ushaka kwinjira muri Smart Eduhub",
  },
  "role.student": {
    en: "Student",
    fr: "Étudiant",
    rw: "Umunyeshuri",
  },
  "role.teacher": {
    en: "Teacher",
    fr: "Enseignant",
    rw: "Umwarimu",
  },
  "role.parent": {
    en: "Parent",
    fr: "Parent",
    rw: "Umubyeyi",
  },
  "role.admin": {
    en: "Administrator",
    fr: "Administrateur",
    rw: "Umuyobozi",
  },
  // Auth
  "auth.login": {
    en: "Login",
    fr: "Connexion",
    rw: "Injira",
  },
  "auth.signup": {
    en: "Sign Up",
    fr: "S'inscrire",
    rw: "Iyandikishe",
  },
  "auth.email": {
    en: "Email",
    fr: "E-mail",
    rw: "Imeri",
  },
  "auth.password": {
    en: "Password",
    fr: "Mot de passe",
    rw: "Ijambo ryibanga",
  },
  "auth.forgotPassword": {
    en: "Forgot Password?",
    fr: "Mot de passe oublié?",
    rw: "Wibagiwe ijambo ryibanga?",
  },
  "auth.noAccount": {
    en: "Don't have an account?",
    fr: "Vous n'avez pas de compte?",
    rw: "Ntabwo ufite konti?",
  },
  "auth.hasAccount": {
    en: "Already have an account?",
    fr: "Vous avez déjà un compte?",
    rw: "Usanzwe ufite konti?",
  },
  "auth.institutionalEmail": {
    en: "Institutional Email (@rca.ac.rw)",
    fr: "E-mail institutionnel (@rca.ac.rw)",
    rw: "Imeri y'ikigo (@rca.ac.rw)",
  },
  "auth.inviteToken": {
    en: "Invite Token",
    fr: "Jeton d'invitation",
    rw: "Ikarita yo gutumira",
  },
  "auth.classCode": {
    en: "Class Code",
    fr: "Code de classe",
    rw: "Kode y'ishuri",
  },
  "auth.fullName": {
    en: "Full Name",
    fr: "Nom complet",
    rw: "Amazina yose",
  },
  "common.back": {
    en: "Back",
    fr: "Retour",
    rw: "Subira",
  },
  "common.continue": {
    en: "Continue",
    fr: "Continuer",
    rw: "Komeza",
  },
  "common.submit": {
    en: "Submit",
    fr: "Soumettre",
    rw: "Ohereza",
  },
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && ["en", "fr", "rw"].includes(savedLang)) {
      setLanguage(savedLang)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[key]?.[language] || key
  }

  return <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }
  return context
}
