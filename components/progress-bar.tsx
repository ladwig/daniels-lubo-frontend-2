'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number; // 0-7
  className?: string;
}

export default function ProgressBar({ progress, className }: ProgressBarProps) {
  // Create array of 7 segments
  const segments = Array.from({ length: 7 }, (_, i) => i < progress);

  return (
    <div className={cn("flex gap-1", className)}>
      {segments.map((isComplete, index) => (
        <div
          key={index}
          className={cn(
            "h-2 flex-1 rounded-sm transition-colors",
            isComplete ? "bg-primary" : "bg-gray-200"
          )}
        />
      ))}
    </div>
  );
} 