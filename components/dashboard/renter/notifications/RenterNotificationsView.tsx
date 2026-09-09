"use client";

import React from "react";
import { useRenterNotifications } from "@/hooks/query/renter.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { NotificationList } from "./NotificationList";

export function RenterNotificationsView() {
  const { data: items, isLoading, isError } = useRenterNotifications();

  if (isLoading) return <SectionLoading message="Loading notifications..." />;
  if (isError || !items)
    return <SectionError message="Unable to load notifications." />;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-ink sm:text-2xl">
          Notifications
        </h2>
        <p className="text-[14px] text-body mt-1">
          Stay informed about rent due dates, electricity limits, and
          maintenance status.
        </p>
      </div>

      <NotificationList items={items} />
    </div>
  );
}
