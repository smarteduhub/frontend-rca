/**
 * RCA Announcements Widget
 * 
 * Displays RCA-specific announcements on the student dashboard.
 * This is a placeholder component that shows sample announcements.
 * 
 * Task 9: Create dashboard widget for RCA announcements
 * 
 * Features:
 * - Shows latest RCA announcements
 * - Displays announcement date and category
 * - Responsive design
 * - Can be easily connected to a backend API
 * 
 * Future enhancement:
 * - Connect to announcements API endpoint
 * - Add pagination for more announcements
 * - Add filtering by category
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Calendar } from 'lucide-react';

// Sample RCA announcements data
// TODO: Replace with API call to fetch real announcements
const sampleAnnouncements = [
  {
    id: 1,
    title: 'Welcome to RCA Bootcamp 2025',
    category: 'Event',
    date: '2025-01-15',
    description: 'Join us for the most exciting bootcamp of the year!',
  },
  {
    id: 2,
    title: 'New Course: Advanced Web Development',
    category: 'Course',
    date: '2025-01-10',
    description: 'Master modern web development with our new course.',
  },
  {
    id: 3,
    title: 'RCA Hackathon Registration Open',
    category: 'Event',
    date: '2025-01-08',
    description: 'Register now for the RCA Hackathon 2025!',
  },
];

/**
 * RCA Announcements Widget Component
 * 
 * Displays a card with recent RCA announcements
 */
export const RCAAnnouncementsWidget: React.FC = () => {
  return (
    <Card className="border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {/* Task 9: Icon for announcements */}
          <Bell className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-lg">RCA Announcements</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Task 9: Display announcements list */}
        {sampleAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
          >
            {/* Announcement header */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                {/* Title */}
                <h4 className="font-semibold text-gray-900 text-sm">
                  {announcement.title}
                </h4>
                
                {/* Category badge */}
                <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                  {announcement.category}
                </span>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 text-sm mb-2">
              {announcement.description}
            </p>
            
            {/* Date */}
            <div className="flex items-center gap-1 text-gray-500 text-xs">
              <Calendar className="h-3 w-3" />
              <span>
                {new Date(announcement.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        ))}
        
        {/* Task 9: View all link */}
        <div className="pt-2 mt-4 border-t border-gray-100">
          <Link
            href="/announcements"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View all announcements →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RCAAnnouncementsWidget;
