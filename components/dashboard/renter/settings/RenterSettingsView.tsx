"use client";

import React from "react";
import { ProfileInfoForm } from "./ProfileInfoForm";

export function RenterSettingsView() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-ink sm:text-2xl">Account Settings</h2>
        <p className="text-xs text-body mt-1">Manage your profile details and preferences.</p>
      </div>

      <ProfileInfoForm />
    </div>
  );
}
