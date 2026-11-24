import { create } from "zustand";
import {
  mockLandlordProperties,
  mockLandlordPropertyGroups,
  mockPropertyUnits,
} from "@/data/landlord-data";
import type {
  LandlordPropertyItem,
  PropertyGroup,
  PropertyMembershipChange,
  PropertyUnit,
} from "@/types/landlord";
import { applyMembershipChange } from "@/utils/property-groups";

type GroupDetails = Omit<PropertyGroup, "id">;
type PropertyDetails = Pick<
  LandlordPropertyItem,
  "name" | "location" | "type" | "hasUnits" | "expectedMonthlyRentRwf" | "groupId" | "image"
>;
type NewUnitInput = Omit<PropertyUnit, "id">;
type UnitChanges = Partial<Omit<PropertyUnit, "id" | "propertyId">>;

function syncPropertyUnitStats(
  properties: LandlordPropertyItem[],
  units: PropertyUnit[],
  propertyId: string,
): LandlordPropertyItem[] {
  const buildingUnits = units.filter((unit) => unit.propertyId === propertyId);
  const totalUnits = buildingUnits.length;
  const occupiedUnits = buildingUnits.filter(
    (unit) => unit.status === "Occupied" || Boolean(unit.renterId),
  ).length;
  const status: LandlordPropertyItem["status"] =
    occupiedUnits === 0 ? "Vacant" : occupiedUnits >= totalUnits ? "Occupied" : "Partial";

  return properties.map((property) =>
    property.id === propertyId && property.hasUnits
      ? { ...property, totalUnits, occupiedUnits, status }
      : property,
  );
}

interface LandlordPropertiesStore {
  groups: PropertyGroup[];
  properties: LandlordPropertyItem[];
  units: PropertyUnit[];
  createGroup: (details: GroupDetails) => PropertyGroup;
  updateGroup: (id: string, changes: Partial<GroupDetails>) => void;
  deleteGroup: (id: string) => void;
  moveGroup: (id: string, targetId: string) => void;
  changeMembership: (change: PropertyMembershipChange) => { count: number } | { error: string };
  saveProperty: (details: PropertyDetails, id?: string) => LandlordPropertyItem | undefined;
  addUnit: (details: NewUnitInput) => PropertyUnit;
  updateUnit: (id: string, changes: UnitChanges) => void;
}

export const useLandlordProperties = create<LandlordPropertiesStore>((set, get) => ({
  groups: mockLandlordPropertyGroups,
  properties: mockLandlordProperties,
  units: mockPropertyUnits,
  createGroup: (details) => {
    const group = { ...details, id: crypto.randomUUID() };
    set(({ groups }) => ({ groups: [...groups, group] }));
    return group;
  },
  updateGroup: (id, changes) =>
    set(({ groups }) => ({
      groups: groups.map((group) => (group.id === id ? { ...group, ...changes } : group)),
    })),
  deleteGroup: (id) =>
    set(({ groups, properties }) => ({
      groups: groups.filter((group) => group.id !== id),
      properties: properties.map((property) =>
        property.groupId === id ? { ...property, groupId: null } : property,
      ),
    })),
  moveGroup: (id, targetId) =>
    set((state) => {
      const from = state.groups.findIndex((group) => group.id === id);
      const to = state.groups.findIndex((group) => group.id === targetId);
      if (from < 0 || to < 0 || from === to) return state;
      const groups = [...state.groups];
      const [group] = groups.splice(from, 1);
      groups.splice(to, 0, group);
      return { groups };
    }),
  changeMembership: (change) => {
    const { groups, properties } = get();
    const result = applyMembershipChange(groups, properties, change);
    if ("error" in result) return result;
    set({ properties: result.properties });
    return { count: result.count };
  },
  saveProperty: (details, id) => {
    const { groups, properties } = get();
    if (details.groupId && !groups.some((group) => group.id === details.groupId)) return;
    const existing = id ? properties.find((property) => property.id === id) : undefined;
    if (id && !existing) return;
    const property: LandlordPropertyItem = {
      ...existing,
      ...details,
      groupId: details.groupId || null,
      status: existing?.status ?? "Vacant",
      id: id ?? crypto.randomUUID(),
    };
    set({
      properties: existing
        ? properties.map((item) => (item.id === id ? property : item))
        : [...properties, property],
    });
    return property;
  },
  addUnit: (details) => {
    const unit: PropertyUnit = { ...details, id: crypto.randomUUID() };
    set(({ units, properties }) => {
      const nextUnits = [...units, unit];
      return {
        units: nextUnits,
        properties: syncPropertyUnitStats(properties, nextUnits, unit.propertyId),
      };
    });
    return unit;
  },
  updateUnit: (id, changes) =>
    set(({ units, properties }) => {
      const target = units.find((unit) => unit.id === id);
      if (!target) return { units, properties };
      const nextUnits = units.map((unit) => (unit.id === id ? { ...unit, ...changes } : unit));
      return {
        units: nextUnits,
        properties: syncPropertyUnitStats(properties, nextUnits, target.propertyId),
      };
    }),
}));
