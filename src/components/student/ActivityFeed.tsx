"use client";

import React from 'react';
import { Clock, FileText, Award, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ActivityItem {
  id: string;
  type: 'assignment' | 'grade' | 'announcement' | 'reminder';
  title: string;
  description: string;
  timestamp: string;
  action?: {
    label: string;
    href: string;
  };
}

const activityIcons = {
  assignment: FileText,
  grade: Award,
  announcement: Bell,
  reminder: Clock,
};

const activityColors = {
  assignment: 'text-blue-600 bg-blue-50',
  grade: 'text-green-600 bg-green-50',
  announcement: 'text-purple-600 bg-purple-50',
  reminder: 'text-orange-600 bg-orange-50',
};

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  maxItems = 5,
}) => {
  const displayActivities = activities.slice(0, maxItems);

  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayActivities.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No recent activity</p>
          </div>
        ) : (
          displayActivities.map((activity) => {
            const Icon = activityIcons[activity.type];
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 rounded-lg ${activityColors[activity.type]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {activity.timestamp}
                    </span>
                    {activity.action && (
                      <Link href={activity.action.href}>
                        <Button variant="ghost" size="sm" className="h-auto p-0">
                          {activity.action.label}
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};
