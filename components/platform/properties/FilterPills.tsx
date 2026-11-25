"use client";

interface FilterPillsProps {
  options: readonly string[];
  selected: string | string[];
  multiSelect?: boolean;
  onSelect: (option: string) => void;
}

function FilterPills({
  options,
  selected,
  multiSelect = false,
  onSelect,
}: FilterPillsProps) {
  const isOptionSelected = (option: string) =>
    Array.isArray(selected) ? selected.includes(option) : selected === option;

  return (
    <div
      role="group"
      aria-label={multiSelect ? "Select one or more options" : "Select an option"}
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => {
        const active = isOptionSelected(option);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(option)}
            className={`cursor-pointer select-none rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors duration-150 ${
              active
                ? "border-brand bg-brand-tint font-semibold text-brand"
                : "border-line bg-white text-body hover:border-brand/40 hover:text-ink"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default FilterPills;
