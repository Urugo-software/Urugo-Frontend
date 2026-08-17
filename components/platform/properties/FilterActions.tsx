"use client";

import { motion } from "framer-motion";

function FilterActions() {
  return (
    <div className="mt-5.5 flex flex-col gap-2">
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full rounded-full bg-brand hover:bg-brand-deep cursor-pointer duration-300 px-4.5 py-2.5 text-[13.5px] font-semibold text-white shadow-xs"
      >
        Apply Filters
      </motion.button>

      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full hover:bg-brand hover:text-white duration-300 cursor-pointer rounded-full border border-line px-4.5 py-2.5 text-[13.5px] font-semibold text-body"
      >
        Reset Filters
      </motion.button>
    </div>
  );
}

export default FilterActions;
