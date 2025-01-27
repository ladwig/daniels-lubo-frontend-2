'use client';

import React from 'react';
import ProjectHeader from '@/components/project-header';

export default function ProjectDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div>
      <ProjectHeader projectId={params.id} />
      {children}
    </div>
  );
} 