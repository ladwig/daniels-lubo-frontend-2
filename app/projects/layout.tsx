'use client';

import React from 'react';
import { Bell, ChevronDown } from "lucide-react";
import Sidebar from "@/components/sidebar";
import Breadcrumbs from "@/components/breadcrumbs";
import GlobalSearch from "@/components/global-search";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
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

        {/* Content */}
        <div className="flex-1 bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
} 