'use client';

import React from 'react';
import { Bell, ChevronDown, Search } from "lucide-react";
import Sidebar from "@/components/sidebar";
import PageContainer from "@/components/page-container";

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
            <div className="relative w-96">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-8 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
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