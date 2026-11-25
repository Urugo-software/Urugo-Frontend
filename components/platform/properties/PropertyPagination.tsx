"use client";

import { useTranslations } from "next-intl";

import { Pagination } from "@/components/shared/Pagination";

interface PropertyPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export default function PropertyPagination(props: PropertyPaginationProps) {
  const t = useTranslations("properties");
  return <Pagination {...props} itemLabel={t("paginationLabel")} />;
}
