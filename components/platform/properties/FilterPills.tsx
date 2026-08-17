"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type FilterPillsProps = {
  options: string[];
  defaultSelected?: string;
  onSelect?: (option: string) => void;
};

function FilterPills({ options, defaultSelected, onSelect }: FilterPillsProps) {
  const [selected, setSelected] = useState(defaultSelected || options[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    if (onSelect) onSelect(option);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = option === selected;

        return (
          <motion.button
            key={option}
            type="button"
            onClick={() => handleSelect(option)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`relative rounded-full border px-3.5 py-1.5 text-[12.5px] cursor-pointer transition-colors duration-200 select-none ${
              isSelected
                ? "border-brand bg-brand-tint font-semibold text-brand shadow-2xs"
                : "border-line text-body hover:border-brand/40 hover:text-ink bg-white"
            }`}
          >
            {option}
          </motion.button>
        );
      })}
    </div>
  );
}

export default FilterPills;
