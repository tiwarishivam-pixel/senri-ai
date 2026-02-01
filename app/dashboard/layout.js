'use client';

import { Sidebar } from "./sidebar"; // Make sure the filename matches (case-sensitive on some systems)

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar (always visible) */}
      <Sidebar isOpen={true} />

      {/* Main content area */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
