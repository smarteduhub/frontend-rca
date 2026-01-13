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
import Link from "next/link";
import { toast } from "react-toastify";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import axios from "axios";

// Forgot password form validation schema
const forgotPasswordSchema = z.object({
   studentId: z.string().min(1, "Student ID is required"),
   schoolEmail: z.string().email("Valid school email required"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

// Mock forgot password hook - replace with actual API call
const useForgotPassword = () => {
   return {
      mutateAsync: async (data: { studentId: string; schoolEmail: string }) => {
         // Simulate API call
         await new Promise(resolve => setTimeout(resolve, 1000));
         // Mock successful password reset request
         return { success: true, message: "Password reset link sent to your email" };
      },
   };
};

// Forgot password form component
function ForgotPasswordForm() {
   const t = useTranslations("auth");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [isEmailSent, setIsEmailSent] = useState(false);
   const [mounted, setMounted] = useState(false);
   const forgotPasswordMutation = useForgotPassword();

   React.useEffect(() => {
      setMounted(true);
   }, []);

   const form = useForm<ForgotPasswordData>({
      resolver: zodResolver(forgotPasswordSchema),
      mode: "onChange",
      defaultValues: {
         studentId: "",
         schoolEmail: "",
      },
   });

   const onSubmit = async (data: ForgotPasswordData) => {
      setIsSubmitting(true);
      try {
         const response = await forgotPasswordMutation.mutateAsync({
            studentId: data.studentId,
            schoolEmail: data.schoolEmail,
         });

         if (response.success) {
            setIsEmailSent(true);
            toast.success("Password reset link sent! Check your school email.");
         } else {
            toast.error(response.message || "Failed to send reset link.");
         }
      } catch (error) {
         if (axios.isAxiosError(error)) {
            const errorMsg = error.response?.data?.message || "Failed to send reset link. Please try again.";
            toast.error(errorMsg);
         } else {
            toast.error("Failed to send reset link. Please try again.");
         }
      } finally {
         setIsSubmitting(false);
      }
   };

   if (!mounted) {
      return (
         <div className="min-h-screen bg-[#f4f7fb] px-4 py-12 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main mx-auto"></div>
         </div>
      );
   }

   if (isEmailSent) {
      return (
         <div className="min-h-screen bg-[#f4f7fb] px-4 py-12">
            <div className="mx-auto flex w-full max-w-md flex-col">
               <div className="rounded-[28px] bg-white px-6 py-8 shadow-sm text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                     Reset Link Sent!
                  </h1>
                  <p className="text-sm text-slate-500 mb-6">
                     We've sent a password reset link to your school email. Please check your inbox and follow the instructions.
                  </p>
                  <Link href="/login">
                     <Button className="h-12 w-full rounded-xl bg-main text-base font-semibold text-white shadow-lg shadow-main/30 transition hover:bg-main/90">
                        Back to Login
                     </Button>
                  </Link>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-[#f4f7fb] px-4 py-12">
         <div className="mx-auto flex w-full max-w-md flex-col">
            <div className="rounded-[28px] bg-white px-6 py-8 shadow-sm">
               {/* Header */}
               <div className="space-y-1 mb-6">
                  <h1 className="text-2xl font-semibold text-slate-900">
                     Reset Password
                  </h1>
                  <p className="text-sm text-slate-500">
                     Enter your student ID and school email to receive a password reset link.
                  </p>
               </div>

               {/* Instructions */}
               <div className="mb-6 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-start gap-2">
                     <Mail className="h-4 w-4 text-blue-600 mt-0.5" />
                     <div className="text-sm text-blue-800">
                        <p className="font-medium">Note:</p>
                        <p>The reset link will be sent to your official school email address.</p>
                     </div>
                  </div>
               </div>

               {/* Forgot Password Form */}
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                     <FormField
                        control={form.control}
                        name="studentId"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-sm font-medium text-slate-600">
                                 Student ID
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm focus-visible:ring-main/20"
                                    placeholder="e.g., STU2024001"
                                    {...field}
                                 />
                              </FormControl>
                              {form.formState.errors.studentId && (
                                 <p className="text-sm text-red-500">
                                    {form.formState.errors.studentId.message}
                                 </p>
                              )}
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="schoolEmail"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-sm font-medium text-slate-600">
                                 School Email
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm focus-visible:ring-main/20"
                                    placeholder="student@school.edu"
                                    type="email"
                                    {...field}
                                 />
                              </FormControl>
                              {form.formState.errors.schoolEmail && (
                                 <p className="text-sm text-red-500">
                                    {form.formState.errors.schoolEmail.message}
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
                        {isSubmitting ? "Sending..." : "Send Reset Link"}
                     </Button>
                  </form>
               </Form>

               {/* Back to login */}
               <div className="mt-6 text-center">
                  <Link
                     href="/login"
                     className="inline-flex items-center text-sm text-slate-500 hover:text-main"
                  >
                     <ArrowLeft className="h-4 w-4 mr-1" />
                     Back to Login
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}

// Main wrapper component
const ForgotPasswordPage = () => {
   return (
      <Suspense fallback={
         <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main mx-auto"></div>
            </div>
         </div>
      }>
         <ForgotPasswordForm />
      </Suspense>
   );
};

export default ForgotPasswordPage;
