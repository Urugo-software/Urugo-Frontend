interface Props {
  agreementId: string;
  referenceNumber: string;
  version: number;
  isKinyarwanda?: boolean;
}

export function DocumentFooterSeal({
  agreementId,
  referenceNumber,
  version,
  isKinyarwanda = false,
}: Props) {
  return (
    <footer className="mt-12 flex flex-col items-start justify-between gap-2 border-t border-zinc-200 pt-4 text-[12.5px] text-faint break-inside-avoid sm:flex-row sm:items-center">
      <div>
        <span>
          {isKinyarwanda
            ? "Amasezerano y'Ubukode — URUGO"
            : "URUGO Residential Lease Agreement"}
        </span>
        <span className="mx-1.5">&middot;</span>
        <span>REF: {referenceNumber}</span>
        <span className="mx-1.5">&middot;</span>
        <span>v{version}.0</span>
      </div>
      <div className="flex items-center gap-2">
        <span>ID: {agreementId}</span>
        <span className="text-zinc-400">&middot;</span>
        <span className="text-zinc-600">
          {isKinyarwanda
            ? "Inyandiko Yemewe y'Ikoranabuhanga"
            : "Official Electronic Record"}
        </span>
      </div>
    </footer>
  );
}
