'use client';

import React from 'react';
import { X, Image, AlertCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  type: 'user' | 'system';
  sender?: string;
  content: string;
  timestamp: string;
  images?: string[];
}

const mockMessages: Message[] = [
  {
    id: 1,
    type: 'system',
    content: 'Projekt wurde erstellt',
    timestamp: '2024-03-20 09:00'
  },
  {
    id: 2,
    type: 'user',
    sender: 'Max Mustermann',
    content: 'Baustellenbesichtigung durchgeführt. Alles sieht gut aus, Fundament ist fertig.',
    timestamp: '2024-03-20 14:30',
    images: ['/images/construction-site-1.jpg', '/images/construction-site-2.jpg']
  },
  {
    id: 3,
    type: 'user',
    sender: 'Anna Schmidt',
    content: 'Materiallieferung für morgen bestätigt.',
    timestamp: '2024-03-20 15:45'
  },
  {
    id: 4,
    type: 'system',
    content: 'Dokumentation für SHK wurde aktualisiert',
    timestamp: '2024-03-20 16:00'
  },
  {
    id: 5,
    type: 'user',
    sender: 'Thomas Weber',
    content: 'Wetterbedingte Verzögerung möglich. Werden morgen früh entscheiden.',
    timestamp: '2024-03-20 17:15'
  }
];

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}

      {/* Chat Panel */}
      <div className={cn(
        "fixed inset-y-0 right-0 w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="h-16 border-b flex items-center justify-between px-4 flex-shrink-0">
          <h3 className="font-medium">Projektkommunikation</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((message) => (
            <div key={message.id} className="space-y-2">
              {/* Message header with timestamp */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  {message.type === 'user' ? message.sender : 'System'}
                </span>
                <span>{message.timestamp}</span>
              </div>

              {/* Message content */}
              <div className={cn(
                "p-3 rounded-lg",
                message.type === 'user' 
                  ? "bg-white border" 
                  : "bg-gray-50 text-gray-600 flex items-center gap-2"
              )}>
                {message.type === 'system' && (
                  <AlertCircle className="h-4 w-4 text-gray-400 flex-shrink-0" />
                )}
                <p className="text-sm">{message.content}</p>
              </div>

              {/* Images if any */}
              {message.images && message.images.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {message.images.map((image, index) => (
                    <div 
                      key={index}
                      className="relative w-20 h-20 rounded-lg border bg-gray-50 flex items-center justify-center"
                    >
                      <Image className="h-5 w-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input area - fixed at bottom */}
        <div className="border-t p-4 bg-white flex-shrink-0">
          <div className="flex flex-col gap-3">
            {/* Input and buttons */}
            <div className="flex gap-2 items-end">
              <textarea
                placeholder="Nachricht schreiben..."
                rows={3}
                className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
              <button 
                className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                title="Nachricht senden"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 