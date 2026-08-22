"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Menu {
  id: string;
  name: string;
}
interface Dropdown {
  menuList: Menu[];
  defaultMenu: string;
  onSelectValue?: (value: string) => void;
  selectedValue?: string;
  className?: string;
}

function Dropdown({
  menuList,
  defaultMenu,
  onSelectValue,
  selectedValue,
  className,
}: Dropdown) {
  const [internalValue, setInternalValue] = useState<string | null>(null);
  const displayValue = selectedValue !== undefined ? selectedValue : (internalValue || defaultMenu);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`group flex items-center justify-between border border-line bg-white px-3 py-2.5 text-[13.5px] text-body hover:bg-surface ${className}`}
      >
        <span>{displayValue}</span>
        <ChevronDown className="h-4 w-4 transition-transform duration-300 group-data-popup-open:rotate-180 group-data-open:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-(--anchor-width) bg-white"
      >
        {menuList.map((location) => (
          <DropdownMenuItem
            key={location.id}
            onClick={() => {
              if (onSelectValue) {
                onSelectValue(location.name);
              } else {
                setInternalValue(location.name);
              }
            }}
          >
            {location.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Dropdown;
