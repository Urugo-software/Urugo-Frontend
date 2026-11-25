"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, FolderOpen, ImagePlus, Pencil, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
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
  const t = useTranslations("landlord.properties.groups");
  const locale = useLocale() as AppLocale;
  const { totalUnits, occupiedUnits, expected, collected } = summarizeGroup(members);
  return (
    <PortfolioCard name={group.name} location={group.location} cover={group.coverImage} folder mode={mode} tools={handle} menuId={`group-menu-${group.id}`}
      action={
        <Link href={`/landlord/properties/groups/${encodeURIComponent(group.id)}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
          <FolderOpen className="size-4" /> {t("viewGroup")}
        </Link>
      }
      menu={<>
        {membershipActions}
        <DropdownMenuItem onClick={() => onAction("rename")}><Pencil /> {t("rename")}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAction("cover")}><ImagePlus /> {t("changeCoverImage")}</DropdownMenuItem>
        {onMove && <>
          <DropdownMenuSeparator />
          <DropdownMenuItem disabled={first} onClick={() => onMove(-1)}><ArrowUp /> {t("moveUp")}</DropdownMenuItem>
          <DropdownMenuItem disabled={last} onClick={() => onMove(1)}><ArrowDown /> {t("moveDown")}</DropdownMenuItem>
        </>}
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => onAction("delete")}><Trash2 /> {t("deleteGroup")}</DropdownMenuItem>
      </>}
    >
      <p className="font-medium text-ink">
        {t(members.length === 1 ? "propertyCountSingle" : "propertyCountPlural", { count: members.length })}
      </p>
      <dl className="space-y-1 text-sm text-body">
        {totalUnits !== undefined && <div className="flex flex-wrap justify-between gap-x-2"><dt>{occupiedUnits === undefined ? t("totalUnits") : t("unitsOccupied")}</dt><dd>{occupiedUnits === undefined ? totalUnits : `${occupiedUnits} / ${totalUnits}`}</dd></div>}
        {expected !== undefined && <div className="flex flex-wrap justify-between gap-x-2"><dt>{t("expectedMonthlyRent")}</dt><dd>{formatRwfLocalized(expected, locale)}</dd></div>}
        {collected !== undefined && <div className="flex flex-wrap justify-between gap-x-2"><dt>{t("rentCollectedThisMonth")}</dt><dd>{formatRwfLocalized(collected, locale)}</dd></div>}
      </dl>
    </PortfolioCard>
  );
}
