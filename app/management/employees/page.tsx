'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Bell, ChevronDown, Search, MapPin, Tags, Pencil, Power, PowerOff } from "lucide-react";
import Sidebar from "@/components/sidebar";
import Breadcrumbs from "@/components/breadcrumbs";
import GlobalSearch from "@/components/global-search";
import { cn } from "@/lib/utils";

const LOCATIONS = ['Berlin', 'Hamburg', 'München', 'Frankfurt', 'Köln', 'Stuttgart', 'Düsseldorf', 'Dresden'];
const SKILLS = ['Elektrik', 'Solar', 'HVAC', 'Wartung', 'Montage', 'Sanitär', 'Heizung', 'Klima'];

// Mock data for employees
const employees = [
  { 
    id: 1, 
    name: 'Max Mustermann', 
    team: 'Team A', 
    location: 'Berlin', 
    skills: ['Elektrik', 'Solar'],
    role: 'fieldworker',
    isActive: true,
    lastLogin: new Date(2024, 3, 15, 8, 30),
    timeTrackedToday: '6h 30m',
  },
  { 
    id: 2, 
    name: 'Anna Schmidt', 
    team: 'Team B', 
    location: 'Hamburg', 
    skills: ['HVAC', 'Wartung'],
    role: 'admin',
    isActive: true,
    lastLogin: new Date(2024, 3, 15, 9, 15),
    timeTrackedToday: '5h 45m',
  },
  { 
    id: 3, 
    name: 'Tom Weber', 
    team: 'Team A', 
    location: 'München', 
    skills: ['Solar', 'Montage'],
    role: 'fieldworker',
    isActive: false,
    lastLogin: new Date(2024, 3, 14, 17, 0),
    timeTrackedToday: '0h 0m',
  },
  { 
    id: 4, 
    name: 'Lisa Meyer', 
    team: 'Team C', 
    location: 'Berlin', 
    skills: ['Elektrik', 'HVAC'],
    role: 'backoffice',
    isActive: true,
    lastLogin: new Date(2024, 3, 15, 7, 45),
    timeTrackedToday: '7h 15m',
  },
  { 
    id: 5, 
    name: 'Jan Becker', 
    team: 'Team B', 
    location: 'Frankfurt', 
    skills: ['Montage', 'Solar'],
    role: 'fieldworker',
    isActive: true,
    lastLogin: new Date(2024, 3, 15, 8, 0),
    timeTrackedToday: '6h 45m',
  },
  { 
    id: 6, 
    name: 'Markus Wagner', 
    team: 'Team B', 
    location: 'Köln', 
    skills: ['Sanitär', 'Heizung'],
    role: 'fieldworker',
    isActive: true,
    lastLogin: new Date(2024, 3, 15, 8, 45),
    timeTrackedToday: '5h 15m',
  },
  { 
    id: 7, 
    name: 'Nina Schulz', 
    team: 'Team C', 
    location: 'Stuttgart', 
    skills: ['Klima', 'HVAC'],
    role: 'backoffice',
    isActive: true,
    lastLogin: new Date(2024, 3, 15, 7, 30),
    timeTrackedToday: '6h 45m',
  },
  { 
    id: 25, 
    name: 'Sophie Weber', 
    team: 'Team A', 
    location: 'Dresden', 
    skills: ['Elektrik', 'Montage'],
    role: 'admin',
    isActive: true,
    lastLogin: new Date(2024, 3, 15, 8, 15),
    timeTrackedToday: '5h 30m',
  }
];

export default function EmployeesPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.team.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = selectedLocations.length === 0 || 
      selectedLocations.includes(employee.location);
    
    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.every(skill => employee.skills.includes(skill));

    return matchesSearch && matchesLocation && matchesSkills;
  });

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
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-medium text-gray-900">Mitarbeiter</h1>
            <button
              type="button"
              className="px-3 py-2 text-sm font-medium text-gray-900 bg-primary border-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              Mitarbeiter hinzufügen
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white border rounded-lg p-4 mb-6">
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="flex items-center gap-2 bg-white rounded-md border px-3 py-1.5 flex-1">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Suche nach Name oder Team..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 text-sm outline-none"
                />
              </div>

              {/* Location Filter */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <select
                  value={selectedLocations[0] || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedLocations(value ? [value] : []);
                  }}
                  className="w-40 px-2 py-1.5 text-sm bg-white border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Alle Standorte</option>
                  {LOCATIONS.map(location => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skills Filter */}
              <div className="flex items-center gap-2">
                <Tags className="h-4 w-4 text-gray-400" />
                <div className="flex flex-wrap gap-1">
                  {SKILLS.map(skill => (
                    <button
                      key={skill}
                      onClick={() => {
                        setSelectedSkills(prev => 
                          prev.includes(skill) 
                            ? prev.filter(s => s !== skill)
                            : [...prev, skill]
                        );
                      }}
                      className={cn(
                        "px-2 py-1 text-xs font-medium rounded-full transition-colors",
                        selectedSkills.includes(skill)
                          ? "bg-primary text-gray-900"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      )}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standort</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rolle</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Letzter Login</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zeit Heute</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEmployees.map(employee => (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{employee.team}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{employee.location}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-1">
                          {employee.skills.map(skill => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {employee.role === 'admin' && 'Admin'}
                          {employee.role === 'fieldworker' && 'Außendienst'}
                          {employee.role === 'backoffice' && 'Innendienst'}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={cn(
                          "px-2 py-0.5 text-xs font-medium rounded-full",
                          employee.isActive
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        )}>
                          {employee.isActive ? 'Aktiv' : 'Inaktiv'}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {format(employee.lastLogin, 'dd.MM.yy HH:mm', { locale: de })}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{employee.timeTrackedToday}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm">
                        <button
                          type="button"
                          className="p-1 hover:bg-gray-100 rounded-full mr-2"
                          title="Bearbeiten"
                        >
                          <Pencil className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          type="button"
                          className={cn(
                            "p-1 hover:bg-gray-100 rounded-full",
                            !employee.isActive && "text-gray-400"
                          )}
                          title={employee.isActive ? 'Deaktivieren' : 'Aktivieren'}
                        >
                          {employee.isActive 
                            ? <Power className="h-4 w-4 text-gray-600" />
                            : <PowerOff className="h-4 w-4 text-gray-400" />
                          }
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 