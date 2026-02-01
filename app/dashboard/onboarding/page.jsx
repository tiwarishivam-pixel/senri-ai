import React from 'react';
import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";
import { getUserOnboardingStatus, getUserProfile } from "@/actions/user";

import ProfileSummary from "./_components/ProfileSummary";



const OnboardingPage = async() => {
    // Check if user is already onboarded
  const { isOnboarded } = await getUserOnboardingStatus();
  
    const user = await getUserProfile();


  // if (isOnboarded) {
  //   redirect("/dashboard/interview/mock");
  // }

  return (
    <main>
      <OnboardingForm industries={industries} />
      {/* <h1 className="text-3xl font-bold">Welcome to Dashboard</h1> */}
      {/* <ProfileSummary user={user} /> */}
    </main>
  )
}

export default OnboardingPage