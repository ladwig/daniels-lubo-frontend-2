'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, FileText, ArrowUpRight, Bell, ChevronDown } from 'lucide-react';
import Sidebar from "@/components/sidebar";
import Breadcrumbs from "@/components/breadcrumbs";
import GlobalSearch from "@/components/global-search";
import { cn } from '@/lib/utils';

interface Template {
  id: string;
  name: string;
  version: number;
  type: string;
  lastUpdated: string;
  usageCount: number;
  status: 'active' | 'draft';
}

// Mock data for templates
const TEMPLATES: Template[] = [
  {
    id: 'shk-1',
    name: 'SHK',
    version: 2,
    type: 'Installation',
    lastUpdated: '2024-03-15',
    usageCount: 45,
    status: 'active'
  },
  {
    id: 'elektro-1',
    name: 'Elektro',
    version: 1,
    type: 'Installation',
    lastUpdated: '2024-03-10',
    usageCount: 32,
    status: 'active'
  },
  {
    id: 'voc-1',
    name: 'VOC',
    version: 1,
    type: 'Prüfung',
    lastUpdated: '2024-03-08',
    usageCount: 12,
    status: 'active'
  },
  {
    id: 'isolierung-1',
    name: 'Isolierung',
    version: 3,
    type: 'Installation',
    lastUpdated: '2024-03-20',
    usageCount: 28,
    status: 'active'
  },
  {
    id: 'gala-1',
    name: 'Gala',
    version: 1,
    type: 'Außenanlage',
    lastUpdated: '2024-03-05',
    usageCount: 15,
    status: 'draft'
  }
];

export default function TemplatesPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar onCollapse={setIsSidebarCollapsed} />

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col bg-gray-50 min-h-screen transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        {/* Fixed Header Section */}
        <div className="sticky top-0 z-30 bg-white">
          {/* Main Header */}
          <header className="h-16 border-b flex items-center justify-between px-6">
            <div className="flex-1 flex items-center">
              <GlobalSearch />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-full" />
                <span className="text-sm font-medium">Demo Account</span>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </header>

          {/* Breadcrumbs */}
          <div className="px-6 py-2 border-b bg-gray-50">
            <Breadcrumbs />
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium">Vorlagen</h1>
            <Link
              href="/management/templates/new"
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-primary text-gray-900 rounded-md hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Neue Vorlage
            </Link>
          </div>

          {/* Templates Table */}
          <div className="bg-white border rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Typ</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Letzte Änderung</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Verwendungen</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {TEMPLATES.map((template) => (
                  <tr key={template.id} className="group hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-gray-900">{template.name}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-500">v{template.version}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-500">{template.type}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        template.status === 'active' 
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {template.status === 'active' ? 'Aktiv' : 'Entwurf'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-500">{template.lastUpdated}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-500">{template.usageCount}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/management/templates/${template.id}`}
                          className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-primary transition-colors"
                          title="Bearbeiten"
                        >
                          <FileText className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/management/templates/${template.id}/preview`}
                          className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-primary transition-colors"
                          title="Vorschau"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 