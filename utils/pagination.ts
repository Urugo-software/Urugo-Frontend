export type PaginationToken = number | "ellipsis";

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
  startItem: number;
  endItem: number;
}

export function paginateItems<T>(
  items: readonly T[],
  currentPage: number,
  itemsPerPage: number,
): PaginatedResult<T> {
  const safePerPage = Math.max(1, Math.floor(itemsPerPage));
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePerPage));
  const page = Math.min(Math.max(1, Math.floor(currentPage) || 1), totalPages);

  if (totalItems === 0) {
    return {
      items: [],
      page: 1,
      totalPages: 1,
      totalItems: 0,
      startItem: 0,
      endItem: 0,
    };
  }

  const startIndex = (page - 1) * safePerPage;
  const endIndex = Math.min(startIndex + safePerPage, totalItems);

  return {
    items: items.slice(startIndex, endIndex),
    page,
    totalPages,
    totalItems,
    startItem: startIndex + 1,
    endItem: endIndex,
  };
}

export function getPaginationRange(
  currentPage: number,
  totalPages: number,
): PaginationToken[] {
  if (totalPages <= 1) return totalPages === 1 ? [1] : [];

  const safePage = Math.min(Math.max(1, Math.floor(currentPage) || 1), totalPages);

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (safePage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }

  if (safePage >= totalPages - 3) {
    return [
      1,
      "ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis",
    safePage - 1,
    safePage,
    safePage + 1,
    "ellipsis",
    totalPages,
  ];
}
