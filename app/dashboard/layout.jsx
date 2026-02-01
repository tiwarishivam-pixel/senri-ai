import React from 'react'
import { Sidebar } from "./sidebar"; // Make sure the filename matches (case-sensitive on some systems)

const MainLAyout = ({children}) => {

    // redirect to onboarding
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


export default MainLAyout