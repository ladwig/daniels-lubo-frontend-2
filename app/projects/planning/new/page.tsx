'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectHeader from '@/components/project-header';
import { cn } from '@/lib/utils';

// Mock data for employees with skills
const employees = [
  { 
    id: 1, 
    name: "Max Mustermann", 
    location: "Berlin", 
    team: "Team A", 
    skills: ["SHK", "Installation", "Elektro"],
    availability: true
  },
  { 
    id: 2, 
    name: "Anna Schmidt", 
    location: "Hamburg", 
    team: "Team B", 
    skills: ["Quality", "Abnahme", "VOC"],
    availability: true
  },
  { 
    id: 3, 
    name: "Thomas Weber", 
    location: "München", 
    team: "Team A", 
    skills: ["Installation", "SHK"],
    availability: false
  },
  { 
    id: 4, 
    name: "Lisa Meyer", 
    location: "Berlin", 
    team: "Team B", 
    skills: ["Elektro", "Installation"],
    availability: true
  },
];

// Mock job data - in real app, fetch this based on jobId
const getJobDetails = (jobId: string) => ({
  id: jobId,
  projectId: "PM123-P48132",
  customer: "Tech Demo GmbH",
  jobType: "SHK",
  status: "Pending",
  location: "Berlin",
  priority: "Hoch",
  plannedStartWeek: 16,
  requiredSkills: ["SHK", "Installation"],
  description: "Installation und Inbetriebnahme der Heizungsanlage",
  estimatedDuration: "4-6 Stunden"
});

export default function NewAppointmentPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('job') || '';
  const defaultWeek = parseInt(searchParams.get('week') || '0');
  
  const [selectedWeek, setSelectedWeek] = useState(defaultWeek);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  
  const job = getJobDetails(jobId);

  // Generate next 12 weeks for selection
  const weeks = Array.from({ length: 12 }, (_, i) => defaultWeek + i);

  // Filter and sort employees based on skills match
  const sortedEmployees = [...employees].sort((a, b) => {
    const aMatches = job.requiredSkills.every(skill => a.skills.includes(skill));
    const bMatches = job.requiredSkills.every(skill => b.skills.includes(skill));
    if (aMatches && !bMatches) return -1;
    if (!aMatches && bMatches) return 1;
    return 0;
  });

  const handleEmployeeToggle = (employeeId: number) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <ProjectHeader projectId={job.projectId} />
      
      <div className="p-6 space-y-6">
        {/* Job Details */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-600">{job.jobType}</span>
          <span className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
            job.priority === "Hoch" ? "bg-red-50 text-red-700" :
            job.priority === "Mittel" ? "bg-yellow-50 text-yellow-700" :
            "bg-green-50 text-green-700"
          )}>
            {job.priority}
          </span>
          <span className="text-gray-600">{job.estimatedDuration}</span>
        </div>

        {/* Planning Section */}
        <div className="bg-white border rounded-lg">
          <div className="p-4 border-b">
            <h3 className="text-sm font-medium text-gray-900">Terminplanung</h3>
          </div>
          <div className="p-4 space-y-6">
            {/* Week Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kalenderwoche</label>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
                className="w-full max-w-xs px-3 py-2 text-sm bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {weeks.map(week => (
                  <option key={week} value={week}>KW {week}</option>
                ))}
              </select>
            </div>

            {/* Employee Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mitarbeiter auswählen</label>
              <div className="grid grid-cols-2 gap-4">
                {/* Available Employees */}
                <div className="border rounded-lg">
                  <div className="p-2 border-b bg-gray-50">
                    <input
                      type="text"
                      placeholder="Suchen..."
                      className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="p-2 max-h-[400px] overflow-y-auto">
                    {sortedEmployees
                      .filter(e => !selectedEmployees.includes(e.id))
                      .map(employee => (
                        <div
                          key={employee.id}
                          onClick={() => employee.availability && handleEmployeeToggle(employee.id)}
                          className={cn(
                            "p-2 flex items-center gap-3 rounded cursor-pointer",
                            employee.availability ? "hover:bg-gray-100" : "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={false}
                            readOnly
                            disabled={!employee.availability}
                            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-gray-500">{employee.team}</span>
                              <span className="text-xs text-gray-500">{employee.location}</span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {employee.skills.map(skill => (
                              <span
                                key={skill}
                                className={cn(
                                  "px-2 py-0.5 text-xs font-medium rounded-full",
                                  job.requiredSkills.includes(skill)
                                    ? "bg-green-50 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                )}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                    ))}
                  </div>
                </div>

                {/* Selected Employees */}
                <div className="border rounded-lg">
                  <div className="p-2 border-b bg-gray-50">
                    <h4 className="text-sm font-medium text-gray-700">Ausgewählte Mitarbeiter</h4>
                  </div>
                  <div className="p-2 max-h-[400px] overflow-y-auto">
                    {sortedEmployees
                      .filter(e => selectedEmployees.includes(e.id))
                      .map(employee => (
                        <div
                          key={employee.id}
                          onClick={() => handleEmployeeToggle(employee.id)}
                          className="p-2 flex items-center gap-3 rounded cursor-pointer hover:bg-gray-100"
                        >
                          <input
                            type="checkbox"
                            checked={true}
                            readOnly
                            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-gray-500">{employee.team}</span>
                              <span className="text-xs text-gray-500">{employee.location}</span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            {employee.skills.map(skill => (
                              <span
                                key={skill}
                                className={cn(
                                  "px-2 py-0.5 text-xs font-medium rounded-full",
                                  job.requiredSkills.includes(skill)
                                    ? "bg-green-50 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                )}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t flex justify-end gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Abbrechen
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20"
              disabled={selectedEmployees.length === 0}
            >
              Termin speichern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 