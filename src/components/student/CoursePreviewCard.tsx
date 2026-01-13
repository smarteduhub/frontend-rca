"use client";

import React from 'react';
import { Clock, Users, BookOpen, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CoursePreviewCardProps {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  nextAssignment?: string;
  studentsCount?: number;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const colorClasses = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
};

export const CoursePreviewCard: React.FC<CoursePreviewCardProps> = ({
  id,
  title,
  instructor,
  progress,
  nextAssignment,
  studentsCount,
  color = 'blue',
}) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-600">{instructor}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium text-gray-900">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${colorClasses[color]} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Course Details */}
        <div className="space-y-2">
          {nextAssignment && (
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              Next: {nextAssignment}
            </div>
          )}
          {studentsCount && (
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              {studentsCount} students
            </div>
          )}
        </div>

        {/* Action Button */}
        <Link href={`/student/courses/${id}`}>
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors"
          >
            View Course
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};
