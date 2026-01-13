"use client";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState, Suspense } from "react";
import logo from "@/images/logo.svg";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import google from "@/images/google.png";
import { useLoginUser } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { Cookies } from "react-cookie";
import { useSearchParams } from "next/navigation";
import { useInitiateOAuth } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

const cookies = new Cookies();

const formSchema = z.object({
   email: z.string().email("Invalid email"),
   password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof formSchema>;

// Loading component
function Loading() {
   return (
      <div className="flex items-center justify-center min-h-screen">
         <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main mx-auto"></div>
         </div>
      </div>
   );
}

// Main login form component that uses useSearchParams
function LoginForm() {
   const t = useTranslations("auth");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const searchParams = useSearchParams();
   const redirectUrl = searchParams.get("redirectUrl");
   const authReason = searchParams.get("reason");

   const loginMutation = useLoginUser();
   const initiateOAuthMutation = useInitiateOAuth();

   const form = useForm<FormData>({
      resolver: zodResolver(formSchema),
      mode: "onChange",
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const bannerMessage =
      authReason === "auth_required"
         ? "Please activate your account and log in to access the dashboard."
         : authReason === "session_expired"
         ? "Session expired. Please log in again."
         : authReason === "inactive"
         ? "Your account is inactive. Please activate and log in."
         : null;

   const onSubmit = async (data: FormData) => {
      setIsSubmitting(true);
      try {
         const response = await loginMutation.mutateAsync(data);

         if (response?.access_token) {
            // First clear any existing tokens to prevent issues
            cookies.remove("access_token", { path: "/" });
            // Then set the new token
            cookies.set("access_token", response.access_token, { path: "/" });

            try {
               const payload = JSON.parse(
                  atob(response.access_token.split(".")[1])
               );

               if (redirectUrl) {
                  location.replace(redirectUrl);
               } else {
                  // Redirect based on role
                  switch (payload.role) {
                     case "admin":
                        location.replace("/admin");
                        break;
                     case "teacher":
                        location.replace("/teacher");
                        break;
                     case "parent":
                        location.replace("/parent");
                        break;
                     case "student":
                        location.replace("/student");
                        break;
                     default:
                        location.replace("/student");
                  }
               }
            } catch (error) {
               // If token decoding fails, show error and remove the token
               cookies.remove("access_token", { path: "/" });
               toast.error("Authentication error. Please login again.");
            }
         } else {
            toast.error(response?.error?.msg || "Login failed");
         }
      } catch (error) {
         toast.error("Login failed. Please try again.");
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleOAuthClick = (provider: string) => {
      initiateOAuthMutation.mutate({ provider });
   };

   return (
      <div className="min-h-screen bg-[#f4f7fb] px-4 py-12">
         <div className="mx-auto flex w-full max-w-md flex-col">
            <div className="rounded-[28px] bg-white px-6 py-8 shadow-sm">
               <Link
                  className="flex items-center gap-3 mb-6"
                  href="/"
               >
                  <Image src={logo} alt="smarteduhub" />
                  <span className="text-main font-bold">Smart Eduhub</span>
               </Link>

               {bannerMessage && (
                  <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
                     {bannerMessage}
                  </div>
               )}

               <div className="space-y-1 mb-6">
                  <h1 className="text-2xl font-semibold text-slate-900">
                     {t("login")}
                  </h1>
                  <p className="text-sm text-slate-500">
                     Sign in with your school email and password.
                  </p>
               </div>

               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className="space-y-6"
                  >
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-sm font-medium text-slate-600">
                                 {t("email")} *
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm focus-visible:ring-main/20"
                                    placeholder="you@school.edu"
                                    {...field}
                                 />
                              </FormControl>
                              {form.formState.errors.email && (
                                 <p className="text-red-500 text-sm">
                                    {form.formState.errors.email.message}
                                 </p>
                              )}
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-sm font-medium text-slate-600">
                                 {t("password")} *
                              </FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Input
                                       className="h-12 rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm focus-visible:ring-main/20"
                                       placeholder="Password"
                                       {...field}
                                       type={showPassword ? "text" : "password"}
                                    />
                                    <button
                                       type="button"
                                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                       onClick={() => setShowPassword(!showPassword)}
                                    >
                                       {showPassword ? (
                                          <EyeOff className="h-5 w-5" />
                                       ) : (
                                          <Eye className="h-5 w-5" />
                                       )}
                                    </button>
                                 </div>
                              </FormControl>
                              {form.formState.errors.password && (
                                 <p className="text-red-500 text-sm">
                                    {form.formState.errors.password.message}
                                 </p>
                              )}
                           </FormItem>
                        )}
                     />

                     <Button
                        type="submit"
                        className="h-12 w-full rounded-xl bg-main text-base font-semibold text-white shadow-lg shadow-main/30 transition hover:bg-main/90"
                        disabled={isSubmitting}
                     >
                        {isSubmitting ? t("loading") : t("loginButton")}
                     </Button>
                  </form>
               </Form>

               <div className="mt-6 space-y-3">
                  <div className="text-center text-sm text-slate-500">
                     {t("or")}
                  </div>
                  <div
                     className="w-full bg-white py-4 px-8 cursor-pointer hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3 shadow-sm"
                     onClick={() => handleOAuthClick("google")}
                  >
                     <Image
                        src={google}
                        alt="google"
                        className="w-6 h-6"
                     />
                     <span className="text-gray-600">
                        {t("continueWithGoogle")}
                     </span>
                  </div>
               </div>
            </div>

            <div className="mt-6 text-center text-sm text-slate-600 space-y-1">
               <p>
                  Don&apos;t have an account?{" "}
                  <Link
                     className="text-main font-semibold hover:underline"
                     href="/activate"
                  >
                     Activate Account
                  </Link>
               </p>
            </div>
         </div>
      </div>
   );
}

// Main wrapper component with Suspense boundary
const LoginPage = () => {
   return (
      <Suspense fallback={<Loading />}>
         <LoginForm />
      </Suspense>
   );
};

export default LoginPage;