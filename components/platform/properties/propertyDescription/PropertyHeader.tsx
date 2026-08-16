interface PropertyHeaderProps {
  title: string;
  address: string;
  status: "available" | "unavailable";
  verified: boolean;
}

export default function PropertyHeader({
  title,
  address,
  status,
  verified,
}: PropertyHeaderProps) {
  return (
    <>
      <h1 className="text-[27px] font-extrabold mb-1.5">{title}</h1>

      <div className="text-sm text-body mb-4.5">{address}</div>

      <div className="flex gap-2.5 flex-wrap mb-7">
        {status === "available" && (
          <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-green-100/90 text-green-600">
            <span className="animate-pulse">●</span> Available now
          </span>
        )}

        {verified && (
          <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-brand-tint text-brand">
            ✓ Admin verified
          </span>
        )}
      </div>
    </>
  );
}
