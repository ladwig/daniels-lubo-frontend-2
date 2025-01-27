'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Download, Power, Calendar, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Job {
  id: string;
  name: string;
  status: string;
  appointments: string[];
  supervisor?: { id: string; name: string };
  hasDocumentation: boolean;
  hasProtocol: boolean;
  isActive: boolean;
}

// Mock data for jobs with some appointments and documentation
const JOBS: Job[] = [
  { 
    id: '1', 
    name: 'SHK', 
    status: 'In Progress',
    appointments: ['18.04.2024 13:30', '19.04.2024 10:00'],
    supervisor: { id: '1', name: 'Max Mustermann' }, 
    hasDocumentation: true, 
    hasProtocol: true, 
    isActive: true 
  },
  { 
    id: '2', 
    name: 'Elektro', 
    status: 'Pending',
    appointments: [],
    supervisor: { id: '2', name: 'John Doe' }, 
    hasDocumentation: true, 
    hasProtocol: false, 
    isActive: true 
  },
  { 
    id: '3', 
    name: 'VOC', 
    status: 'Pending',
    appointments: [],
    hasDocumentation: false, 
    hasProtocol: false, 
    isActive: true 
  },
  { 
    id: '4', 
    name: 'Gala', 
    status: 'In Progress',
    appointments: ['15.04.2024 09:00'],
    supervisor: { id: '3', name: 'Jane Smith' }, 
    hasDocumentation: false, 
    hasProtocol: false, 
    isActive: true 
  },
  { 
    id: '5', 
    name: 'Isolierung', 
    status: 'Completed',
    appointments: ['12.04.2024 14:00'],
    supervisor: { id: '4', name: 'Peter Parker' }, 
    hasDocumentation: true, 
    hasProtocol: true, 
    isActive: true 
  },
  { 
    id: '6', 
    name: 'Inbetriebnahme', 
    status: 'Pending',
    appointments: [],
    hasDocumentation: false, 
    hasProtocol: false, 
    isActive: true 
  }
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

const TABS = [
  { id: 'jobs', label: 'Jobs' },
  { id: 'system', label: 'Systeminformationen' },
  { id: 'customer', label: 'Kundendaten' }
] as const;

type TabId = typeof TABS[number]['id'];

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [jobs, setJobs] = useState<Job[]>(JOBS);
  const [activeTab, setActiveTab] = useState<TabId>('jobs');

  const handleToggleActive = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, isActive: !job.isActive } : job
    ));
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-6 space-y-4 flex-1">
        {/* Tabs */}
        <div className="bg-white border rounded-lg">
          <nav className="flex">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-6 py-3 text-sm font-medium transition-colors relative",
                  activeTab === tab.id
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-lg border flex-1">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Bauleiter</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Termine</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Dokumentation</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Protokoll</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {jobs.map((job) => (
                  <tr 
                    key={job.id} 
                    className={cn(
                      "group hover:bg-gray-50 transition-colors",
                      !job.isActive && "opacity-50 bg-gray-50"
                    )}
                  >
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-gray-900">{job.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        getStatusColor(job.status)
                      )}>
                        {job.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {job.supervisor ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {job.supervisor.name}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">N/A</span>
                      )}
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
                    <td className="py-3 px-4">
                      {job.hasDocumentation ? (
                        <Link
                          href={`/projects/${params.id}/documentation/${job.id}`}
                          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                          Öffnen
                        </Link>
                      ) : (
                        <span className="text-sm text-gray-500">N/A</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {job.hasProtocol ? (
                        <button className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors">
                          <Download className="h-4 w-4" />
                          Herunterladen
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500">N/A</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {job.status === 'Pending' ? (
                        <button
                          onClick={() => handleToggleActive(job.id)}
                          className={cn(
                            "p-1 rounded-md transition-colors",
                            job.isActive 
                              ? "text-gray-400 hover:text-red-500 hover:bg-red-50" 
                              : "text-gray-400 hover:text-green-500 hover:bg-green-50"
                          )}
                          title={job.isActive ? "Deaktivieren" : "Aktivieren"}
                        >
                          <Power className="h-4 w-4" />
                        </button>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={7} className="p-4 text-center">
                    <Link
                      href={`/projects/${params.id}/add-job`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      Job hinzufügen
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="bg-white rounded-lg border p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Anlagentyp</h4>
                <p className="text-sm text-gray-900">Wärmepumpe mit PV-Anlage</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Leistung</h4>
                <p className="text-sm text-gray-900">12 kW</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Installationsdatum</h4>
                <p className="text-sm text-gray-900">15.03.2024</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Wartungsintervall</h4>
                <p className="text-sm text-gray-900">12 Monate</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'customer' && (
          <div className="bg-white rounded-lg border p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Name</h4>
                <p className="text-sm text-gray-900">Max Mustermann</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Adresse</h4>
                <p className="text-sm text-gray-900">Musterstraße 123<br />12345 Musterstadt</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Kontakt</h4>
                <p className="text-sm text-gray-900">
                  +49 123 456789<br />
                  max.mustermann@example.com
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Kundennummer</h4>
                <p className="text-sm text-gray-900">KD-12345</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 