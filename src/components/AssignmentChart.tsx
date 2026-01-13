"use client";

import { useGetStudentAssignments } from "@/hooks/useAssignments";
import { TrendingUp, BookOpen, Loader2 } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Assignment } from "@/types/assignments";
import { useMemo } from "react";

interface MonthlyData {
  month: string;
  count: number;
  avgScore?: number;
  name: string;
}

export function AssignmentChart() {
  const { data: assignments = [], isLoading } = useGetStudentAssignments();

  // Process assignments data to get monthly stats
  const monthlyData = useMemo<MonthlyData[]>(() => {
    if (
      !assignments ||
      (Array.isArray(assignments) && assignments.length === 0)
    )
      return [];

    const processed = (assignments as Assignment[]).reduce(
      (acc: MonthlyData[], assignment: Assignment) => {
        if (!assignment.created_at) return acc;

        const date = new Date(assignment.created_at);
        const monthName = date.toLocaleString("default", { month: "short" });

        const existingMonth = acc.find((item) => item.month === monthName);
        if (existingMonth) {
          existingMonth.count += 1;
        } else {
          acc.push({
            month: monthName,
            count: 1,
            name: monthName,
          });
        }
        return acc;
      },
      []
    );

    // Sort by month for proper display
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return processed.sort(
      (a, b) => months.indexOf(a.month) - months.indexOf(b.month)
    );
  }, [assignments]);

  const totalAssignments = Array.isArray(assignments) ? assignments.length : 0;
  const trend =
    monthlyData.length > 1
      ? monthlyData[monthlyData.length - 1].count - monthlyData[0].count
      : 0;

  if (isLoading) {
    return (
      <Card className="border shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Assignment Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!Array.isArray(assignments) || assignments.length === 0) {
    return (
      <Card className="border shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Assignment Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex flex-col items-center justify-center text-gray-500">
            <BookOpen className="h-12 w-12 mb-2 text-gray-300" />
            <p>No assignments yet</p>
            <p className="text-sm mt-1">
              Your assignment progress will appear here
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Assignment Progress
          </CardTitle>
          <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">
              {trend >= 0 ? `+${trend}` : trend} this period
            </span>
          </div>
        </div>
        <CardDescription className="text-gray-500">
          Total assignments: {totalAssignments}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                name="Assignments"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ fill: "#8884d8", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex items-center text-sm text-gray-500">
          <BookOpen className="h-4 w-4 mr-2" />
          {monthlyData.length > 0
            ? `Showing data from ${monthlyData[0].month} to ${
                monthlyData[monthlyData.length - 1].month
              }`
            : "No assignment data available"}
        </div>
      </CardFooter>
    </Card>
  );
}
