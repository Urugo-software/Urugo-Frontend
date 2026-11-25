"use client";

import { Pagination } from "@/components/shared/Pagination";

interface PropertyPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export default function PropertyPagination(props: PropertyPaginationProps) {
  return <Pagination {...props} itemLabel="properties" />;
}
