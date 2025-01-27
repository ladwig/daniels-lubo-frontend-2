'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, GripVertical, Trash2 } from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'number' | 'select' | 'date' | 'time' | 'checkbox';
  label: string;
  required: boolean;
  options?: string[]; // For select fields
}

export default function NewTemplatePage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [isProtocol, setIsProtocol] = useState('no');
  const [fields, setFields] = useState<FormField[]>([]);

  const handleAddField = (type: FormField['type']) => {
    const newField: FormField = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      label: '',
      required: false,
      ...(type === 'select' ? { options: [''] } : {})
    };
    setFields([...fields, newField]);
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleFieldChange = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle template creation
    router.push('/management/templates');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-lg font-medium mb-6">Neue Vorlage erstellen</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Typ</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              >
                <option value="">Bitte wählen</option>
                <option value="installation">Installation</option>
                <option value="pruefung">Prüfung</option>
                <option value="wartung">Wartung</option>
                <option value="reparatur">Reparatur</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Protokoll</label>
              <select
                value={isProtocol}
                onChange={(e) => setIsProtocol(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="no">Nein</option>
                <option value="yes">Ja</option>
              </select>
            </div>
          </div>

          {/* Form Builder */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Formularfelder</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAddField('text')}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  + Text
                </button>
                <button
                  type="button"
                  onClick={() => handleAddField('number')}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  + Nummer
                </button>
                <button
                  type="button"
                  onClick={() => handleAddField('select')}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  + Auswahl
                </button>
                <button
                  type="button"
                  onClick={() => handleAddField('date')}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  + Datum
                </button>
                <button
                  type="button"
                  onClick={() => handleAddField('checkbox')}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  + Checkbox
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div 
                  key={field.id} 
                  className="flex items-start gap-4 p-4 border rounded-lg bg-gray-50 group"
                >
                  <button
                    type="button"
                    className="p-1 text-gray-400 cursor-move"
                  >
                    <GripVertical className="h-4 w-4" />
                  </button>

                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Feldname</label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => handleFieldChange(field.id, { label: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                        placeholder="z.B. Temperatur"
                      />
                    </div>

                    {field.type === 'select' && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Optionen</label>
                        <div className="space-y-2">
                          {field.options?.map((option, optionIndex) => (
                            <input
                              key={optionIndex}
                              type="text"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...(field.options || [])];
                                newOptions[optionIndex] = e.target.value;
                                handleFieldChange(field.id, { options: newOptions });
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const newOptions = [...(field.options || []), ''];
                              handleFieldChange(field.id, { options: newOptions });
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                            Option hinzufügen
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="col-span-2 flex items-center gap-4">
                      <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) => handleFieldChange(field.id, { required: e.target.checked })}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        Pflichtfeld
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveField(field.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t">
            <button
              type="submit"
              className="px-3 py-1.5 text-sm bg-primary text-gray-900 rounded-md hover:bg-primary/90 transition-colors"
            >
              Vorlage erstellen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 