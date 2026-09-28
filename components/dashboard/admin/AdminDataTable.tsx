"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { AdminColumn, AdminRow } from "@/data/admin-dashboard-data";
import { AdminStatusTag } from "./AdminStatusTag";

type FilterOption = { key: string; label: string };
const PAGE_SIZE = 5;

export function AdminDataTable({ columns, rows, filters = [], detailPath }: { columns: AdminColumn[]; rows: AdminRow[]; filters?: FilterOption[]; detailPath?: string }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [sortKey, setSortKey] = useState(columns[0]?.key || "");
  const [ascending, setAscending] = useState(true);
  const [page, setPage] = useState(0);
  const matchingRows = useMemo(() => rows.filter((row) => Object.values(row).some((value) => value.toLowerCase().includes(query.toLowerCase())) && filters.every(({ key }) => !selected[key] || row[key] === selected[key])).sort((a, b) => (a[sortKey] || "").localeCompare(b[sortKey] || "") * (ascending ? 1 : -1)), [rows, query, selected, filters, sortKey, ascending]);
  const pageCount = Math.max(1, Math.ceil(matchingRows.length / PAGE_SIZE));
  const visibleRows = matchingRows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const updateFilter = (key: string, value: string) => { setSelected({ ...selected, [key]: value }); setPage(0); };
  return <div className="overflow-hidden rounded-lg border border-line bg-white shadow-xs">
    <div className="flex flex-col gap-3 border-b border-line p-4 lg:flex-row lg:items-center"><label className="relative min-w-0 flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" /><Input value={query} onChange={(event) => { setQuery(event.target.value); setPage(0); }} placeholder="Search records" aria-label="Search records" className="h-10 pl-9 text-sm" /></label>
      {filters.map(({ key, label }) => <select key={key} value={selected[key] || ""} onChange={(event) => updateFilter(key, event.target.value)} aria-label={`Filter by ${label}`} className="h-10 rounded-md border border-input bg-white px-3 text-sm text-body outline-none focus:ring-2 focus:ring-ring/40"><option value="">All {label.toLowerCase()}</option>{[...new Set(rows.map((row) => row[key]).filter(Boolean))].map((value) => <option key={value}>{value}</option>)}</select>)}
    </div>
    <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left"><thead className="bg-surface text-[13px] font-medium text-body"><tr>{columns.map((column) => <th key={column.key} className="px-4 py-3.5"><button onClick={() => { setSortKey(column.key); setAscending(sortKey === column.key ? !ascending : true); }} className="inline-flex items-center gap-1.5 hover:text-ink">{column.label}{sortKey === column.key ? ascending ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" /> : <ChevronsUpDown className="size-3.5 text-faint" />}</button></th>)}</tr></thead>
      <tbody className="divide-y divide-line">{visibleRows.map((row, index) => <tr key={`${row[columns[0].key]}-${index}`} className="text-sm hover:bg-surface/60">{columns.map((column) => <td key={column.key} className={`px-4 py-4 ${column.key === columns[0].key ? "font-medium text-ink" : "text-body"}`}>{column.key === "status" ? <AdminStatusTag status={row[column.key]} /> : detailPath && column.key === columns[0].key ? <Link href={`${detailPath}/${encodeURIComponent(row[column.key])}`} className="text-brand hover:underline">{row[column.key]}</Link> : row[column.key]}</td>)}</tr>)}
        {visibleRows.length === 0 && <tr><td colSpan={columns.length} className="p-10 text-center text-sm text-body">No matching records.</td></tr>}</tbody>
    </table></div>
    <div className="flex flex-col gap-3 border-t border-line px-4 py-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-[13px] text-body">{matchingRows.length ? `${page * PAGE_SIZE + 1} to ${Math.min((page + 1) * PAGE_SIZE, matchingRows.length)} of ${matchingRows.length}` : "0 records"}</p><div className="flex gap-2"><Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button><Button variant="outline" size="sm" disabled={page + 1 >= pageCount} onClick={() => setPage(page + 1)}>Next</Button></div></div>
  </div>;
}
