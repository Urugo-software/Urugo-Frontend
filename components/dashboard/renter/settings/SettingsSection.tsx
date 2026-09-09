interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function SettingsSection({ title, description, children }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 border-b border-line pb-10 lg:grid-cols-3">
      <div className="lg:pr-6">
        <h3 className="text-[15px] font-bold text-ink">{title}</h3>
        <p className="mt-1 text-[13.5px] text-body leading-relaxed">
          {description}
        </p>
      </div>
      <div className="lg:col-span-2">{children}</div>
    </div>
  );
}
