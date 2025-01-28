'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProjectHeader from '@/components/project-header';
import { cn } from '@/lib/utils';
import { format, startOfWeek, addDays } from 'date-fns';
import { de } from 'date-fns/locale';

// Mock data for employees
const employees = [
  { id: 1, name: 'Max Mustermann', team: 'Team A', location: 'Berlin', skills: ['Elektrik', 'Solar'], availability: true },
  { id: 2, name: 'Anna Schmidt', team: 'Team B', location: 'Hamburg', skills: ['HVAC', 'Wartung'], availability: true },
  { id: 3, name: 'Tom Weber', team: 'Team A', location: 'München', skills: ['Solar', 'Montage'], availability: false },
  { id: 4, name: 'Lisa Meyer', team: 'Team C', location: 'Berlin', skills: ['Elektrik', 'HVAC'], availability: true },
  { id: 5, name: 'Jan Becker', team: 'Team B', location: 'Frankfurt', skills: ['Montage', 'Solar'], availability: true },
  { id: 6, name: 'Sarah Koch', team: 'Team A', location: 'Hamburg', skills: ['HVAC', 'Wartung'], availability: true },
  { id: 7, name: 'Felix Wagner', team: 'Team C', location: 'Berlin', skills: ['Elektrik', 'Montage'], availability: true },
  { id: 8, name: 'Laura Schulz', team: 'Team B', location: 'München', skills: ['Solar', 'HVAC'], availability: true },
  { id: 9, name: 'David Fischer', team: 'Team A', location: 'Frankfurt', skills: ['Wartung', 'Elektrik'], availability: false },
  { id: 10, name: 'Julia Hoffmann', team: 'Team C', location: 'Hamburg', skills: ['Montage', 'Solar'], availability: true },
  { id: 11, name: 'Michael Krause', team: 'Team B', location: 'Berlin', skills: ['HVAC', 'Elektrik'], availability: true },
  { id: 12, name: 'Sophie Richter', team: 'Team A', location: 'München', skills: ['Solar', 'Wartung'], availability: true },
  { id: 13, name: 'Lukas Bauer', team: 'Team C', location: 'Frankfurt', skills: ['Montage', 'HVAC'], availability: true },
  { id: 14, name: 'Emma Wolf', team: 'Team B', location: 'Hamburg', skills: ['Elektrik', 'Solar'], availability: true },
  { id: 15, name: 'Jonas Schäfer', team: 'Team A', location: 'Berlin', skills: ['Wartung', 'Montage'], availability: false },
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

// Time options for dropdowns
const TIME_OPTIONS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
];

function NewAppointmentContent() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get('job') || '';
  const defaultWeek = parseInt(searchParams.get('week') || '0');
  
  const [selectedWeek, setSelectedWeek] = useState(defaultWeek);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [startTime, setStartTime] = useState(TIME_OPTIONS[0]);
  const [endTime, setEndTime] = useState(TIME_OPTIONS[4]); // Default to 2 hours later
  
  const job = getJobDetails(jobId);

  // Generate next 12 weeks for selection
  const weeks = Array.from({ length: 12 }, (_, i) => defaultWeek + i);

  // Generate dates for selected week
  const weekDates = useMemo(() => {
    const currentDate = new Date();
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start from Monday
    const targetWeekStart = addDays(weekStart, (selectedWeek - defaultWeek) * 7);
    
    return Array.from({ length: 5 }, (_, i) => { // Monday to Friday
      const date = addDays(targetWeekStart, i);
      return {
        date,
        formatted: format(date, 'EEEE, dd.MM.', { locale: de })
      };
    });
  }, [selectedWeek, defaultWeek]);

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

  const handleDateToggle = (dateStr: string) => {
    setSelectedDates(prev => 
      prev.includes(dateStr)
        ? prev.filter(d => d !== dateStr)
        : [...prev, dateStr]
    );
  };

  // Filter end time options to only show times after start time
  const availableEndTimes = TIME_OPTIONS.filter(time => time > startTime);

  // Update end time if start time is changed to be later than current end time
  const handleStartTimeChange = (newStartTime: string) => {
    setStartTime(newStartTime);
    if (newStartTime >= endTime) {
      const nextEndTimeIndex = TIME_OPTIONS.indexOf(newStartTime) + 4; // 2 hours later
      setEndTime(TIME_OPTIONS[Math.min(nextEndTimeIndex, TIME_OPTIONS.length - 1)]);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <ProjectHeader projectId={job.projectId} />
      
      <div className="p-6">
        <div className="bg-white border rounded-lg">
          <div className="p-4 border-b">
            <h3 className="text-sm font-medium text-gray-900">Terminplanung</h3>
            {/* Job Details */}
            <div className="flex items-center gap-4 text-sm mt-2">
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
          </div>

          <div className="p-4 space-y-6">
            {/* Week, Date, and Time Selection */}
            <div className="grid grid-cols-3 gap-4">
              {/* Week Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kalenderwoche</label>
                <select
                  value={selectedWeek}
                  onChange={(e) => {
                    setSelectedWeek(parseInt(e.target.value));
                    setSelectedDates([]);
                    setStartTime(TIME_OPTIONS[0]);
                    setEndTime(TIME_OPTIONS[4]);
                  }}
                  className="w-full px-3 py-2 text-sm bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {weeks.map(week => (
                    <option key={week} value={week}>KW {week}</option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Verfügbare Tage</label>
                <div className="grid grid-cols-5 gap-1">
                  {weekDates.map(({ date, formatted }) => (
                    <button
                      key={formatted}
                      onClick={() => handleDateToggle(formatted)}
                      className={cn(
                        "p-1 text-xs border rounded transition-colors",
                        selectedDates.includes(formatted)
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <div className="font-medium">{format(date, 'E', { locale: de })}</div>
                      <div className="text-gray-500">{format(date, 'dd.MM.', { locale: de })}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zeitfenster</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={startTime}
                    onChange={(e) => handleStartTimeChange(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm bg-white border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {TIME_OPTIONS.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm bg-white border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {availableEndTimes.map(time => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Employee Selection */}
            {startTime && endTime && selectedDates.length > 0 && (
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
            )}
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t flex justify-end gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-3 py-2 text-sm font-medium text-gray-900 bg-white border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Abbrechen
            </button>
            <button
              type="button"
              className="px-3 py-2 text-sm font-medium text-gray-900 bg-primary border-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedEmployees.length === 0 || selectedDates.length === 0 || startTime === TIME_OPTIONS[0] || endTime === TIME_OPTIONS[0]}
            >
              Termin speichern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewAppointmentPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Laden...</p>
        </div>
      </div>
    }>
      <NewAppointmentContent />
    </Suspense>
  );
} 