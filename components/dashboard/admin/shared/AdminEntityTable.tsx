"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { FolderSearch } from "lucide-react";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { Pagination } from "@/components/shared/Pagination";
import { paginateItems } from "@/utils/pagination";

export interface AdminTableColumn<T> {
  key: string;
  header: string;
  render: (item: T) => ReactNode;
  className?: string;
}

interface AdminEntityTableProps<T> {
  items: readonly T[];
  columns: AdminTableColumn<T>[];
  getRowKey: (item: T) => string;
  pageSize?: number;
  itemLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: LucideIcon;
  onResetEmpty?: () => void;
  resetLabel?: string;
}

export function AdminEntityTable<T>({
  items,
  columns,
  getRowKey,
  pageSize = 6,
  itemLabel,
  emptyTitle = "No matching records",
  emptyDescription = "Adjust your search or filters to view matching items.",
  emptyIcon = FolderSearch,
  onResetEmpty,
  resetLabel = "Reset",
}: AdminEntityTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const { items: visible, page, totalPages, totalItems } = paginateItems(
    items,
    currentPage,
    pageSize,
  );

  if (items.length === 0) {
    return (
      <EmptyStateBox
        icon={emptyIcon}
        title={emptyTitle}
        description={emptyDescription}
        action={
          onResetEmpty ? (
            <button
              type="button"
              onClick={onResetEmpty}
              className="cursor-pointer border border-line bg-ink px-4 py-2 text-xs font-semibold text-white hover:bg-ink/90"
            >
              {resetLabel}
            </button>
          ) : undefined
        }
      />
    );
  }

  return (
    <div>
      <div className="overflow-x-auto border border-line bg-white shadow-2xs">
        <table className="w-full min-w-[760px] text-left">
          <thead className="border-b border-line bg-surface/70 text-xs font-semibold uppercase tracking-wider text-faint">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={`px-4 py-3.5 ${col.className ?? ""}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {visible.map((item) => (
              <tr
                key={getRowKey(item)}
                className="text-sm transition-colors hover:bg-surface/40"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3.5 align-middle ${col.className ?? ""}`}
                  >
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        itemsPerPage={pageSize}
        itemLabel={itemLabel}
      />
    </div>
  );
}
