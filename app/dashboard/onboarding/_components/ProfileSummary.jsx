// app/dashboard/_components/ProfileSummary.jsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getUserProfile } from "@/actions/user";

export default function ProfileSummary({ user }) {
  if (!user) return null;

  return (
    <Card className="mt-6 shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Industry:</strong> {user.industry}</p>
        <p><strong>Experience:</strong> {user.experience} years</p>
        <p><strong>Skills:</strong> {user.skills}</p>
        <p><strong>Bio:</strong> {user.bio}</p>
      </CardContent>
    </Card>
  );
}
