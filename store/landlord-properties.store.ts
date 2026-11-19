import { create } from "zustand";
import { mockLandlordProperties, mockLandlordPropertyGroups } from "@/data/landlord-data";
import type { LandlordPropertyItem, PropertyGroup } from "@/types/landlord";

type GroupDetails = Omit<PropertyGroup, "id">;
type PropertyDetails = Pick<LandlordPropertyItem, "name" | "location">;

interface LandlordPropertiesStore {
  groups: PropertyGroup[];
  properties: LandlordPropertyItem[];
  createGroup: (details: GroupDetails) => PropertyGroup;
  updateGroup: (id: string, changes: Partial<GroupDetails>) => void;
  deleteGroup: (id: string) => void;
  moveGroup: (id: string, targetId: string) => void;
  updateProperty: (id: string, details: PropertyDetails) => void;
}

export const useLandlordProperties = create<LandlordPropertiesStore>((set) => ({
  groups: mockLandlordPropertyGroups,
  properties: mockLandlordProperties,
  createGroup: (details) => {
    const group = { ...details, id: crypto.randomUUID() };
    set(({ groups }) => ({ groups: [...groups, group] }));
    return group;
  },
  updateGroup: (id, changes) => set(({ groups }) => ({
    groups: groups.map((group) => group.id === id ? { ...group, ...changes } : group),
  })),
  deleteGroup: (id) => set(({ groups, properties }) => ({
    groups: groups.filter((group) => group.id !== id),
    properties: properties.map((property) => property.groupId === id ? { ...property, groupId: null } : property),
  })),
  moveGroup: (id, targetId) => set((state) => {
    const from = state.groups.findIndex((group) => group.id === id);
    const to = state.groups.findIndex((group) => group.id === targetId);
    if (from < 0 || to < 0 || from === to) return state;
    const groups = [...state.groups];
    const [group] = groups.splice(from, 1);
    groups.splice(to, 0, group);
    return { groups };
  }),
  updateProperty: (id, details) => set(({ properties }) => ({
    properties: properties.map((property) => property.id === id ? { ...property, ...details } : property),
  })),
}));
