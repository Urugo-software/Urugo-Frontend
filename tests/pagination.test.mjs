import assert from "node:assert/strict";
import test from "node:test";
import { getPaginationRange, paginateItems } from "../utils/pagination.ts";

test("slices items accurately across pages and reports range bounds", () => {
  const items = Array.from({ length: 10 }, (_, i) => `r-${i + 1}`);

  const page1 = paginateItems(items, 1, 6);
  assert.deepEqual(page1, {
    items: ["r-1", "r-2", "r-3", "r-4", "r-5", "r-6"],
    page: 1,
    totalPages: 2,
    totalItems: 10,
    startItem: 1,
    endItem: 6,
  });

  const page2 = paginateItems(items, 2, 6);
  assert.deepEqual(page2, {
    items: ["r-7", "r-8", "r-9", "r-10"],
    page: 2,
    totalPages: 2,
    totalItems: 10,
    startItem: 7,
    endItem: 10,
  });
});

test("clamps out-of-range page numbers and handles empty lists safely", () => {
  const items = ["a", "b", "c"];

  assert.equal(paginateItems(items, 0, 2).page, 1);
  assert.equal(paginateItems(items, -5, 2).page, 1);
  assert.equal(paginateItems(items, 99, 2).page, 2);
  assert.deepEqual(paginateItems(items, 99, 2).items, ["c"]);

  assert.deepEqual(paginateItems([], 3, 6), {
    items: [],
    page: 1,
    totalPages: 1,
    totalItems: 0,
    startItem: 0,
    endItem: 0,
  });
});

test("returns full page list up to 7 pages and compact ellipsis windows beyond 7 pages", () => {
  assert.deepEqual(getPaginationRange(1, 2), [1, 2]);
  assert.deepEqual(getPaginationRange(3, 7), [1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(getPaginationRange(1, 12), [1, 2, 3, 4, 5, "ellipsis", 12]);
  assert.deepEqual(getPaginationRange(4, 12), [1, 2, 3, 4, 5, "ellipsis", 12]);
  assert.deepEqual(getPaginationRange(6, 12), [
    1,
    "ellipsis",
    5,
    6,
    7,
    "ellipsis",
    12,
  ]);
  assert.deepEqual(getPaginationRange(9, 12), [
    1,
    "ellipsis",
    8,
    9,
    10,
    11,
    12,
  ]);
  assert.deepEqual(getPaginationRange(12, 12), [
    1,
    "ellipsis",
    8,
    9,
    10,
    11,
    12,
  ]);
});
