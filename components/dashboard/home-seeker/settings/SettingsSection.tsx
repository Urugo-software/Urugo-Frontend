import { ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  danger?: boolean;
}

export function SettingsSection({
  title,
  description,
  children,
  danger,
}: SettingsSectionProps) {
  return (
    <section
      className={` border p-6 ${danger ? "border-destructive/30 bg-destructive/5" : "border-line bg-white"}`}
    >
      <h2
        className={`text-base font-bold ${danger ? "text-destructive" : "text-ink"}`}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-[14.5px] text-body">{description}</p>
      )}
      <div className="mt-3">{children}</div>
    </section>
  );
}
