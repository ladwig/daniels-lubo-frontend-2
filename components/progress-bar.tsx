'use client';

import React from 'react';
import { cn } from '@/lib/utils';

const PROGRESS_STEPS = [
  "Projektstart",
  "Planung",
  "Materialbeschaffung",
  "Installation",
  "Dokumentation",
  "Abnahme",
  "Abgeschlossen"
];

interface ProgressBarProps {
  progress: number; // 0-7
  className?: string;
}

export default function ProgressBar({ progress, className }: ProgressBarProps) {
  // Create array of 7 segments
  const segments = Array.from({ length: 7 }, (_, i) => i < progress);

  return (
    <div className={cn("flex gap-1 relative group", className)}>
      {segments.map((isComplete, index) => (
        <div
          key={index}
          className="relative group/step flex-1"
        >
          <div
            className={cn(
              "h-2 w-full rounded-sm transition-colors",
              isComplete ? "bg-primary" : "bg-gray-200"
            )}
          />
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/step:block z-50">
            <div className="bg-gray-900 text-white text-xs rounded-md py-1 px-2 whitespace-nowrap">
              {PROGRESS_STEPS[index]}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 