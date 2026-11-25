"use client";

import { useTranslations } from "next-intl";
import { useRenterProperty } from "@/hooks/query/renter.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import { PropertyDetailHeader } from "./PropertyDetailHeader";
import { PropertyLeaseCard } from "./PropertyLeaseCard";
import { LandlordContactCard } from "./LandlordContactCard";
import { PropertySpecsCard } from "./PropertySpecsCard";

export function RenterPropertyView() {
  const t = useTranslations("renter.property");
  const { isLoading, isError, refetch } = useRenterProperty();
  const property = useRenterWorkspace((s) => s.property);

  if (isLoading) {
    return <SectionLoading message={t("loading")} />;
  }
  if (isError) {
    return (
      <SectionError
        message={t("loadError")}
        onRetry={() => void refetch()}
      />
    );
  }

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <PropertyDetailHeader
        name={property.name}
        address={property.address}
        image={property.image}
        leaseStatus={property.leaseStatus}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <PropertyLeaseCard property={property} />
        <LandlordContactCard
          name={property.landlordName}
          phone={property.landlordPhone}
          email={property.email}
        />
        <PropertySpecsCard property={property} />
      </div>
    </div>
  );
}
