'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/projects/${params.projectId}/jobs`);
  }, [router, params.projectId]);

  return null;
} 