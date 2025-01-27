'use client';

import React from 'react';
import { Hash, MapPin, ExternalLink, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

// Add category to the interface
interface ProjectInfo {
  customerName: string;
  projectNumber: string;
  address: string;
  partner: string;
  status: string;
  businessCentralUrl: string;
  hubspotUrl: string;
  category: 'A' | 'B' | 'C' | 'D';
}

// Update the mock data function
function getProjectInfo(projectId: string): ProjectInfo {
  // Mock data
  return {
    customerName: "Familie Mustermann",
    projectNumber: projectId,
    address: "Musterstraße 123, 12345 Musterstadt",
    partner: "Musterfirma GmbH",
    status: "In Bearbeitung",
    businessCentralUrl: "https://business-central.example.com",
    hubspotUrl: "https://hubspot.example.com",
    category: 'B'
  };
}

interface ProjectHeaderProps {
  projectId: string;
}

export default function ProjectHeader({ projectId }: ProjectHeaderProps) {
  const projectInfo = getProjectInfo(projectId);

  const getCategoryColor = (category: ProjectInfo['category']) => {
    switch (category) {
      case 'A':
        return 'bg-red-50 text-red-700';
      case 'B':
        return 'bg-orange-50 text-orange-700';
      case 'C':
        return 'bg-yellow-50 text-yellow-700';
      case 'D':
        return 'bg-green-50 text-green-700';
    }
  };

  const getCategoryTitle = (category: ProjectInfo['category']) => {
    switch (category) {
      case 'A':
        return 'Höchste Komplexität';
      case 'B':
        return 'Hohe Komplexität';
      case 'C':
        return 'Mittlere Komplexität';
      case 'D':
        return 'Geringe Komplexität';
    }
  };

  return (
    <div className="bg-white border-b">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-medium text-gray-900">
              {projectInfo.customerName}
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Hash className="h-4 w-4" />
                <span>{projectInfo.projectNumber}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{projectInfo.address}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                <span>{projectInfo.partner}</span>
              </div>
              <div className="flex items-center gap-3 ml-2 text-sm">
                <a
                  href={projectInfo.businessCentralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-0.5 text-gray-500 hover:text-primary transition-colors"
                  title="Open in Business Central"
                >
                  <span>BC</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
                <a
                  href={projectInfo.hubspotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-0.5 text-gray-500 hover:text-primary transition-colors"
                  title="Open in HubSpot"
                >
                  <span>HS</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span 
              className={cn(
                "px-2.5 py-0.5 text-xs font-medium rounded-full",
                getCategoryColor(projectInfo.category)
              )}
              title={getCategoryTitle(projectInfo.category)}
            >
              Kategorie {projectInfo.category}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {projectInfo.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 