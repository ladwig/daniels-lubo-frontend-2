'use client';

import React from 'react';
import PageContainer from '@/components/page-container';

export default function ProjectDetail({
  params,
}: {
  params: { id: string };
}) {
  return (
    <PageContainer title="Projektdetails">
      <div className="bg-white rounded-lg border p-4">
        <p className="text-gray-600">Project details will be displayed here.</p>
      </div>
    </PageContainer>
  );
} 