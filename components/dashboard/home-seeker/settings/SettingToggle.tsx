interface ToggleProps {
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}

export function SettingToggle({ checked, disabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked ? "bg-brand" : "bg-line"} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      <span
        className={`absolute top-1 size-4 rounded-full bg-white transition ${checked ? "left-6" : "left-1"}`}
      />
    </button>
  );
}