/**
 * RCA Events Widget
 * 
 * Displays upcoming RCA events and bootcamps on the student dashboard.
 * This is a placeholder component that shows sample events.
 * 
 * Task 9: Create dashboard widget for RCA events
 * 
 * Features:
 * - Shows upcoming RCA events
 * - Displays event date, time, and location
 * - Event type badges (Bootcamp, Workshop, Hackathon, etc.)
 * - Responsive design
 * - Can be easily connected to a backend API
 * 
 * Future enhancement:
 * - Connect to events API endpoint
 * - Add event registration functionality
 * - Add calendar integration
 * - Show event capacity/availability
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Clock } from 'lucide-react';

// Sample RCA events data
// TODO: Replace with API call to fetch real events
const sampleEvents = [
  {
    id: 1,
    title: 'RCA Bootcamp 2025 - Cohort 5',
    type: 'Bootcamp',
    startDate: '2025-02-01',
    endDate: '2025-05-30',
    location: 'RCA Campus, Kigali',
    description: '3-month intensive coding bootcamp',
  },
  {
    id: 2,
    title: 'Web Development Workshop',
    type: 'Workshop',
    startDate: '2025-01-25',
    endDate: '2025-01-25',
    location: 'Online',
    description: 'Learn modern web development practices',
  },
  {
    id: 3,
    title: 'RCA Hackathon 2025',
    type: 'Hackathon',
    startDate: '2025-03-15',
    endDate: '2025-03-16',
    location: 'RCA Campus, Kigali',
    description: '24-hour coding competition',
  },
];

/**
 * RCA Events Widget Component
 * 
 * Displays a card with upcoming RCA events
 */
export const RCAEventsWidget: React.FC = () => {
  return (
    <Card className="border border-green-100 shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {/* Task 9: Icon for events */}
          <Calendar className="h-5 w-5 text-green-600" />
          <CardTitle className="text-lg">Upcoming RCA Events</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Task 9: Display events list */}
        {sampleEvents.map((event) => (
          <div
            key={event.id}
            className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
          >
            {/* Event header */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1">
                {/* Title */}
                <h4 className="font-semibold text-gray-900 text-sm">
                  {event.title}
                </h4>
                
                {/* Event type badge */}
                <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                  {event.type}
                </span>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 text-sm mb-2">
              {event.description}
            </p>
            
            {/* Event details */}
            <div className="space-y-1 text-gray-600 text-xs">
              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                <span>
                  {new Date(event.startDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                  {event.startDate !== event.endDate && (
                    <>
                      {' - '}
                      {new Date(event.endDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </>
                  )}
                </span>
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Task 9: View all link */}
        <div className="pt-2 mt-4 border-t border-gray-100">
          <Link
            href="/events"
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            View all events →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RCAEventsWidget;
