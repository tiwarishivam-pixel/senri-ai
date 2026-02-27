'use client';

import React from "react";
import DashboardView from "./DashboardView";
export default function DashboardPage() {

  // temporary demo insights
  const insights = {
    marketOutlook: "Positive",
    growthRate: 82,
    demandLevel: "High",
    topSkills: ["Next.js", "AI Agents", "Web3", "TypeScript"],

    salaryRanges: [
      { role: "Frontend Engineer", min: 60000, median: 95000, max: 150000 },
      { role: "Full Stack Engineer", min: 80000, median: 120000, max: 180000 },
      { role: "AI Developer", min: 90000, median: 140000, max: 210000 },
    ],

    keyTrends: [
      "Agentic AI Systems",
      "AI + Web3 Integration",
      "Automation Engineering",
    ],

    recommendedSkills: [
      "Next.js",
      "Solidity",
      "LangChain",
      "System Design",
    ],

    lastUpdated: new Date(),
    nextUpdate: new Date(Date.now() + 86400000),
  };

  return <DashboardView insights={insights} />;
}