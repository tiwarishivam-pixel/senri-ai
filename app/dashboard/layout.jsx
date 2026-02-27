'use client';

import React from "react";
import { Sidebar } from "./sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      
      {/* Sidebar */}
      <Sidebar isOpen={true} />

      {/* Content Area */}
      <main className="flex-1 ml-64 p-6 pt-16 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}