'use client';

import React, { useState } from 'react';
import PageContainer from '@/components/page-container';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import ProjectHeader from '@/components/project-header';
import { AlertCircle } from 'lucide-react';

// Add type definitions at the top of the file
interface DocumentationStep {
  id: number;
  chapter: string;
  task: string;
  description: string;
  value: string | string[];
  type: 'text' | 'image';
}

interface Job {
  id: string;
  title: string;
  status: 'completed' | 'in_progress' | 'not_started';
  documentationSteps: DocumentationStep[];
}

// Mock data for different jobs
const jobs: Job[] = [
  {
    id: "SHK",
    title: "SHK Installation",
    status: 'in_progress',
    documentationSteps: [
      {
        id: 1,
        chapter: "Bauen nach Vertrag (AC-M)",
        task: "Wechselrichter 12kW",
        description: "Überprüfung und Dokumentation des 12kW Wechselrichters gemäß Vertragsspezifikationen. Sicherstellen, dass die Leistungsklasse den Anforderungen entspricht.",
        value: "Ja",
        type: "text",
      },
      {
        id: 2,
        chapter: "Bauen nach Vertrag (AC-M)",
        task: "Notstrom/Backup Schalter",
        description: "Installation und Prüfung des internen Notstrom-Schalters. Überprüfung der korrekten Funktionsweise im Backup-Modus.",
        value: "Intern",
        type: "text",
      },
      {
        id: 3,
        chapter: "Bauen nach Vertrag (AC-M)",
        task: "Wallbox",
        description: "Installation und Konfiguration der Wallbox für Elektrofahrzeuge. Prüfung der Verbindung mit dem Energiemanagementsystem.",
        value: "Ja",
        type: "text",
      },
      {
        id: 4,
        chapter: "5.1 Wechselrichter",
        task: "FoxESS: Alt (H3) oder Neu (H3 Smart) (440W Module)",
        description: "Identifikation des Wechselrichter-Modells und Überprüfung der Kompatibilität mit den 440W Modulen.",
        value: "",
        type: "text",
      },
      {
        id: 5,
        chapter: "5.1 Wechselrichter",
        task: "FoxESS: Verbauter WR Typ (440W Module)",
        description: "Dokumentation des spezifischen Wechselrichter-Modells. Überprüfung der maximalen Modulanzahl und Leistungsparameter.",
        value: "FoxESS H3-12.0-E (max 44 Module)",
        type: "text",
      },
      {
        id: 6,
        chapter: "5.1 Wechselrichter",
        task: "Typenschild WR",
        description: "Fotodokumentation des Typenschilds des Wechselrichters für Garantie und Wartungszwecke.",
        value: ["/images/wr-type.jpg"],
        type: "image",
      },
      {
        id: 7,
        chapter: "5.1 Wechselrichter",
        task: "WR-Schutzerdung",
        description: "Überprüfung und Dokumentation der korrekten Erdungsverbindung des Wechselrichters gemäß Sicherheitsvorschriften.",
        value: ["/images/wr-ground.jpg"],
        type: "image",
      },
      {
        id: 8,
        chapter: "5.1 Wechselrichter",
        task: "Kabelverlegung bei den AC Komponenten",
        description: "Dokumentation der AC-Verkabelung, Überprüfung der fachgerechten Installation und Einhaltung der Verlegevorschriften.",
        value: ["/images/cable-routing.jpg"],
        type: "image",
      },
      {
        id: 9,
        chapter: "5.1 Wechselrichter",
        task: "Vorbereitete Kabel - (Backup intern)",
        description: "Überprüfung der vorbereiteten Kabel für die interne Backup-Funktion, einschließlich korrekter Markierung und Anschlussbereitschaft.",
        value: [],
        type: "image",
      },
      {
        id: 10,
        chapter: "5.1 Wechselrichter",
        task: "WR Sicherheitsabstände",
        description: "Überprüfung und Dokumentation der Einhaltung aller erforderlichen Sicherheitsabstände gemäß Herstellervorgaben.",
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
        description: "Dokumentation der Seriennummer des FoxESS Dongles für Monitoring und Garantiezwecke.",
        value: ["/images/dongle-serial.jpg"],
        type: "image",
      },
      {
        id: 12,
        chapter: "5.2 Batteriespeicher",
        task: "Batterie Seriennummer",
        description: "Dokumentation der Seriennummer des Batteriespeichers für Garantie und Wartungszwecke.",
        value: "",
        type: "text",
      },
      {
        id: 13,
        chapter: "5.2 Batteriespeicher",
        task: "Batterie Typenschild",
        description: "Fotodokumentation des Typenschilds des Batteriespeichers.",
        value: [],
        type: "image",
      },
      {
        id: 14,
        chapter: "5.2 Batteriespeicher",
        task: "Batterie Aufstellungsort",
        description: "Dokumentation des Aufstellungsorts des Batteriespeichers mit Fokus auf Sicherheitsabstände und Zugänglichkeit.",
        value: [],
        type: "image",
      },
    ]
  },
  {
    id: "ELEKTRO",
    title: "Elektroinstallation",
    status: 'completed',
    documentationSteps: [
      {
        id: 1,
        chapter: "Elektroarbeiten",
        task: "Hauptsicherung geprüft",
        description: "Überprüfung der Hauptsicherung auf korrekte Dimensionierung und Funktion. Sicherstellung der Übereinstimmung mit den Planungsvorgaben.",
        value: "Ja",
        type: "text",
      },
      {
        id: 2,
        chapter: "Elektroarbeiten",
        task: "Zählerschrank Dokumentation",
        description: "Fotodokumentation des Zählerschranks einschließlich aller relevanten Komponenten und Beschriftungen für die technische Dokumentation.",
        value: ["/images/meter-box-1.jpg", "/images/meter-box-2.jpg"],
        type: "image",
      },
    ]
  },
  {
    id: "ABNAHME",
    title: "Abnahme",
    status: 'not_started',
    documentationSteps: [
      {
        id: 1,
        chapter: "Endabnahme",
        task: "Sichtprüfung durchgeführt",
        description: "Durchführung einer umfassenden visuellen Inspektion aller installierten Komponenten auf ordnungsgemäße Montage und Beschädigungen.",
        value: "Ja",
        type: "text",
      },
      {
        id: 2,
        chapter: "Endabnahme",
        task: "Anlagendokumentation",
        description: "Erstellung und Überprüfung der vollständigen Anlagendokumentation einschließlich aller erforderlichen Unterlagen und Nachweise.",
        value: ["/images/final-docs.jpg"],
        type: "image",
      },
    ]
  },
  {
    id: "INBETRIEBNAHME",
    title: "Inbetriebnahme",
    status: 'not_started',
    documentationSteps: [
      {
        id: 1,
        chapter: "System Setup",
        task: "Wechselrichter konfiguriert",
        description: "Durchführung der Grundeinstellungen und spezifischen Konfiguration des Wechselrichters gemäß Kundenanforderungen und Systemprofil.",
        value: "Ja",
        type: "text",
      },
      {
        id: 2,
        chapter: "System Setup",
        task: "Monitoring eingerichtet",
        description: "Einrichtung und Test des Monitoring-Systems zur Überwachung der Anlagenleistung und Energieerzeugung.",
        value: ["/images/monitoring-setup.jpg"],
        type: "image",
      },
    ]
  }
];

export default function Documentation() {
  const [selectedJob, setSelectedJob] = useState(jobs[0].id);
  const currentJob = jobs.find(job => job.id === selectedJob);

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-yellow-500';
      case 'not_started':
        return 'bg-gray-300';
    }
  };

  const getStatusTitle = (status: Job['status']) => {
    switch (status) {
      case 'completed':
        return 'Dokumentation abgeschlossen';
      case 'in_progress':
        return 'In Bearbeitung';
      case 'not_started':
        return 'Nicht begonnen';
    }
  };

  const isValueMissing = (step: DocumentationStep) => {
    if (step.type === 'text') {
      return !step.value;
    }
    return Array.isArray(step.value) && step.value.length === 0;
  };

  return (
    <div>
      <ProjectHeader projectId="PM123-P48132" />
      <div className="p-6 flex-1 flex flex-col min-h-0 gap-4">
        {/* Job Tabs Card */}
        <div className="bg-white border rounded-lg">
          <div className="flex border-b">
            {jobs.map((job) => (
              <button
                key={job.id}
                onClick={() => setSelectedJob(job.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors relative group",
                  selectedJob === job.id
                    ? "border-primary text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                <div className="flex items-center gap-2">
                  {job.title}
                  <div 
                    className={cn(
                      "w-2 h-2 rounded-full",
                      getStatusColor(job.status)
                    )}
                    title={getStatusTitle(job.status)}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Documentation Table */}
        <div className="flex-1 overflow-auto bg-white border rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-[150px]">Job-Schritt</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-[300px]">Aufgabe</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Wert</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentJob?.documentationSteps.map((step) => (
                <tr key={step.id} className="group relative">
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {step.chapter}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600 relative">
                    <div className="group/task cursor-help">
                      {step.task}
                      <div className="invisible group-hover/task:visible absolute left-0 top-full mt-2 p-2 bg-gray-900 text-white text-xs rounded-md w-[300px] z-50 shadow-lg">
                        {step.description}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {step.type === 'text' ? (
                      <span className="text-sm text-gray-600">
                        {step.value || (
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-400 italic">Ausstehend</span>
                            <AlertCircle 
                              className="h-4 w-4 text-amber-500 flex-shrink-0" 
                              aria-label="Dokumentation ausstehend"
                            />
                          </div>
                        )}
                      </span>
                    ) : (
                      <div className="flex gap-2 flex-wrap">
                        {Array.isArray(step.value) && step.value.length > 0 ? (
                          step.value.map((image, index) => (
                            <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden bg-gray-50">
                              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                Bild {step.value.length > 1 ? index + 1 : ''}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm text-gray-400 italic">Fotos ausstehend</span>
                            <AlertCircle 
                              className="h-4 w-4 text-amber-500 flex-shrink-0" 
                              aria-label="Dokumentation ausstehend"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 