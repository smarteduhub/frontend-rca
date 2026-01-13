"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   BookOpen,
   CalendarCheck2,
   HeartHandshake,
   Search,
   Users,
} from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";

export const HeroSection = () => {
   const t = useTranslations("home.hero");
   const auth = useTranslations("auth");
   const audiences = [
      {
         label: t("students"),
         description: t("studentsDesc"),
         icon: <BookOpen className="h-5 w-5 text-main" aria-hidden="true" />,
      },
      {
         label: t("teachers"),
         description: t("teachersDesc"),
         icon: <Users className="h-5 w-5 text-main" aria-hidden="true" />,
      },
      {
         label: t("parents"),
         description: t("parentsDesc"),
         icon: (
            <HeartHandshake className="h-5 w-5 text-main" aria-hidden="true" />
         ),
      },
   ];

   return (
      <div className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50 to-sky-100 py-16 md:py-24">
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 right-6 h-32 w-32 rounded-full bg-main/10 blur-3xl" />
            <div className="absolute bottom-6 left-6 h-32 w-32 rounded-full bg-blue-200/40 blur-3xl" />
         </div>

         <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               <div className="space-y-7">
                  <Badge
                     variant="secondary"
                     className="px-4 py-1 mb-2 text-main bg-white shadow-sm border border-main/10"
                  >
                     {t("badge")}
                  </Badge>

                  <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
                     {t("title")}
                  </h1>

                  <p className="text-lg text-slate-700 max-w-2xl">
                     {t("description")}
                  </p>

                  <div className="flex flex-wrap gap-3">
                     <Link href="/login">
                        <Button className="bg-main rounded-full px-8 py-6">
                           {auth("login")}
                        </Button>
                     </Link>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                     {audiences.map((item) => (
                        <div
                           key={item.label}
                           className="rounded-xl bg-white/70 border border-main/10 p-4 shadow-sm"
                        >
                           <div className="flex items-center gap-2 mb-2">
                              <span
                                 aria-hidden="true"
                                 className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-main/10"
                              >
                                 {item.icon}
                              </span>
                              <p className="font-semibold text-slate-900 text-sm">
                                 {item.label}
                              </p>
                           </div>
                           <p className="text-sm text-slate-600 leading-relaxed">
                              {item.description}
                           </p>
                        </div>
                     ))}
                  </div>

                  <div className="pt-2">
                     <div className="p-2 bg-white rounded-xl shadow-md max-w-xl border border-main/10">
                        <div className="relative flex items-center">
                           <Search className="absolute left-3 h-5 w-5 text-slate-400" />
                           <Input
                              type="text"
                              placeholder={t("searchPlaceholder")}
                              className="pl-10 py-6 border-none focus:ring-2 focus:ring-main"
                              aria-label={t("searchPlaceholder")}
                           />
                           <Button className="absolute right-1 bg-main hover:bg-main/90">
                              {t("exploreButton")}
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="hidden lg:flex justify-center">
                  <div className="relative w-full max-w-xl">
                     <div className="relative bg-white rounded-2xl shadow-lg border border-main/10 p-6">
                        <Image
                           src="/images/school-building.jpeg"
                           alt="Smart EduHub campus entrance"
                           width={600}
                           height={420}
                           className="w-full h-auto rounded-xl object-cover"
                           priority
                        />

                        <div className="grid grid-cols-2 gap-3 mt-6">
                           <div className="rounded-xl bg-main/5 px-4 py-3">
                              <p className="text-xs text-slate-500">
                                 {t("dailyPlan")}
                              </p>
                              <p className="text-lg font-semibold text-slate-900">
                                 {t("weeklyLessons")}
                              </p>
                           </div>
                           <div className="rounded-xl bg-white px-4 py-3 border border-main/10">
                              <div className="flex items-center gap-2">
                                 <CalendarCheck2 className="h-5 w-5 text-main" />
                                 <p className="text-sm font-semibold text-slate-900">
                                    {t("reminders")}
                                 </p>
                              </div>
                              <p className="text-xs text-slate-600 mt-1">
                                 {t("remindersCopy")}
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
