'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, User } from 'lucide-react';

interface JobOption {
  id: string;
  name: string;
  version: number;
}

interface ReworkType {
  id: string;
  name: string;
  subtypes: { id: string; name: string; }[];
}

const JOB_OPTIONS: JobOption[] = [
  { id: 'shk', name: 'SHK', version: 2 },
  { id: 'elektro', name: 'Elektro', version: 1 },
  { id: 'voc', name: 'VOC', version: 1 },
  { id: 'isolierung', name: 'Isolierung', version: 3 },
  { id: 'gala', name: 'Gala', version: 1 },
  { id: 'inbetriebnahme', name: 'Inbetriebnahme', version: 1 },
  { id: 'nacharbeit', name: 'Nacharbeit', version: 1 },
];

const REWORK_TYPES: ReworkType[] = [
  { 
    id: 'installation',
    name: 'Installation',
    subtypes: [
      { id: 'rohre', name: 'Rohre und Leitungen' },
      { id: 'anschluesse', name: 'Anschlüsse' },
      { id: 'dichtheit', name: 'Dichtheitsprüfung' },
    ]
  },
  {
    id: 'elektrik',
    name: 'Elektrik',
    subtypes: [
      { id: 'verkabelung', name: 'Verkabelung' },
      { id: 'sicherungen', name: 'Sicherungen' },
      { id: 'steuerung', name: 'Steuerung' },
    ]
  },
  {
    id: 'oberfläche',
    name: 'Oberfläche',
    subtypes: [
      { id: 'putz', name: 'Putz' },
      { id: 'fliesen', name: 'Fliesen' },
      { id: 'anstrich', name: 'Anstrich' },
    ]
  },
];

const EMPLOYEES = [
  { id: '1', name: 'Max Mustermann' },
  { id: '2', name: 'Anna Schmidt' },
  { id: '3', name: 'Thomas Weber' },
];

export default function AddJobPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedReworkType, setSelectedReworkType] = useState('');
  const [selectedReworkSubtype, setSelectedReworkSubtype] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [employee, setEmployee] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    router.push(`/projects/${params.id}`);
  };

  const selectedReworkTypeData = REWORK_TYPES.find(type => type.id === selectedReworkType);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-lg font-medium mb-6">Neuen Job hinzufügen</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column - Job Related */}
            <div className="space-y-6">
              <h3 className="font-medium">Job</h3>
              
              {/* Job Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Art des Jobs</label>
                <select
                  value={selectedJob}
                  onChange={(e) => {
                    setSelectedJob(e.target.value);
                    setSelectedReworkType('');
                    setSelectedReworkSubtype('');
                  }}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                >
                  <option value="">Bitte wählen</option>
                  {JOB_OPTIONS.map(job => (
                    <option key={job.id} value={job.id}>{`${job.name} v${job.version}`}</option>
                  ))}
                </select>
              </div>

              {/* Rework Type Selection - Only show if Nacharbeit is selected */}
              {selectedJob === 'nacharbeit' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Art der Nacharbeit</label>
                  <select
                    value={selectedReworkType}
                    onChange={(e) => {
                      setSelectedReworkType(e.target.value);
                      setSelectedReworkSubtype('');
                    }}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="">Bitte wählen</option>
                    {REWORK_TYPES.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Rework Subtype Selection - Only show if a rework type is selected */}
              {selectedJob === 'nacharbeit' && selectedReworkType && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Unterart der Nacharbeit</label>
                  <select
                    value={selectedReworkSubtype}
                    onChange={(e) => setSelectedReworkSubtype(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="">Bitte wählen</option>
                    {selectedReworkTypeData?.subtypes.map(subtype => (
                      <option key={subtype.id} value={subtype.id}>{subtype.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Beschreibung (optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Zusätzliche Informationen..."
                />
              </div>
            </div>

            {/* Right Column - Appointment Related */}
            <div className="space-y-6">
              <h3 className="font-medium">Termin</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Datum
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Uhrzeit
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Mitarbeiter
                  </label>
                  <select
                    value={employee}
                    onChange={(e) => setEmployee(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="">Bitte wählen</option>
                    {EMPLOYEES.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 mt-6 border-t">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Job hinzufügen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 