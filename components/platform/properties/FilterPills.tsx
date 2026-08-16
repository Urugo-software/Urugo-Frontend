type FilterPillsProps = {
  options: string[];
  defaultSelected?: string;
};

function FilterPills({ options, defaultSelected }: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = option === defaultSelected;

        return (
          <button
            key={option}
            type="button"
            className={`rounded-full border px-3.5 py-1.5 text-[12.5px] ${
              isSelected
                ? "border-brand bg-brand-tint font-semibold text-brand"
                : "border-line text-body"
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
