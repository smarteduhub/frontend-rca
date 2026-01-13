"use client";

import { TrendingUp, BookOpen, GraduationCap } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { useGetEnrolledCourses } from "@/hooks/useCourses";
import { calculateCourseProgress } from "@/hooks/useCourses";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import type { Course } from "@/types/course";

interface ChartData {
   name: string;
   completed: number;
   remaining: number;
   category: string;
   tooltip: string;
}

export function StudentBarChart() {
   const { data: courses = [], isLoading } = useGetEnrolledCourses();

   // Calculate progress for each course
   const courseProgressData: ChartData[] = courses.map((course: Course, index: number) => {
      const progress = calculateCourseProgress(course);
      
      return {
         name: course.title || `Course ${index + 1}`,
         completed: progress,
         remaining: 100 - progress,
         category: course.category || "General",
         tooltip: `${course.title || `Course ${index + 1}`} (${course.category || "General"})`
      };
   });

   // Show empty state if no courses
   if (isLoading) {
      return (
         <Card className="border shadow-md">
            <CardHeader>
               <CardTitle className="text-xl font-semibold">Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500">Loading course data...</p>
               </div>
            </CardContent>
         </Card>
      );
   }

   if (courseProgressData.length === 0) {
      return (
         <Card className="border shadow-md">
            <CardHeader>
               <CardTitle className="text-xl font-semibold">Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="h-64 flex flex-col items-center justify-center text-gray-500">
                  <BookOpen className="h-12 w-12 mb-2 text-gray-300" />
                  <p>No enrolled courses yet</p>
                  <p className="text-sm mt-1">Enroll in courses to see your progress here</p>
               </div>
            </CardContent>
         </Card>
      );
   }

   // Sort by progress (highest first) and limit to top 6
   const displayData = courseProgressData
      .sort((a, b) => b.completed - a.completed)
      .slice(0, 6);

   // Calculate statistics
   const completedCourses = displayData.filter((course) => course.completed >= 100).length;
   const totalCourses = displayData.length;
   const overallProgress = Math.round(
      displayData.reduce((sum, course) => sum + course.completed, 0) / displayData.length
   );

   // Get category distribution
   const categories: Record<string, number> = displayData.reduce((acc, course) => {
      acc[course.category] = (acc[course.category] || 0) + 1;
      return acc;
   }, {} as Record<string, number>);

   const chartConfig = {
      completed: {
         label: "Completed",
         color: "hsl(215, 100%, 60%)",
      },
      remaining: {
         label: "Remaining",
         color: "hsl(220, 13%, 91%)",
      },
   };

   return (
      <Card className="border shadow-md">
         <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
               <CardTitle className="text-xl font-semibold">Course Progress</CardTitle>
               <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">{completedCourses}/{totalCourses} Completed</span>
               </div>
            </div>
            <CardDescription className="flex items-center text-gray-500">
               Overall progress: {overallProgress}%
               <div className="w-24 h-2 bg-gray-200 rounded-full ml-2">
                  <div 
                     className="h-full bg-blue-500 rounded-full" 
                     style={{ width: `${overallProgress}%` }}
                  ></div>
               </div>
            </CardDescription>
         </CardHeader>
         <CardContent className="px-0">
            <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                     data={displayData}
                     layout="vertical"
                     margin={{ top: 5, right: 10, left: 80, bottom: 5 }} 
                  >
                     <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
                     <XAxis type="number" domain={[0, 100]} tickCount={6} />
                     <YAxis 
                        dataKey="name" 
                        type="category" 
                        tick={{ fontSize: 12 }} 
                        width={80} 
                        tickFormatter={(value: string) => value.length > 12 ? `${value.substring(0, 12)}...` : value} 
                     />
                     <Tooltip
                        formatter={(value: number, name: string) => [`${value}%`, name === "completed" ? "Completed" : "Remaining"]}
                        labelFormatter={(label: string) => displayData.find(item => item.name === label)?.tooltip || label}
                     />
                     <Legend />
                     <Bar 
                        dataKey="completed" 
                        stackId="a" 
                        fill="#3b82f6" 
                        name="Completed"
                        radius={[0, 0, 0, 0]}
                        barSize={20}
                     />
                     <Bar 
                        dataKey="remaining" 
                        stackId="a" 
                        fill="#e5e7eb" 
                        name="Remaining"
                        radius={[0, 4, 4, 0]}
                        barSize={20}
                     />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </CardContent>
         <CardFooter className="pt-0 flex justify-between text-sm text-gray-500">
            <div className="flex items-center">
               <BookOpen className="h-4 w-4 mr-2" />
               Top categories: {Object.keys(categories).slice(0, 2).join(", ") || "None"}
            </div>
            <div>
               {totalCourses} {totalCourses === 1 ? 'course' : 'courses'} shown
            </div>
         </CardFooter>
      </Card>
   );
}
