import type { ReactNode } from "react";
import { Ellipsis, Folder, ImagePlus, MapPin, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { PropertyGroup } from "@/types/landlord";
import type { GroupAction } from "../GroupCard";
import { PropertyCover } from "../PropertyCover";

interface GroupHeroHeaderProps {
  group: PropertyGroup;
  propertyCount: number;
  addPropertiesAction: ReactNode;
  onGroupAction: (action: GroupAction) => void;
}

export function GroupHeroHeader({
  group,
  propertyCount,
  addPropertiesAction,
  onGroupAction,
}: GroupHeroHeaderProps) {
  return (
    <section
      aria-labelledby="membership-heading"
      className="overflow-hidden border border-line bg-white shadow-2xs"
    >
      {group.coverImage && (
        <div className="relative h-40 w-full overflow-hidden border-b border-line bg-surface sm:h-48 md:h-56">
          <PropertyCover
            key={group.coverImage}
            src={group.coverImage}
            folder
            sizes="100vw"
            className="h-full w-full"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 to-transparent"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div className="min-w-0 space-y-2">
          <span className="inline-flex items-center gap-1.5 border border-line bg-surface px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-body">
            <Folder aria-hidden="true" className="size-3.5 text-faint" />
            Property Group
          </span>

          <h2
            id="membership-heading"
            tabIndex={-1}
            className="break-words text-2xl font-bold tracking-tight text-ink sm:text-3xl"
          >
            {group.name}
          </h2>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-body">
            {group.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="size-4 shrink-0 text-faint" />
                <span>{group.location}</span>
              </span>
            )}
            <span className="text-faint">
              {propertyCount} {propertyCount === 1 ? "property" : "properties"} assigned
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {addPropertiesAction}

          <DropdownMenu>
            <DropdownMenuTrigger
              id={`group-details-menu-${group.id}`}
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={`Manage ${group.name}`}
                  className="cursor-pointer rounded-none"
                >
                  <Ellipsis className="size-4" />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-auto min-w-44">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onGroupAction("rename")}
              >
                <Pencil className="size-4" /> Rename Group
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onGroupAction("cover")}
              >
                <ImagePlus className="size-4" /> Change Cover Image
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer"
                onClick={() => onGroupAction("delete")}
              >
                <Trash2 className="size-4" /> Delete Group
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  );
}
