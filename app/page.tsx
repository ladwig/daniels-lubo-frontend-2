'use client';

import React from 'react';
import { Bell, ChevronDown } from "lucide-react";
import Sidebar from "@/components/sidebar";
import PageContainer from "@/components/page-container";
import GlobalSearch from "@/components/global-search";

export default function Home() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
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

        {/* Page Content */}
        <PageContainer title="Project Overview">
          {/* Add your content here */}
          <div className="bg-white rounded-lg border p-4">
            <p className="text-gray-600">Welcome to your project overview.</p>
          </div>
        </PageContainer>
      </div>
    </div>
  );
} 