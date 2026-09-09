"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  SlidersHorizontal,
  MapPin,
  ChevronRight,
  Layers,
} from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";
import { mockLandlordProperties } from "@/data/landlord-data";
import { LandlordPropertyItem } from "@/types/landlord";

export function LandlordPropertiesView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const filteredProperties = mockLandlordProperties.filter((prop: LandlordPropertyItem) => {
    const matchesSearch =
      prop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "All" || prop.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24 space-y-7 bg-surface/30">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            My Properties
          </h1>
          <p className="mt-1 text-sm text-body">
            Manage your real estate portfolio, unit occupancy, and rental revenues.
          </p>
        </div>

        <Link href="/landlord/properties/new">
          <CustomButton title="Add New Property" variant="colored" className="rounded-none">
            <Plus className="h-4 w-4" />
          </CustomButton>
        </Link>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border border-line bg-white p-4 shadow-2xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-faint" />
          <input
            type="text"
            placeholder="Search property name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-line bg-surface/40 text-ink focus:outline-none focus:border-brand rounded-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-faint" />
          <span className="text-xs font-semibold uppercase tracking-wider text-faint hidden sm:inline">
            Status:
          </span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm border border-line bg-white text-ink focus:outline-none focus:border-brand rounded-none"
          >
            <option value="All">All Statuses</option>
            <option value="Occupied">Fully Occupied</option>
            <option value="Partial">Partially Occupied</option>
            <option value="Vacant">Vacant</option>
          </select>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredProperties.map((prop) => {
          const occupancyPct = Math.round(
            (prop.occupiedUnits / prop.totalUnits) * 100
          );

          return (
            <div
              key={prop.id}
              className="border border-line bg-white shadow-2xs flex flex-col justify-between hover:border-brand/40 transition-colors rounded-none"
            >
              <div>
                {/* Header Image / Badge Banner */}
                <div className="relative h-44 bg-surface/80 border-b border-line overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
                  <div className="absolute top-3 right-3 z-20">
                    <span
                      className={`px-3 py-1 text-xs font-semibold border ${
                        prop.status === "Occupied"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : prop.status === "Partial"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {prop.status}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 z-20">
                    <span className="text-xs font-medium text-white/80 uppercase tracking-wider block">
                      {prop.type}
                    </span>
                    <h3 className="text-lg font-bold text-white truncate mt-0.5">
                      {prop.name}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 space-y-4">
                  <div className="flex items-start gap-2 text-xs text-body">
                    <MapPin className="h-4 w-4 text-faint shrink-0 mt-0.5" />
                    <span className="truncate">{prop.location}</span>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-line/60">
                    <div className="p-3 border border-line/60 bg-surface/30">
                      <span className="text-[11px] font-semibold text-faint uppercase block">
                        Units Occupied
                      </span>
                      <span className="text-base font-bold text-ink block mt-0.5">
                        {prop.occupiedUnits} / {prop.totalUnits}{" "}
                        <span className="text-xs font-normal text-faint">
                          ({occupancyPct}%)
                        </span>
                      </span>
                    </div>

                    <div className="p-3 border border-line/60 bg-surface/30">
                      <span className="text-[11px] font-semibold text-faint uppercase block">
                        Monthly Revenue
                      </span>
                      <span className="text-base font-bold text-ink block mt-0.5">
                        {prop.monthlyRevenueRwf.toLocaleString()}{" "}
                        <span className="text-[11px] text-faint">RWF</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-4 bg-surface/40 border-t border-line flex items-center justify-between gap-3">
                <Link
                  href={`/landlord/tenancies?property=${prop.id}`}
                  className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
                >
                  <Layers className="h-3.5 w-3.5" />
                  View Units & Leases
                </Link>

                <CustomButton title="Manage" variant="light" className="h-8 text-xs rounded-none">
                  <ChevronRight className="h-3.5 w-3.5" />
                </CustomButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
