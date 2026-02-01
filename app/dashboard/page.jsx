'use client'; // required if used in app directory and using client-side interactivity

import { Sidebar } from "./sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar (always visible) */}
      <Sidebar isOpen={true} />

      {/* Main content area */}
      <main className="flex-1 ml-64 p-6  pt-16 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
