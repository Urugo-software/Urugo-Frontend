import { SettingsSection } from "./SettingsSection";
import { ProfileInfoForm } from "./ProfileInfoForm";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { NotificationPreferences } from "./NotificationPreferences";

export function RenterSettingsView() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className=" max-w-7xl">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-ink sm:text-2xl">Settings</h2>
          <p className="mt-1 text-sm text-body">
            Manage your personal profile, account security, and rental alert
            preferences.
          </p>
        </div>

        <div className="space-y-10">
          <SettingsSection
            title="Personal Information"
            description="Update your photo, contact details, and emergency contact information."
          >
            <ProfileInfoForm />
          </SettingsSection>

          <SettingsSection
            title="Password & Security"
            description="Update your account password. Use at least 8 characters."
          >
            <ChangePasswordForm />
          </SettingsSection>

          <SettingsSection
            title="Notification Preferences"
            description="Choose which alerts and reminders you want to receive for your rental activity."
          >
            <NotificationPreferences />
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}
