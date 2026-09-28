"use client";

interface TenancySubmittedCardProps {
  totalOwed: number;
}

export function TenancySubmittedCard({ totalOwed }: TenancySubmittedCardProps) {
  return (
    <div className="border border-line bg-brand-tint/60 p-8 text-center shadow-2xs">
      <h3 className="text-xl font-bold text-ink">
        Tenancy Processing Submitted
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-body">
        {totalOwed > 0
          ? `The renter will be notified about the remaining ${totalOwed.toLocaleString()} RWF obligation and given 3 days to pay or dispute.`
          : "The tenancy has been successfully closed with zero remaining balance."}
      </p>
    </div>
  );
}
