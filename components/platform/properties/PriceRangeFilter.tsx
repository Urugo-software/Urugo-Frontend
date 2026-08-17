"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

function PriceRangeFilter() {
  const [minPrice, setMinPrice] = useState("Min");
  const [maxPrice, setMaxPrice] = useState("Max");

  return (
    <div className="flex gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger className="group flex flex-1 items-center justify-between border border-line px-3 py-2.5 text-[13.5px] text-body">
          <span>{minPrice}</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-popup-open:rotate-180 group-data-open:rotate-180" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-(--anchor-width) bg-white">
          <DropdownMenuItem onClick={() => setMinPrice("Min")}>
            Min
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMinPrice("50,000")}>
            50,000
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMinPrice("100,000")}>
            100,000
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMinPrice("150,000")}>
            150,000
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="group flex flex-1 items-center justify-between border border-line px-3 py-2.5 text-[13.5px] text-body">
          <span>{maxPrice}</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-popup-open:rotate-180 group-data-open:rotate-180" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-(--anchor-width) bg-white"
        >
          <DropdownMenuItem onClick={() => setMaxPrice("150,000")}>
            150,000
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMaxPrice("250,000")}>
            250,000
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setMaxPrice("400,000+")}>
            400,000+
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default PriceRangeFilter;
