import type { LandlordPropertyItem, PropertyGroup, PropertyMembershipChange } from "@/types/landlord";

export function partitionProperties(groups: PropertyGroup[], properties: LandlordPropertyItem[]) {
  const byGroup = new Map(groups.map((group) => [group.id, [] as LandlordPropertyItem[]]));
  const ungrouped: LandlordPropertyItem[] = [];
  for (const property of properties) {
    const members = property.groupId ? byGroup.get(property.groupId) : undefined;
    (members ?? ungrouped).push(property);
  }
  return { byGroup, ungrouped };
}

export function applyMembershipChange(
  groups: PropertyGroup[],
  properties: LandlordPropertyItem[],
  { propertyIds, fromGroupId, toGroupId }: PropertyMembershipChange,
): { properties: LandlordPropertyItem[]; count: number } | { error: string } {
  const selected = new Set(propertyIds);
  if (!selected.size) return { error: "Select at least one property." };
  if (fromGroupId === toGroupId) return { error: "Choose a different destination group." };

  const { byGroup, ungrouped } = partitionProperties(groups, properties);
  const source = fromGroupId === null ? ungrouped : byGroup.get(fromGroupId);
  if (!source || (toGroupId !== null && !byGroup.has(toGroupId))) {
    return { error: "This group is no longer available. Review the available groups and try again." };
  }
  if (source.filter((property) => selected.has(property.id)).length !== selected.size) {
    return { error: "A selected property is no longer in this list. Review the available properties and try again." };
  }

  return {
    count: selected.size,
    properties: properties.map((property) => selected.has(property.id) ? { ...property, groupId: toGroupId } : property),
  };
}

export function summarizeGroup(members: LandlordPropertyItem[]) {
  function total(key: "totalUnits" | "occupiedUnits" | "expectedMonthlyRentRwf" | "collectedRentThisMonthRwf") {
    if (!members.length) return undefined;
    let sum = 0;
    for (const member of members) {
      const amount = member[key];
      if (typeof amount !== "number" || !Number.isFinite(amount)) return undefined;
      sum += amount;
    }
    return sum;
  }
  const allHaveUnits = members.every((member) => member.hasUnits);
  return {
    totalUnits: allHaveUnits ? total("totalUnits") : undefined,
    occupiedUnits: allHaveUnits ? total("occupiedUnits") : undefined,
    expected: total("expectedMonthlyRentRwf"),
    collected: total("collectedRentThisMonthRwf"),
  };
}
