/**
 * Root Layout - Wraps all pages
 * 
 * Provider hierarchy (outer to inner):
 * - NextIntlClientProvider: Internationalization (translations)
 * - ErrorBoundary: Catches React errors globally
 * - InstitutionProviderWrapper: Institution branding/config
 * - AuthProvider: Initializes auth state from token
 * - ReactQueryProvider: React Query for data fetching/caching
 * 
 * All pages are wrapped with these providers automatically.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";
import ReactQueryProvider from "@/providers/react.query.provider";
import AuthProvider from "@/providers/auth.provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NpProgress from "@/components/NpProgress";
import InstitutionProviderWrapper from "@/providers/institution.provider";
import { getDefaultInstitution } from "@/config/institutions";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Smart Eduhub",
   description: "Smart Eduhub",
};

interface RootLayoutProps {
   children: React.ReactNode;
   params: Promise<{ locale: string }>;
}

export default async function RootLayout({
   children,
   params,
}: RootLayoutProps) {
   const { locale } = await params;

   if (!hasLocale(routing.locales, locale)) {
      notFound();
   }

   const messages = await getMessages({ locale });
   const institutionProfile = getDefaultInstitution();

   return (
      <NextIntlClientProvider locale={locale} messages={messages}>
         <ErrorBoundary>
            <InstitutionProviderWrapper profile={institutionProfile}>
               <AuthProvider>
                  <ReactQueryProvider>
                     <div
                        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                     >
                        {children}
                     </div>
                     <NpProgress />
                  </ReactQueryProvider>
               </AuthProvider>
               <ToastContainer
                  progressClassName="bg-darkBlue"
                  icon={false}
                  hideProgressBar={true}
                  autoClose={3000}
                  toastClassName={"border-darkBlue"}
               />
            </InstitutionProviderWrapper>
         </ErrorBoundary>
      </NextIntlClientProvider>
   );
}