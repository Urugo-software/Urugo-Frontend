"use client";

import { useState } from "react";
import { FolderInput, FolderMinus, FolderPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import type { LandlordPropertyItem, PropertyGroup } from "@/types/landlord";
import { MembershipDialog, type MembershipRequest } from "./MembershipDialog";

export function useMembershipControls() {
  const t = useTranslations("landlord.properties.membership");
  const groups = useLandlordProperties((state) => state.groups);
  const [request, open] = useState<MembershipRequest | null>(null);

  function memberItems(fromGroupId: string, returnFocusId: string, propertyId?: string) {
    const source = { fromGroupId, propertyId, returnFocusId };
    return <>
      <DropdownMenuItem className="cursor-pointer" onClick={() => open({ kind: "move", ...source })}>
        <FolderInput /> {t("labels.move")}
      </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer" onClick={() => open({ kind: "remove", ...source })}>
        <FolderMinus /> {t("labels.remove")}
      </DropdownMenuItem>
    </>;
  }

  function groupMenu(group: PropertyGroup, memberCount: number) {
    const returnFocusId = `group-menu-${group.id}`;
    return <>
      <DropdownMenuGroup>
        <DropdownMenuLabel>{t("propertiesMenuLabel")}</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer" onClick={() => open({ kind: "add", toGroupId: group.id, returnFocusId })}>
          <FolderPlus /> {t("labels.add")}
        </DropdownMenuItem>
        {memberCount > 0 && memberItems(group.id, returnFocusId)}
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
    </>;
  }

  function propertyMenu(property: LandlordPropertyItem) {
    const returnFocusId = `property-menu-${property.id}`;
    const source = groups.find((group) => group.id === property.groupId);
    if (source) return memberItems(source.id, returnFocusId, property.id);
    if (!groups.length) return undefined;
    return (
      <DropdownMenuItem className="cursor-pointer" onClick={() => open({ kind: "add", propertyId: property.id, returnFocusId })}>
        <FolderPlus /> {t("addToGroup")}
      </DropdownMenuItem>
    );
  }

  function addButton(group: PropertyGroup) {
    const id = `add-properties-${group.id}`;
    return (
      <Button id={id} variant="outline" className="cursor-pointer rounded-none" onClick={() => open({ kind: "add", toGroupId: group.id, returnFocusId: id })}>
        <FolderPlus /> {t("labels.add")}
      </Button>
    );
  }

  return { groupMenu, propertyMenu, addButton, dialog: request && <MembershipDialog request={request} onClose={() => open(null)} /> };
}
