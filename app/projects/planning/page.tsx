'use client';

import React, { useState } from 'react';
import PageContainer from '@/components/page-container';
import { cn } from '@/lib/utils';
import { List, Calendar, Map, Plus } from 'lucide-react';
import Link from 'next/link';

// Mock data for jobs without appointments
const jobsWithoutAppointments = [
  {
    id: 1,
    projectId: "PM123-P48132",
    customer: "Tech Demo GmbH",
    jobType: "SHK",
    status: "Pending",
    location: "Berlin",
    priority: "Hoch",
    plannedStartWeek: 16,
  },
  {
    id: 2,
    projectId: "PM123-P48138",
    customer: "Eco Systems GmbH",
    jobType: "Abnahme",
    status: "Pending",
    location: "Hamburg",
    priority: "Mittel",
    plannedStartWeek: 17,
  },
  {
    id: 3,
    projectId: "PM123-P48134",
    customer: "Beispiel AG",
    jobType: "Installation",
    status: "Pending",
    location: "München",
    priority: "Niedrig",
    plannedStartWeek: 16,
  },
  {
    id: 4,
    projectId: "PM123-P48135",
    customer: "Test GmbH",
    jobType: "VOC",
    status: "Pending",
    location: "Berlin",
    priority: "Hoch",
    plannedStartWeek: 18,
  },
  {
    id: 5,
    projectId: "PM123-P48136",
    customer: "Sample Corp",
    jobType: "Elektro",
    status: "Pending",
    location: "Hamburg",
    priority: "Mittel",
    plannedStartWeek: 17,
  },
  {
    id: 6,
    projectId: "PM123-P48137",
    customer: "Demo AG",
    jobType: "SHK",
    status: "Pending",
    location: "München",
    priority: "Hoch",
    plannedStartWeek: 18,
  }
];

// Mock data
const projectAssignments = [
  {
    id: 1,
    employeeId: 1,
    projectId: "PM123-P48132",
    customer: "Tech Demo GmbH",
    jobType: "SHK",
    startWeek: 12,
    duration: 3, // weeks
    color: "bg-blue-500",
  },
  {
    id: 2,
    employeeId: 2,
    projectId: "PM123-P48138",
    customer: "Eco Systems GmbH",
    jobType: "Abnahme",
    startWeek: 14,
    duration: 1,
    color: "bg-green-500",
  },
  {
    id: 3,
    employeeId: 1,
    projectId: "PM123-P48134",
    customer: "Beispiel AG",
    jobType: "Installation",
    startWeek: 15,
    duration: 2,
    color: "bg-purple-500",
  },
];

const assignments = [
  {
    id: 1,
    employeeName: "Max Mustermann",
    location: "Berlin",
    customer: "Tech Demo GmbH",
    projectId: "PM123-P48132",
    jobType: "SHK",
    date: "2024-03-25",
    time: "09:00-12:00",
    team: "Team A",
    trade: "Installation",
  },
  {
    id: 2,
    employeeName: "Anna Schmidt",
    location: "Hamburg",
    customer: "Eco Systems GmbH",
    projectId: "PM123-P48138",
    jobType: "Abnahme",
    date: "2024-03-26",
    time: "13:00-15:00",
    team: "Team B",
    trade: "Quality",
  },
];

const employees = [
  { id: 1, name: "Max Mustermann", location: "Berlin", team: "Team A", trade: "Installation" },
  { id: 2, name: "Anna Schmidt", location: "Hamburg", team: "Team B", trade: "Quality" },
];

type ViewType = 'open' | 'list' | 'resource' | 'map';

export default function Planning() {
  const [view, setView] = useState<ViewType>('open');
  const [locationFilter, setLocationFilter] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [tradeFilter, setTradeFilter] = useState('');

  // Get unique values for filters
  const locations = Array.from(new Set(employees.map(e => e.location)));
  const teams = Array.from(new Set(employees.map(e => e.team)));
  const trades = Array.from(new Set(employees.map(e => e.trade)));

  // Filter employees based on selected filters
  const filteredEmployees = employees.filter(employee => {
    const matchesLocation = !locationFilter || employee.location === locationFilter;
    const matchesTeam = !teamFilter || employee.team === teamFilter;
    const matchesTrade = !tradeFilter || employee.trade === tradeFilter;
    return matchesLocation && matchesTeam && matchesTrade;
  });

  // Filter assignments based on filtered employees
  const filteredAssignments = assignments.filter(assignment =>
    filteredEmployees.some(e => e.name === assignment.employeeName)
  );

  // Get current week number
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const currentWeek = Math.ceil((currentDate.getTime() - startOfYear.getTime()) / (7 * 24 * 60 * 60 * 1000));

  return (
    <PageContainer>
      <div className="flex-1 flex flex-col min-h-0">
        {/* View Switcher and Filters */}
        <div className="border-b bg-white">
          <div className="p-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setView('open')}
                className={cn(
                  "p-2 rounded-md flex items-center gap-2 text-sm font-medium",
                  view === 'open' 
                    ? "bg-gray-100 text-gray-900" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Plus className="h-4 w-4" />
                <span className="flex items-center gap-2">
                  Offen
                  <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-gray-200 text-gray-900">
                    {jobsWithoutAppointments.length}
                  </span>
                </span>
              </button>
              <button
                onClick={() => setView('list')}
                className={cn(
                  "p-2 rounded-md flex items-center gap-2 text-sm font-medium",
                  view === 'list' 
                    ? "bg-gray-100 text-gray-900" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <List className="h-4 w-4" />
                Liste
              </button>
              <button
                onClick={() => setView('resource')}
                className={cn(
                  "p-2 rounded-md flex items-center gap-2 text-sm font-medium",
                  view === 'resource' 
                    ? "bg-gray-100 text-gray-900" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Calendar className="h-4 w-4" />
                Ressourcen
              </button>
              <button
                onClick={() => setView('map')}
                className={cn(
                  "p-2 rounded-md flex items-center gap-2 text-sm font-medium",
                  view === 'map' 
                    ? "bg-gray-100 text-gray-900" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Map className="h-4 w-4" />
                Karte
              </button>
            </div>

            <div className="flex gap-3">
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
              <select
                value={teamFilter}
                onChange={(e) => setTeamFilter(e.target.value)}
                className="text-sm px-2.5 py-1.5 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-600"
              >
                <option value="">Team: Alle</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
              <select
                value={tradeFilter}
                onChange={(e) => setTradeFilter(e.target.value)}
                className="text-sm px-2.5 py-1.5 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-gray-600"
              >
                <option value="">Gewerk: Alle</option>
                {trades.map(trade => (
                  <option key={trade} value={trade}>{trade}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Open Jobs View */}
        {view === 'open' && (
          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Projekt</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Kunde</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Tätigkeit</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Standort</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Priorität</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Geplanter Start</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Aktion</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {jobsWithoutAppointments.map((job) => (
                  <tr 
                    key={job.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-900">{job.projectId}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{job.customer}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{job.jobType}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{job.location}</td>
                    <td className="py-3 px-4">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        job.priority === "Hoch" ? "bg-red-50 text-red-700" :
                        job.priority === "Mittel" ? "bg-yellow-50 text-yellow-700" :
                        "bg-green-50 text-green-700"
                      )}>
                        {job.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                        {job.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      KW {job.plannedStartWeek}
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/projects/planning/new?job=${job.id}&week=${job.plannedStartWeek}`}
                        className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                      >
                        Termin planen
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* List View */}
        {view === 'list' && (
          <div className="flex-1 overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Mitarbeiter</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Standort</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Kunde</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Projekt</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Tätigkeit</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Zeit</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredAssignments.map((assignment) => (
                  <tr 
                    key={assignment.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-900">{assignment.employeeName}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{assignment.location}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{assignment.customer}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{assignment.projectId}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{assignment.jobType}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{assignment.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{assignment.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Resource View */}
        {view === 'resource' && (
          <div className="flex-1 overflow-auto">
            <table className="w-full border-separate border-spacing-0">
              <thead className="sticky top-0 z-10">
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 w-[200px] z-20">
                    Mitarbeiter
                  </th>
                  {Array.from({ length: 12 }, (_, i) => {
                    const weekNum = currentWeek + i;
                    return (
                      <th key={i} className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-[200px] border-l">
                        KW {weekNum}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="relative">
                    <td className="py-3 px-4 text-sm text-gray-900 sticky left-0 bg-white border-r w-[200px] z-10">
                      {employee.name}
                    </td>
                    {Array.from({ length: 12 }, (_, i) => (
                      <td key={i} className="p-0 w-[200px] border-l relative h-[48px]">
                        {projectAssignments
                          .filter(assignment => 
                            assignment.employeeId === employee.id && 
                            assignment.startWeek === currentWeek + i
                          )
                          .map(assignment => (
                            <div
                              key={assignment.id}
                              className={cn(
                                "absolute top-1 left-1 right-1 h-10 rounded-md opacity-90 group cursor-pointer",
                                assignment.color
                              )}
                              style={{
                                width: `calc(${assignment.duration * 100}% - 0.5rem)`,
                              }}
                            >
                              <div className="px-2 py-1 text-xs text-white font-medium truncate">
                                {assignment.jobType} - {assignment.customer}
                              </div>
                              {/* Tooltip */}
                              <div className="absolute hidden group-hover:block bottom-full left-0 mb-2 bg-gray-900 text-white text-xs rounded-md p-2 whitespace-nowrap z-20">
                                <div>{assignment.customer}</div>
                                <div>{assignment.projectId}</div>
                                <div>{assignment.jobType}</div>
                                <div>KW {assignment.startWeek} - {assignment.startWeek + assignment.duration - 1}</div>
                              </div>
                            </div>
                          ))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Map View - Placeholder */}
        {view === 'map' && (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Kartenansicht wird noch implementiert...
          </div>
        )}
      </div>
    </PageContainer>
  );
} 