'use client';

import React from 'react';
import { Hash, MapPin, ExternalLink, Users } from 'lucide-react';

// This would typically come from an API
const getProjectInfo = (projectId: string) => {
  // Mock data - in real app, this would fetch from API
  return {
    customerName: "Tech Demo GmbH",
    projectNumber: projectId,
    address: "Domkloster 4, 50667 Köln",
    status: "In Progress",
    partner: "1komma5",
    businessCentralUrl: "https://businesscentral.dynamics.com/...",
    hubspotUrl: "https://app.hubspot.com/...",
  };
};

interface ProjectHeaderProps {
  projectId: string;
}

export default function ProjectHeader({ projectId }: ProjectHeaderProps) {
  const projectInfo = getProjectInfo(projectId);

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
          <div>
            <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
              {projectInfo.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 