"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mail, MessageSquare, BookOpen } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "How do I view my courses?",
    a: "Go to My Courses to see everything you are enrolled in. Use Continue to jump back in.",
  },
  {
    q: "Where can I find due dates?",
    a: "Assignments page lists due dates. Timetable shows schedule items.",
  },
  {
    q: "How do I contact my teacher?",
    a: "Use Messages to send a note. Include course and topic for faster responses.",
  },
];

const StudentHelpPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase text-slate-500">Student</p>
        <h1 className="text-2xl font-semibold text-slate-900">
          Help & support
        </h1>
        <p className="text-sm text-slate-600">
          Find quick answers or reach out to your school support team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 border border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-blue-600" />
              FAQs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqs.map((item) => (
              <div key={item.q} className="border-b border-slate-100 pb-3">
                <p className="font-medium text-slate-900">{item.q}</p>
                <p className="text-sm text-slate-600 mt-1">{item.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-emerald-600" />
              Need more help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="/student/chat">
                <MessageSquare className="h-4 w-4" />
                Message your teacher
              </Link>
            </Button>
            <Button
              className="w-full justify-start gap-2"
              variant="outline"
              asChild
            >
              <Link href="mailto:support@school.edu">
                <Mail className="h-4 w-4" />
                Email support
              </Link>
            </Button>
            <p className="text-xs text-slate-500">
              Include course, topic, and what you’ve tried so far for faster
              help.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentHelpPage;
