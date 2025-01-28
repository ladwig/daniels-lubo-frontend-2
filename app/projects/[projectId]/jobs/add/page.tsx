'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function AddJobPage({
  params,
}: {
  params: { projectId: string };
}) {
  const router = useRouter();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-semibold">Job hinzufügen</h1>
          </div>
        </div>

        {/* Coming Soon Message */}
        <div className="bg-white rounded-lg border p-6">
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">Diese Funktion wird in Kürze verfügbar sein.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 