'use client';

import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';

// Mock data for employees with additional fields
const employees = [
  { 
    id: 1, 
    name: 'Max Mustermann', 
    team: 'Team A', 
    location: 'Berlin', 
    skills: ['Elektrik', 'Solar'], 
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
    isActive: true,
    lastLogin: new Date(2024, 3, 15, 8, 0),
    timeTrackedToday: '6h 45m',
  },
];

export default function EmployeesPage() {
  return (
    <div className="flex-1 flex flex-col min-h-0 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-medium text-gray-900">Mitarbeiter</h1>
        <button
          type="button"
          className="px-3 py-2 text-sm font-medium text-gray-900 bg-primary border-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          Mitarbeiter hinzufügen
        </button>
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
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Letzter Login</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zeit Heute</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map(employee => (
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
                      className="text-gray-900 hover:text-gray-700 font-medium mr-3"
                    >
                      Bearbeiten
                    </button>
                    <button
                      type="button"
                      className={cn(
                        "text-gray-900 hover:text-gray-700 font-medium",
                        !employee.isActive && "text-gray-400 hover:text-gray-500"
                      )}
                    >
                      {employee.isActive ? 'Deaktivieren' : 'Aktivieren'}
                    </button>
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