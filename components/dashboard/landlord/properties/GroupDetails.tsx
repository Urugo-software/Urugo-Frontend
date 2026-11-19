"use client";

import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { partitionProperties } from "@/utils/property-groups";
import { PropertyList } from "./PropertyList";
import { useMembershipControls } from "./membership/useMembershipControls";

export function GroupDetails({ id }: { id: string }) {
  const { groups, properties } = useLandlordProperties();
  const membership = useMembershipControls();
  const group = groups.find((item) => item.id === id);
  const members = partitionProperties(groups, properties).byGroup.get(id) ?? [];
  return (
    <main className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-surface/30 p-4 sm:p-8 md:p-10">
      <Link href="/landlord/properties" className="inline-flex items-center gap-2 text-sm font-medium hover:underline"><ArrowLeft className="size-4" /> My Properties</Link>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 id="membership-heading" tabIndex={-1} className="text-2xl font-bold text-ink">{group?.name ?? "Group unavailable"}</h1>
        {group && membership.addButton(group)}
      </div>
      {group ? <>
        {group.location && <p className="flex items-center gap-2 text-body"><MapPin className="size-4" />{group.location}</p>}
        {members.length ? <section aria-label="Properties in this group" className="space-y-3">
          <h2 className="text-lg font-semibold">{members.length} {members.length === 1 ? "property" : "properties"}</h2>
          <PropertyList properties={members} renderMembershipActions={membership.propertyMenu} />
        </section> : <p className="border border-dashed border-line bg-white p-6 text-body">This group has no properties yet.</p>}
      </> : <p className="text-body">This group could not be found in your current portfolio.</p>}
      {membership.dialog}
    </main>
  );
}
