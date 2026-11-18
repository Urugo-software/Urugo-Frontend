import type { ReactNode } from "react";
import { Ellipsis, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { PropertyCover } from "./PropertyCover";

export type ViewMode = "grid" | "list";

export function cardLayout(mode: ViewMode) {
  return mode === "grid" ? "grid gap-5 md:grid-cols-2 xl:grid-cols-3" : "grid gap-4";
}

export function PortfolioCard({ name, location, cover, folder, mode, tools, action, menu, menuId, children }: {
  name: string;
  location?: string;
  cover?: string;
  folder?: boolean;
  mode: ViewMode;
  tools?: ReactNode;
  action: ReactNode;
  menu: ReactNode;
  menuId?: string;
  children: ReactNode;
}) {
  return (
    <Card className={cn("h-full min-w-0 gap-0 rounded-none border border-line bg-white py-0 shadow-2xs ring-0", mode === "list" && "sm:flex-row")}>
      <div className={cn("relative", mode === "list" && "sm:w-48 sm:shrink-0")}>
        <PropertyCover src={cover} folder={folder} className={mode === "list" ? "sm:h-full sm:min-h-36" : undefined} />
        {tools && <div className="absolute left-3 top-3">{tools}</div>}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex-1 space-y-3 p-4">
          <h3 className="break-words text-lg font-semibold leading-tight text-ink">{name}</h3>
          {location && <p className="flex items-start gap-1.5 text-sm text-body"><MapPin className="mt-0.5 size-4 shrink-0" />{location}</p>}
          {children}
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-line bg-surface/40 px-4 py-2">
          {action}
          <DropdownMenu>
            <DropdownMenuTrigger id={menuId} render={<Button variant="ghost" size="icon" aria-label={`Actions for ${name}`}><Ellipsis /></Button>} />
            <DropdownMenuContent align="end" className="w-auto min-w-44">{menu}</DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
