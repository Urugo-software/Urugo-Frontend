import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, FolderOpen, ImagePlus, Pencil, Trash2 } from "lucide-react";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import type { LandlordPropertyItem, PropertyGroup } from "@/types/landlord";
import { summarizeGroup } from "@/utils/property-groups";
import { PortfolioCard, type ViewMode } from "./PortfolioCard";

export type GroupAction = "rename" | "cover" | "delete";

export function GroupCard({ group, members, mode, handle, membershipActions, onAction, onMove, first, last }: {
  group: PropertyGroup;
  members: LandlordPropertyItem[];
  mode: ViewMode;
  handle?: ReactNode;
  membershipActions: ReactNode;
  onAction: (action: GroupAction) => void;
  onMove?: (offset: number) => void;
  first: boolean;
  last: boolean;
}) {
  const { totalUnits, occupiedUnits, expected, collected } = summarizeGroup(members);
  return (
    <PortfolioCard name={group.name} location={group.location} cover={group.coverImage} folder mode={mode} tools={handle} menuId={`group-menu-${group.id}`}
      action={
        <Link href={`/landlord/properties/groups/${encodeURIComponent(group.id)}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
          <FolderOpen className="size-4" /> View Group
        </Link>
      }
      menu={<>
        {membershipActions}
        <DropdownMenuItem onClick={() => onAction("rename")}><Pencil /> Rename</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("cover")}><ImagePlus /> Change Cover Image</DropdownMenuItem>
        {onMove && <>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={first} onClick={() => onMove(-1)}><ArrowUp /> Move up</DropdownMenuItem>
          <DropdownMenuItem disabled={last} onClick={() => onMove(1)}><ArrowDown /> Move down</DropdownMenuItem>
        </>}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => onAction("delete")}><Trash2 /> Delete Group</DropdownMenuItem>
      </>}
    >
      <p className="font-medium text-ink">{members.length} {members.length === 1 ? "property" : "properties"}</p>
      <dl className="space-y-1 text-sm text-body">
        {totalUnits !== undefined && <div className="flex flex-wrap justify-between gap-x-2"><dt>{occupiedUnits === undefined ? "Total units" : "Units occupied"}</dt><dd>{occupiedUnits === undefined ? totalUnits : `${occupiedUnits} / ${totalUnits}`}</dd></div>}
        {expected !== undefined && <div className="flex flex-wrap justify-between gap-x-2"><dt>Expected monthly rent</dt><dd>{expected.toLocaleString("en-US")} RWF</dd></div>}
        {collected !== undefined && <div className="flex flex-wrap justify-between gap-x-2"><dt>Rent collected this month</dt><dd>{collected.toLocaleString("en-US")} RWF</dd></div>}
      </dl>
    </PortfolioCard>
  );
}
