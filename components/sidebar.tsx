'use client';

import React, { useState } from 'react';
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Calendar,
  MessageSquare,
  Settings,
  FileImage,
  AlertCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Clock,
  Users,
  Package,
  FileStack,
  ScrollText,
} from "lucide-react";
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  {
    section: "Projekte",
    items: [
      { icon: LayoutDashboard, label: "Übersicht", href: "/projects" },
      { icon: Calendar, label: "Planung", href: "/projects/planning" },
      { icon: FileText, label: "Dokumentation", href: "/projects/documentation" },
    ]
  },
  {
    section: "Verwaltung",
    items: [
      { icon: ClipboardList, label: "Inventur", href: "/management/inventory" },
      { icon: Package, label: "Artikel", href: "/management/articles" },
      { icon: Users, label: "Mitarbeiter", href: "/management/employees" },
      { icon: ScrollText, label: "Vorlagen", href: "/management/templates" },
    ]
  },
  {
    section: "System",
    items: [
      { icon: Settings, label: "Einstellungen", href: "/settings" },
    ]
  }
];

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

export default function Sidebar({ onCollapse }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse?.(!isCollapsed);
  };

  return (
    <aside 
      className={cn(
        "bg-white border-r flex flex-col fixed h-screen transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo/Header */}
      <div className="h-16 border-b flex items-center px-6 flex-shrink-0">
        <span className={cn(
          "text-lg font-medium text-primary transition-all duration-300 ease-in-out whitespace-nowrap",
          isCollapsed ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0"
        )}>
          montamo
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="px-3 space-y-6">
          {navItems.map((section) => (
            <li key={section.section} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 mb-2">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {section.section}
                  </span>
                </div>
              )}
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center h-10 gap-3 px-3 rounded-md transition-colors relative group overflow-hidden",
                      isActive 
                        ? "text-gray-900 bg-gray-100 font-medium" 
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive ? "text-gray-900" : "text-gray-500"
                    )} />
                    <span className={cn(
                      "transition-all duration-300 ease-in-out whitespace-nowrap text-sm",
                      isCollapsed ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0"
                    )}>
                      {item.label}
                    </span>
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity duration-150">
                        {item.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </li>
          ))}
        </ul>
      </nav>

      {/* Collapse Toggle Button */}
      <div className="border-t p-3">
        <button
          onClick={toggleCollapse}
          className="w-full flex justify-center p-2 rounded-md hover:bg-gray-100 text-gray-700 transition-colors group"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
} 