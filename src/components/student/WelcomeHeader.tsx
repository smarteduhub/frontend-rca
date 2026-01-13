"use client";

import React from 'react';
import { User, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface WelcomeHeaderProps {
  studentName: string;
  studentAvatar?: string;
  currentDate: string;
}

export const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  studentName,
  studentAvatar,
  currentDate,
}) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getGreeting()}, {studentName}!
        </h1>
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="text-sm">{currentDate}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900">Student Dashboard</p>
          <p className="text-xs text-gray-600">Ready to learn</p>
        </div>
        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
          <AvatarImage src={studentAvatar} alt={studentName} />
          <AvatarFallback className="bg-blue-100 text-blue-600">
            <User className="w-6 h-6" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
