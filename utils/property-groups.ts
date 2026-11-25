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
  if (!members.length) {
    return {
      totalUnits: undefined,
      occupiedUnits: undefined,
      expected: undefined,
      collected: undefined,
    };
  }

  let totalUnits = 0;
  let occupiedUnits = 0;
  let expected = 0;
  let hasExpected = false;
  let collected = 0;
  let hasCollected = false;

  for (const member of members) {
    if (member.hasUnits) {
      totalUnits += member.totalUnits ?? 0;
      occupiedUnits += member.occupiedUnits ?? 0;
    } else {
      totalUnits += 1;
      if (member.status === "Occupied") occupiedUnits += 1;
    }

    const expectedVal = member.expectedMonthlyRentRwf ?? member.monthlyRevenueRwf;
    if (typeof expectedVal === "number" && Number.isFinite(expectedVal)) {
      expected += expectedVal;
      hasExpected = true;
    }

    if (
      typeof member.collectedRentThisMonthRwf === "number" &&
      Number.isFinite(member.collectedRentThisMonthRwf)
    ) {
      collected += member.collectedRentThisMonthRwf;
      hasCollected = true;
    }
  }

  return {
    totalUnits: totalUnits > 0 ? totalUnits : undefined,
    occupiedUnits: totalUnits > 0 ? occupiedUnits : undefined,
    expected: hasExpected ? expected : undefined,
    collected: hasCollected ? collected : undefined,
  };
}
