'use client';

import React from 'react';
import PageContainer from '@/components/page-container';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// This would typically come from an API
const projects = [
  {
    id: "PM123-P48132",
    customerName: "Tech Demo GmbH",
    partner: "1komma5",
    status: "In Progress",
    location: "Berlin",
  },
  {
    id: "PM123-P48133",
    customerName: "Mustermann & Söhne",
    partner: "D2C",
    status: "Planned",
    location: "Stuttgart",
  },
  {
    id: "PM123-P48134",
    customerName: "Beispiel AG",
    partner: "42watt",
    status: "Completed",
    location: "Berlin",
  },
  {
    id: "PM123-P48135",
    customerName: "Sample Solutions",
    partner: "Energieberater",
    status: "In Progress",
    location: "Stuttgart",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In Progress':
      return 'bg-primary/10 text-primary';
    case 'Planned':
      return 'bg-blue-100 text-blue-700';
    case 'Completed':
      return 'bg-green-100 text-green-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function Projects() {
  return (
    <PageContainer title="Projekte">
      <div className="bg-white rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Kunde</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Standort</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {projects.map((project) => (
                <tr 
                  key={project.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="block text-sm text-gray-900 hover:text-primary"
                    >
                      {project.id}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="block text-sm text-gray-900 hover:text-primary"
                    >
                      {project.customerName}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="block text-sm text-gray-600"
                    >
                      {project.partner}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="block text-sm text-gray-600"
                    >
                      {project.location}
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="block"
                    >
                      <span className={cn(
                        "inline-block px-2 py-1 text-xs font-medium rounded-full",
                        getStatusColor(project.status)
                      )}>
                        {project.status}
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
} 