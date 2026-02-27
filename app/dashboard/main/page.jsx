import DashboardView from "../DashboardView";

export default async function Page() {

  // Normally fetch from API / DB
  const insights = {
    marketOutlook: "Positive",
    growthRate: 12.5,
    demandLevel: "High",
    topSkills: ["React", "Node", "Blockchain"],
    keyTrends: [
      "AI Agents are growing fast",
      "Web3 adoption increasing",
      "Full Stack Engineers in demand",
    ],
    recommendedSkills: [
      "System Design",
      "Smart Contracts",
      "Cloud Deployment",
    ],
    salaryRanges: [
      { role: "Frontend", min: 50000, median: 80000, max: 120000 },
      { role: "Backend", min: 60000, median: 90000, max: 140000 },
      { role: "Full Stack", min: 70000, median: 110000, max: 160000 },
    ],
    lastUpdated: new Date(),
    nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  return <DashboardView insights={insights} />;
}