"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });

export const generateAIInsights = async (industry) => {
  const prompt = `Analyze ${industry} industry. Return ONLY this JSON:
{
  "salaryRanges": [
    {"role": "Entry Level", "min": 40000, "max": 60000, "median": 50000, "location": "US"},
    {"role": "Mid Level", "min": 60000, "max": 90000, "median": 75000, "location": "US"},
    {"role": "Senior Level", "min": 90000, "max": 130000, "median": 110000, "location": "US"},
    {"role": "Lead/Manager", "min": 120000, "max": 180000, "median": 150000, "location": "US"},
    {"role": "Director+", "min": 150000, "max": 250000, "median": 200000, "location": "US"}
  ],
  "growthRate": 8.5,
  "demandLevel": "High",
  "topSkills": ["Leadership", "Communication", "Problem Solving", "Technology", "Analytics"],
  "marketOutlook": "Positive",
  "keyTrends": ["Digital transformation", "Remote work", "AI integration", "Sustainability"],
  "recommendedSkills": ["Data Analysis", "Project Management", "Digital Marketing", "Cloud Computing"]
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    const insights = JSON.parse(cleanedText);

    // Ensure the demandLevel is capitalized correctly
    if (insights.demandLevel) {
      insights.demandLevel = insights.demandLevel.toUpperCase();
    }

    // Ensure the marketOutlook is capitalized correctly
    if (insights.marketOutlook) {
      insights.marketOutlook = insights.marketOutlook.toUpperCase();
    }

    return insights;
  } catch (error) {
    console.error("Error generating AI insights:", error);
    throw error;
  }
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  // If no insights exist, generate them
  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  return user.industryInsight;
}