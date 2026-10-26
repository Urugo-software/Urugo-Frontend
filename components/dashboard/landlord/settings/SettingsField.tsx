interface SettingsFieldProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export function SettingsField({ label, value, onChange, placeholder, type = "text" }: SettingsFieldProps) {
  return (
    <label className="block space-y-2 text-sm font-medium text-ink">
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line bg-white px-3.5 py-3 text-sm font-normal text-ink outline-none transition placeholder:text-faint focus:border-brand focus:ring-4 focus:ring-brand/10"
      />
    </label>
  );
}
