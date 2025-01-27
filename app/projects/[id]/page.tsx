'use client';

import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Mock data for jobs with some appointments
const jobs = [
  { id: 'VOC', name: 'VOC', status: 'Pending', appointments: [] },
  { id: 'GALA', name: 'Gala', status: 'In Progress', appointments: ['15.04.2024 09:00'] },
  { id: 'SHK', name: 'SHK', status: 'In Progress', appointments: ['18.04.2024 13:30', '19.04.2024 10:00'] },
  { id: 'ELEKTRO', name: 'Elektro', status: 'Pending', appointments: [] },
  { id: 'ISOLIERUNG', name: 'Isolierung', status: 'Completed', appointments: ['12.04.2024 14:00'] },
  { id: 'INBETRIEBNAHME', name: 'Inbetriebnahme', status: 'Pending', appointments: [] },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-700';
    case 'In Progress':
      return 'bg-amber-50 text-amber-700';
    case 'Pending':
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export default function ProjectDetail({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Jobs</h3>
      
      <div className="bg-white rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Termine</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {jobs.map((job) => (
              <tr key={job.id} className="group hover:bg-gray-50">
                <td className="py-3 px-4">
                  <span className="text-sm font-medium text-gray-900">{job.name}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={cn(
                    "inline-block px-2.5 py-0.5 text-xs font-medium rounded-full",
                    getStatusColor(job.status)
                  )}>
                    {job.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {job.appointments.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {job.appointments.map((date, index) => (
                        <Link
                          key={index}
                          href={`/projects/planning?job=${job.id}&date=${encodeURIComponent(date)}`}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                        >
                          {date}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={`/projects/planning?job=${job.id}`}
                      className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
                    >
                      <Calendar className="h-4 w-4" />
                      Termin planen
                    </Link>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="py-3">
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors mx-auto">
                  <Plus className="h-4 w-4" />
                  Job hinzufügen
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 