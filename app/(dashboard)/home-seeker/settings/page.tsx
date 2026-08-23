import { SettingsPanel } from "@/components/dashboard/home-seeker/settings/SettingsPanel";
export default function SettingsPage() {
  return (
    <main className="flex-1 overflow-y-auto p-6 pb-16 sm:p-8 md:p-10">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-ink">Settings</h2>
        <p className="mt-1 mb-7 text-sm text-body">
          Manage your account and notification preferences.
        </p>
        <SettingsPanel />
      </div>
    </main>
  );
}
