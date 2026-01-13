"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className,
  hover = true,
}) => (
  <div
    className={cn(
      "bg-white rounded-2xl border border-neutral-200/40 shadow-sm",
      hover && "hover:shadow-md transition-shadow duration-200",
      className
    )}
  >
    {children}
  </div>
);

interface ModernCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const ModernCardHeader: React.FC<ModernCardHeaderProps> = ({
  children,
  className,
}) => (
  <div className={cn("px-6 py-4 border-b border-neutral-200/40", className)}>
    {children}
  </div>
);

interface ModernCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const ModernCardTitle: React.FC<ModernCardTitleProps> = ({
  children,
  className,
}) => (
  <h2 className={cn("text-lg font-semibold text-gray-900", className)}>
    {children}
  </h2>
);

interface ModernCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const ModernCardContent: React.FC<ModernCardContentProps> = ({
  children,
  className,
}) => <div className={cn("px-6 py-4", className)}>{children}</div>;

interface ModernCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModernCardFooter: React.FC<ModernCardFooterProps> = ({
  children,
  className,
}) => (
  <div className={cn("px-6 py-4 border-t border-neutral-200/40", className)}>
    {children}
  </div>
);

// Stat Card Component
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "purple" | "orange" | "red";
}

const colorMap = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  purple: "bg-purple-50 text-purple-600",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-red-50 text-red-600",
};

const iconColorMap = {
  blue: "text-blue-600",
  green: "text-green-600",
  purple: "text-purple-600",
  orange: "text-orange-600",
  red: "text-red-600",
};

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  change,
  color = "blue",
}) => (
  <ModernCard className="p-6">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {change && (
          <p
            className={cn(
              "text-xs font-medium mt-2",
              change.isPositive ? "text-green-600" : "text-red-600"
            )}
          >
            {change.isPositive ? "↑" : "↓"} {Math.abs(change.value)}%
          </p>
        )}
      </div>
      <div className={cn("p-3 rounded-lg", colorMap[color])}>
        {icon}
      </div>
    </div>
  </ModernCard>
);

// Progress Card Component
interface ProgressCardProps {
  label: string;
  value: number;
  max?: number;
  color?: "blue" | "green" | "purple" | "orange";
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  label,
  value,
  max = 100,
  color = "blue",
}) => {
  const percentage = (value / max) * 100;
  const colorClasses = {
    blue: "bg-gradient-to-r from-blue-400 to-blue-600",
    green: "bg-gradient-to-r from-green-400 to-green-600",
    purple: "bg-gradient-to-r from-purple-400 to-purple-600",
    orange: "bg-gradient-to-r from-orange-400 to-orange-600",
  };

  return (
    <ModernCard className="p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <span className="text-sm font-semibold text-gray-900">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-300", colorClasses[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </ModernCard>
  );
};
