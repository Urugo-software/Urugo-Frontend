"use client";

import { useState, type ReactNode } from "react";
import { GripVertical } from "lucide-react";
import { useTranslations } from "next-intl";
import type { LandlordPropertyItem, PropertyGroup } from "@/types/landlord";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { GroupCard, type GroupAction } from "./GroupCard";
import { cardLayout, type ViewMode } from "./PortfolioCard";

export function GroupList({ groups, byGroup, mode, reorderable, onAction, renderMembershipActions }: {
  groups: PropertyGroup[];
  byGroup: Map<string, LandlordPropertyItem[]>;
  mode: ViewMode;
  reorderable: boolean;
  onAction: (group: PropertyGroup, action: GroupAction) => void;
  renderMembershipActions: (group: PropertyGroup, memberCount: number) => ReactNode;
}) {
  const t = useTranslations("landlord.properties.groups");
  const moveGroup = useLandlordProperties((state) => state.moveGroup);
  const [dragged, setDragged] = useState<string | null>(null);
  const [target, setTarget] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const canMove = reorderable && groups.length > 1;
  const from = groups.findIndex((group) => group.id === dragged);

  function move(group: PropertyGroup, index: number) {
    if (!canMove || !groups[index]) return;
    moveGroup(group.id, groups[index].id);
    setAnnouncement(
      t("movedAnnouncement", {
        name: group.name,
        position: index + 1,
        total: groups.length,
      }),
    );
  }

  function endDrag() {
    setDragged(null);
    setTarget(null);
  }

  return (
    <>
      <ol className={cardLayout(mode)} aria-label={t("groupOrderAria")}>
        {groups.map((group, index) => {
          const members = byGroup.get(group.id) ?? [];
          const isTarget = canMove && dragged !== null && dragged !== group.id && target === group.id;
          return (
            <li key={group.id} className={`relative min-w-0 ${isTarget ? "outline-2 outline-offset-2 outline-brand-blue" : ""}`}
              onDragOver={(event) => {
                if (!canMove || from < 0) return;
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
                setTarget(group.id);
              }}
              onDragLeave={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setTarget(null);
              }}
              onDrop={(event) => {
                if (from < 0 || !canMove) return;
                event.preventDefault();
                if (from !== index) move(groups[from], index);
                endDrag();
              }}
            >
              {isTarget && <span className="pointer-events-none absolute right-2 top-2 z-10 rounded bg-brand-blue px-2 py-1 text-xs font-medium text-white">{from < index ? t("dropAfter") : t("dropBefore")}</span>}
              <GroupCard group={group} members={members} mode={mode}
                membershipActions={renderMembershipActions(group, members.length)}
                first={index === 0} last={index === groups.length - 1}
                onAction={(action) => onAction(group, action)}
                onMove={canMove ? (offset) => move(group, index + offset) : undefined}
                handle={canMove && (
                  <span draggable aria-hidden="true" title={t("dragHandleTitle")}
                    className="inline-flex size-8 cursor-grab items-center justify-center rounded bg-white text-body shadow active:cursor-grabbing"
                    onDragStart={(event) => {
                      event.dataTransfer.effectAllowed = "move";
                      event.dataTransfer.setData("text/plain", group.id);
                      setDragged(group.id);
                    }}
                    onDragEnd={endDrag}
                  ><GripVertical className="pointer-events-none size-4" /></span>
                )}
              />
            </li>
          );
        })}
      </ol>
      <p role="status" className="sr-only">{announcement}</p>
    </>
  );
}
