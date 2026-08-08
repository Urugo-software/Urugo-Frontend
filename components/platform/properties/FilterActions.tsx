function FilterActions() {
  return (
    <div className="mt-5.5 flex flex-col gap-2">
      <button
        type="button"
        className="w-full rounded-full bg-brand px-4.5 py-2.5 text-[13.5px] font-semibold text-white"
      >
        Apply Filters
      </button>

      <button
        type="button"
        className="w-full rounded-full border border-line px-4.5 py-2.5 text-[13.5px] font-semibold text-body"
      >
        Reset Filters
      </button>
    </div>
  );
}

export default FilterActions;
