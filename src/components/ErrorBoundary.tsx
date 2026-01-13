"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
   children: ReactNode;
   fallback?: ReactNode;
}

interface State {
   hasError: boolean;
   error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
   public state: State = {
      hasError: false,
      error: null,
   };

   public static getDerivedStateFromError(error: Error): State {
      return { hasError: true, error };
   }

   public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
   }

   private handleReset = () => {
      this.setState({ hasError: false, error: null });
   };

   public render() {
      if (this.state.hasError) {
         if (this.props.fallback) {
            return this.props.fallback;
         }

         return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
               <Card className="w-full max-w-md">
                  <CardHeader>
                     <div className="flex items-center gap-3">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                        <CardTitle>Something went wrong</CardTitle>
                     </div>
                     <CardDescription>
                        We encountered an unexpected error. Please try again.
                     </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {this.state.error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                           <p className="text-sm font-mono text-red-800">
                              {this.state.error.message}
                           </p>
                        </div>
                     )}
                     <div className="flex gap-2">
                        <Button onClick={this.handleReset} variant="outline" className="flex-1">
                           <RefreshCw className="h-4 w-4 mr-2" />
                           Try Again
                        </Button>
                        <Button
                           onClick={() => {
                              window.location.href = "/";
                           }}
                           variant="outline"
                           className="flex-1"
                        >
                           <Home className="h-4 w-4 mr-2" />
                           Go Home
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            </div>
         );
      }

      return this.props.children;
   }
}






