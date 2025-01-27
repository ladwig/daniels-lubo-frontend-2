'use client';

import React, { useState, useEffect } from 'react';
import { Bell, ChevronDown, FileText, LogOut } from "lucide-react";
import Sidebar from "@/components/sidebar";
import Breadcrumbs from "@/components/breadcrumbs";
import GlobalSearch from "@/components/global-search";
import Link from 'next/link';
import { cn } from "@/lib/utils";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 1200);
    };

    // Set initial state
    handleResize();

    // Throttle the resize event to prevent too many updates
    let timeoutId: NodeJS.Timeout;
    const throttledResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', throttledResize);
    return () => {
      window.removeEventListener('resize', throttledResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onCollapse={setIsSidebarCollapsed} 
      />

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
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-primary rounded-full" />
                  <span className="text-sm font-medium">Demo Account</span>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-gray-600 transition-transform duration-200",
                    isUserMenuOpen ? "rotate-180" : ""
                  )} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg border shadow-lg py-1 z-50">
                    <Link
                      href="/api-docs"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <FileText className="h-4 w-4" />
                      API Dokumentation
                    </Link>
                    <button
                      onClick={() => {
                        // Handle logout
                        console.log('Logout clicked');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Abmelden
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Breadcrumbs */}
          <div className="px-6 py-2 border-b bg-gray-50">
            <Breadcrumbs />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
} 