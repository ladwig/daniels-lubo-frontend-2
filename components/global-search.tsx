import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Mock data - would come from an API in production
const mockSearchResults = {
  projects: [
    { id: 'PM123-P48132', name: 'Tech Demo GmbH', type: 'project' },
    { id: 'PM123-P48133', name: 'Mustermann & Söhne', type: 'project' },
  ],
  appointments: [
    { id: 'AP001', title: 'Kundentermin Tech Demo GmbH', date: '2024-03-25', type: 'appointment' },
    { id: 'AP002', title: 'Follow-up Mustermann', date: '2024-03-26', type: 'appointment' },
  ],
  documents: [
    { id: 'DOC001', title: 'Angebot Tech Demo GmbH.pdf', type: 'document' },
    { id: 'DOC002', title: 'Vertrag Mustermann.pdf', type: 'document' },
  ],
};

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter results based on search term
  const filteredResults = searchTerm.length > 0 ? {
    projects: mockSearchResults.projects.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    appointments: mockSearchResults.appointments.filter(a => 
      a.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    documents: mockSearchResults.documents.filter(d => 
      d.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  } : mockSearchResults;

  const hasResults = Object.values(filteredResults).some(category => category.length > 0);

  return (
    <div className="relative w-96">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Globale Suche..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
      />

      {/* Results dropdown */}
      {isOpen && searchTerm && (
        <div 
          className="absolute top-full mt-1 w-full bg-white rounded-md border shadow-lg py-2 z-50"
          onMouseDown={(e) => e.preventDefault()} // Prevent blur from closing before click
        >
          {hasResults ? (
            <>
              {/* Projects */}
              {filteredResults.projects.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Projekte
                  </div>
                  {filteredResults.projects.map(project => (
                    <Link
                      key={project.id}
                      href={`/projects/${project.id}`}
                      className="block px-3 py-2 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="text-sm font-medium">{project.name}</div>
                      <div className="text-xs text-gray-500">{project.id}</div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Appointments */}
              {filteredResults.appointments.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Termine
                  </div>
                  {filteredResults.appointments.map(appointment => (
                    <Link
                      key={appointment.id}
                      href={`/appointments/${appointment.id}`}
                      className="block px-3 py-2 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="text-sm font-medium">{appointment.title}</div>
                      <div className="text-xs text-gray-500">{appointment.date}</div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Documents */}
              {filteredResults.documents.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Dokumente
                  </div>
                  {filteredResults.documents.map(document => (
                    <Link
                      key={document.id}
                      href={`/documents/${document.id}`}
                      className="block px-3 py-2 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="text-sm font-medium">{document.title}</div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">
              Keine Ergebnisse gefunden
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 