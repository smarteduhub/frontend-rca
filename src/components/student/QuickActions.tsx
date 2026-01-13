"use client";

import React from 'react';
import { BookOpen, FileText, TrendingUp, MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
  isPrimary?: boolean;
}

const quickActions: QuickAction[] = [
  {
    id: 'view-courses',
    title: 'View Courses',
    description: 'See all your enrolled courses',
    icon: BookOpen,
    href: '/student/courses',
    color: 'blue',
  },
  {
    id: 'assignments',
    title: 'Assignments',
    description: 'View upcoming and completed work',
    icon: FileText,
    href: '/student/assignments',
    color: 'purple',
  },
  {
    id: 'progress',
    title: 'Progress',
    description: 'Track your academic progress',
    icon: TrendingUp,
    href: '/student/progress',
    color: 'green',
  },
  {
    id: 'slack',
    title: 'Open Slack',
    description: 'Connect with classmates',
    icon: MessageSquare,
    href: '#', // Will open Slack
    color: 'orange',
  },
];

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200',
  green: 'bg-green-50 text-green-600 hover:bg-green-100 border-green-200',
  purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200',
  orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100 border-orange-200',
};

interface QuickActionsProps {
  className?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ className = '' }) => {
  const handleSlackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Open Slack - could be a deep link or web URL
    window.open('https://slack.com/app_redirect?channel=general', '_blank');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions.map((action) => {
          const Icon = action.icon;
          const handleClick = action.id === 'slack' ? handleSlackClick : undefined;
          
          return (
            <Link key={action.id} href={action.href} onClick={handleClick}>
              <Button
                variant="outline"
                className={`w-full justify-start h-auto p-4 border ${colorClasses[action.color]} hover:shadow-md transition-all duration-200`}
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {action.description}
                  </div>
                </div>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
