import { SettingsSection } from "./SettingsSection";
import { ProfileInfoForm } from "./ProfileInfoForm";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { NotificationPreferences } from "./NotificationPreferences";

export function RenterSettingsView() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-ink sm:text-2xl">Settings</h2>
          <p className="text-[15px] text-body mt-1">
            Manage your profile, security, and notification preferences.
          </p>
        </div>

        <div className="space-y-10">
          <SettingsSection
            title="Personal Information"
            description="Update your display name, email address, and phone number used for contact and notifications."
          >
            <ProfileInfoForm />
          </SettingsSection>

          <SettingsSection
            title="Password & Security"
            description="Change your account password. Use a strong password you do not use elsewhere."
          >
            <ChangePasswordForm />
          </SettingsSection>

          <SettingsSection
            title="Notifications"
            description="Choose which alerts and reminders you want to receive for your rental activity."
          >
            <NotificationPreferences />
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}
