import type { LandlordPropertyItem, PropertyGroup } from "@/types/landlord";

export function partitionProperties(groups: PropertyGroup[], properties: LandlordPropertyItem[]) {
  const byGroup = new Map(groups.map((group) => [group.id, [] as LandlordPropertyItem[]]));
  const ungrouped: LandlordPropertyItem[] = [];
  for (const property of properties) {
    const members = property.groupId ? byGroup.get(property.groupId) : undefined;
    (members ?? ungrouped).push(property);
  }
  return { byGroup, ungrouped };
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
