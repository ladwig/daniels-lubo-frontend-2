'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function PageContainer({
  children,
  title,
  className,
}: PageContainerProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0 p-6">
      {title && (
        <h1 className="text-xl font-medium text-gray-900 mb-4">
          {title}
        </h1>
      )}
      <div className={cn(
        "bg-white rounded-lg border flex-1",
        className
      )}>
        {children}
      </div>
    </div>
  );
} 