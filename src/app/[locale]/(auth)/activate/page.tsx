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
import { Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";
import { apiClient } from "@/lib/apiClient";

// Activation form validation schema
const activationSchema = z
   .object({
      userId: z.string().min(1, "User ID is required"), // UUID from admin
      schoolEmail: z.string().email("Valid school email required"),
      newPassword: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string().min(8, "Please confirm your password"),
   })
   .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
   });

type ActivationData = z.infer<typeof activationSchema>;

// Activation form component
function ActivationForm() {
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [isActivated, setIsActivated] = useState(false);
   const [mounted, setMounted] = useState(false);

   React.useEffect(() => {
      setMounted(true);
   }, []);

   const form = useForm<ActivationData>({
      resolver: zodResolver(activationSchema),
      mode: "onChange",
      defaultValues: {
         userId: "",
         schoolEmail: "",
         newPassword: "",
         confirmPassword: "",
      },
   });

   const onSubmit = async (data: ActivationData) => {
      setIsSubmitting(true);
      try {
         // Admin-only endpoints: activate then set password
         await apiClient.activateUser(data.userId);
         await apiClient.updateUser(data.userId, { password: data.newPassword });
         setIsActivated(true);
         toast.success("Account activated successfully! You can now log in.");
      } catch (error) {
         if (axios.isAxiosError(error)) {
            const errorMsg =
               error.response?.data?.detail ||
               error.response?.data?.message ||
               "Activation failed. Please try again.";
            toast.error(errorMsg);
         } else {
            toast.error("Activation failed. Please try again.");
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

   if (isActivated) {
      return (
         <div className="min-h-screen bg-[#f4f7fb] px-4 py-12">
            <div className="mx-auto flex w-full max-w-md flex-col">
               <div className="rounded-[28px] bg-white px-6 py-8 shadow-sm text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                     Account Activated!
                  </h1>
                  <p className="text-sm text-slate-500 mb-6">
                     Your student account has been successfully activated. You can now log in with your new password.
                  </p>
                  <Link href="/login">
                     <Button className="h-12 w-full rounded-xl bg-main text-base font-semibold text-white shadow-lg shadow-main/30 transition hover:bg-main/90">
                        Go to Login
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
                     Activate Your Account
                  </h1>
                  <p className="text-sm text-slate-500">
                     Use the user ID given by admin and your school email to activate your account and set a password.
                  </p>
               </div>

               {/* Instructions */}
               <div className="mb-6 p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <div className="flex items-start gap-2">
                     <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                     <div className="text-sm text-amber-800">
                        <p className="font-medium">Important:</p>
                        <p>You must use your official school email and the user ID provided by admin. If activation fails, ask admin to activate from their dashboard.</p>
                     </div>
                  </div>
               </div>

               {/* Activation Form */}
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                     <FormField
                        control={form.control}
                        name="userId"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-sm font-medium text-slate-600">
                                 User ID (UUID)
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm focus-visible:ring-main/20"
                                    placeholder="e.g., 3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    {...field}
                                 />
                              </FormControl>
                              {form.formState.errors.userId && (
                                 <p className="text-sm text-red-500">
                                    {form.formState.errors.userId.message}
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

                     <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-sm font-medium text-slate-600">
                                 New Password
                              </FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Input
                                       className="h-12 rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm focus-visible:ring-main/20"
                                       placeholder="Create a strong password"
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
                              {form.formState.errors.newPassword && (
                                 <p className="text-sm text-red-500">
                                    {form.formState.errors.newPassword.message}
                                 </p>
                              )}
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-sm font-medium text-slate-600">
                                 Confirm Password
                              </FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Input
                                       className="h-12 rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm focus-visible:ring-main/20"
                                       placeholder="Re-enter your password"
                                       {...field}
                                       type={showConfirmPassword ? "text" : "password"}
                                    />
                                    <button
                                       type="button"
                                       className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                       onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                       {showConfirmPassword ? (
                                          <EyeOff className="h-5 w-5" />
                                       ) : (
                                          <Eye className="h-5 w-5" />
                                       )}
                                    </button>
                                 </div>
                              </FormControl>
                              {form.formState.errors.confirmPassword && (
                                 <p className="text-sm text-red-500">
                                    {form.formState.errors.confirmPassword.message}
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
                        {isSubmitting ? "Activating..." : "Activate Account"}
                     </Button>
                  </form>
               </Form>

               {/* Back to login */}
               <div className="mt-6 text-center">
                  <p className="text-sm text-slate-500">
                     Already have an account?{" "}
                     <Link
                        href="/login"
                        className="font-semibold text-main hover:underline"
                     >
                        Sign In
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

// Main wrapper component
const ActivatePage = () => {
   return (
      <Suspense fallback={
         <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main mx-auto"></div>
            </div>
         </div>
      }>
         <ActivationForm />
      </Suspense>
   );
};

export default ActivatePage;
