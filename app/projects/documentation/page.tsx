'use client';

import React from 'react';
import PageContainer from '@/components/page-container';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ProjectHeader from '@/components/project-header';

// Mock data for documentation
const documentationSteps = [
  {
    id: 1,
    chapter: "Bauen nach Vertrag (AC-M)",
    task: "Wechselrichter 12kW",
    value: "Ja",
    type: "text",
  },
  {
    id: 2,
    chapter: "Bauen nach Vertrag (AC-M)",
    task: "Notstrom/Backup Schalter",
    value: "Intern",
    type: "text",
  },
  {
    id: 3,
    chapter: "Bauen nach Vertrag (AC-M)",
    task: "Wallbox",
    value: "Ja",
    type: "text",
  },
  {
    id: 4,
    chapter: "5.1 Wechselrichter",
    task: "FoxESS: Alt (H3) oder Neu (H3 Smart) (440W Module)",
    value: "Alt (H3)",
    type: "text",
  },
  {
    id: 5,
    chapter: "5.1 Wechselrichter",
    task: "FoxESS: Verbauter WR Typ (440W Module)",
    value: "FoxESS H3-12.0-E (max 44 Module)",
    type: "text",
  },
  {
    id: 6,
    chapter: "5.1 Wechselrichter",
    task: "Typenschild WR",
    value: ["/images/wr-type.jpg"],
    type: "image",
  },
  {
    id: 7,
    chapter: "5.1 Wechselrichter",
    task: "WR-Schutzerdung",
    value: ["/images/wr-ground.jpg"],
    type: "image",
  },
  {
    id: 8,
    chapter: "5.1 Wechselrichter",
    task: "Kabelverlegung bei den AC Komponenten",
    value: ["/images/cable-routing.jpg"],
    type: "image",
  },
  {
    id: 9,
    chapter: "5.1 Wechselrichter",
    task: "Vorbereitete Kabel - (Backup intern)",
    value: ["/images/prepared-cables.jpg"],
    type: "image",
  },
  {
    id: 10,
    chapter: "5.1 Wechselrichter",
    task: "WR Sicherheitsabstände",
    value: [
      "/images/safety-distances-1.jpg",
      "/images/safety-distances-2.jpg",
      "/images/safety-distances-3.jpg",
      "/images/safety-distances-4.jpg",
      "/images/safety-distances-5.jpg"
    ],
    type: "image",
  },
  {
    id: 11,
    chapter: "5.1 Wechselrichter",
    task: "FoxESS: Dongle Seriennummer",
    value: ["/images/dongle-serial.jpg"],
    type: "image",
  },
];

export default function Documentation() {
  return (
    <div>
      <ProjectHeader projectId="PM123-P48132" />
      <PageContainer>
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-10">
              <tr className="border-b bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">Job-Schritt</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-[300px]">Aufgabe</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Wert</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {documentationSteps.map((step) => (
                <tr key={step.id} className="group">
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {step.chapter}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {step.task}
                  </td>
                  <td className="py-3 px-4">
                    {step.type === 'text' ? (
                      <span className="text-sm text-gray-900">{step.value}</span>
                    ) : (
                      <div className="flex gap-2 flex-wrap">
                        {Array.isArray(step.value) && step.value.map((image, index) => (
                          <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden bg-gray-50">
                            {/* In a real app, these would be actual images */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                              Bild {step.value.length > 1 ? index + 1 : ''}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageContainer>
    </div>
  );
} 