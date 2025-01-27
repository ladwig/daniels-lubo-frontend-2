'use client';

import React, { useState } from 'react';
import PageContainer from '@/components/page-container';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProgressBar from '@/components/progress-bar';

// This would typically come from an API
const projects = [
  {
    id: "PM123-P48132",
    customerName: "Tech Demo GmbH",
    partner: "1komma5",
    status: "In Progress",
    location: "Berlin",
    startWeek: "KW 12",
    progress: 3,
  },
  {
    id: "PM123-P48133",
    customerName: "Mustermann & Söhne",
    partner: "D2C",
    status: "Planned",
    location: "Stuttgart",
    startWeek: "KW 14",
    progress: 0,
  },
  {
    id: "PM123-P48134",
    customerName: "Beispiel AG",
    partner: "42watt",
    status: "Completed",
    location: "Berlin",
    startWeek: "KW 8",
    progress: 7,
  },
  {
    id: "PM123-P48135",
    customerName: "Sample Solutions",
    partner: "Energieberater",
    status: "In Progress",
    location: "Stuttgart",
    startWeek: "KW 13",
    progress: 4,
  },
  {
    id: "PM123-P48136",
    customerName: "Green Energy GmbH",
    partner: "1komma5",
    status: "In Progress",
    location: "Hamburg",
    startWeek: "KW 15",
    progress: 2,
  },
  {
    id: "PM123-P48137",
    customerName: "Solar Power AG",
    partner: "D2C",
    status: "Planned",
    location: "München",
    startWeek: "KW 16",
    progress: 1,
  },
  {
    id: "PM123-P48138",
    customerName: "Eco Systems GmbH",
    partner: "42watt",
    status: "Completed",
    location: "Berlin",
    startWeek: "KW 10",
    progress: 7,
  },
  {
    id: "PM123-P48139",
    customerName: "Smart Home Solutions",
    partner: "1komma5",
    status: "In Progress",
    location: "Frankfurt",
    startWeek: "KW 11",
    progress: 5,
  },
  {
    id: "PM123-P48140",
    customerName: "Future Tech AG",
    partner: "Energieberater",
    status: "Planned",
    location: "Köln",
    startWeek: "KW 17",
    progress: 0,
  },
  {
    id: "PM123-P48141",
    customerName: "Clean Energy Corp",
    partner: "D2C",
    status: "In Progress",
    location: "Hamburg",
    startWeek: "KW 14",
    progress: 3,
  },
  {
    id: "PM123-P48142",
    customerName: "Power Solutions GmbH",
    partner: "42watt",
    status: "Completed",
    location: "München",
    startWeek: "KW 9",
    progress: 7,
  },
  {
    id: "PM123-P48143",
    customerName: "Renewable Tech",
    partner: "1komma5",
    status: "In Progress",
    location: "Stuttgart",
    startWeek: "KW 13",
    progress: 4,
  },
  {
    id: "PM123-P48144",
    customerName: "Energy Systems AG",
    partner: "Energieberater",
    status: "Planned",
    location: "Berlin",
    startWeek: "KW 18",
    progress: 0,
  },
  {
    id: "PM123-P48145",
    customerName: "Sustainable Power",
    partner: "D2C",
    status: "Completed",
    location: "Frankfurt",
    startWeek: "KW 7",
    progress: 7,
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

const ITEMS_PER_PAGE = 8;

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [partnerFilter, setPartnerFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // Get unique values for filters
  const partners = Array.from(new Set(projects.map(p => p.partner)));
  const locations = Array.from(new Set(projects.map(p => p.location)));
  const statuses = Array.from(new Set(projects.map(p => p.status)));

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesStatus = statusFilter === '' || project.status === statusFilter;
    const matchesPartner = partnerFilter === '' || project.partner === partnerFilter;
    const matchesLocation = locationFilter === '' || project.location === locationFilter;
    
    return matchesStatus && matchesPartner && matchesLocation;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <PageContainer title="Projekte">
      {/* Filters */}
      <div className="p-4 border-b">
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm px-2.5 py-1.5 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-600"
          >
            <option value="">Status: Alle</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select
            value={partnerFilter}
            onChange={(e) => setPartnerFilter(e.target.value)}
            className="text-sm px-2.5 py-1.5 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-600"
          >
            <option value="">Partner: Alle</option>
            {partners.map(partner => (
              <option key={partner} value={partner}>{partner}</option>
            ))}
          </select>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="text-sm px-2.5 py-1.5 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-600"
          >
            <option value="">Standort: Alle</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Kunde</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Standort</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Start</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Fortschritt</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {paginatedProjects.map((project) => (
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
                    className="block text-sm text-gray-600"
                  >
                    {project.startWeek}
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <Link 
                    href={`/projects/${project.id}`}
                    className="block"
                  >
                    <span className={cn(
                      "inline-block px-2.5 py-0.5 text-xs font-medium rounded-full",
                      getStatusColor(project.status)
                    )}>
                      {project.status}
                    </span>
                  </Link>
                </td>
                <td className="py-3 px-4">
                  <ProgressBar progress={project.progress} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 border-t flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Zeige {startIndex + 1} bis {Math.min(startIndex + ITEMS_PER_PAGE, filteredProjects.length)} von {filteredProjects.length} Projekten
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm text-gray-600">
            Seite {currentPage} von {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </PageContainer>
  );
} 