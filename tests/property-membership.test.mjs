import assert from "node:assert/strict";
import test from "node:test";
import { applyMembershipChange, partitionProperties } from "../utils/property-groups.ts";

const groups = [{ id: "a", name: "First group" }, { id: "b", name: "Second group" }];
const details = { name: "House", location: "Kigali", type: "HOUSE", hasUnits: false };
const properties = [
  { ...details, id: "legacy" },
  { ...details, id: "unassigned", groupId: null },
  { ...details, id: "orphan", groupId: "old-group" },
  { ...details, id: "occupied", groupId: "a", totalUnits: 3, occupiedUnits: 2, monthlyRevenueRwf: 450000 },
];

test("a bulk add assigns each ungrouped property once, including legacy records", () => {
  const result = applyMembershipChange(groups, properties, {
    propertyIds: ["legacy", "unassigned", "orphan", "legacy"], fromGroupId: null, toGroupId: "b",
  });
  assert.equal(result.count, 3);
  assert.deepEqual(result.properties.map((property) => property.id), properties.map((property) => property.id));
  const { byGroup, ungrouped } = partitionProperties(groups, result.properties);
  assert.deepEqual(byGroup.get("b").map((property) => property.id), ["legacy", "unassigned", "orphan"]);
  assert.equal(ungrouped.length, 0);
  assert.equal(result.properties[3], properties[3]);
});

test("a stale or missing member rejects the entire batch", () => {
  for (const id of ["occupied", "missing"]) {
    const result = applyMembershipChange(groups, properties, {
      propertyIds: ["legacy", id], fromGroupId: null, toGroupId: "b",
    });
    assert.ok(result.error);
    assert.equal(result.properties, undefined);
    assert.equal(properties[0].groupId, undefined);
    assert.equal(properties[3].groupId, "a");
  }
});

test("move and remove preserve the property and its data, and reject stale retries", () => {
  const move = { propertyIds: ["occupied"], fromGroupId: "a", toGroupId: "b" };
  const moved = applyMembershipChange(groups, properties, move);
  assert.deepEqual(moved.properties[3], { ...properties[3], groupId: "b" });
  assert.ok(applyMembershipChange(groups, moved.properties, move).error);
  const removed = applyMembershipChange(groups, moved.properties, { ...move, fromGroupId: "b", toGroupId: null });
  assert.deepEqual(removed.properties, properties.map((property) =>
    property.id === "occupied" ? { ...property, groupId: null } : property,
  ));
  const { byGroup, ungrouped } = partitionProperties(groups, removed.properties);
  assert.equal(ungrouped.length, properties.length);
  assert.equal(byGroup.get("b").length, 0);
});

test("rejects an empty selection, a missing source or destination, and a move to the current group", () => {
  const move = { propertyIds: ["occupied"], fromGroupId: "a", toGroupId: "b" };
  for (const change of [{ propertyIds: [] }, { fromGroupId: "missing" }, { toGroupId: "missing" }, { toGroupId: "a" }]) {
    assert.ok(applyMembershipChange(groups, properties, { ...move, ...change }).error);
  }
});
