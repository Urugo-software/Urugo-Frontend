interface Props {
  agreementId: string;
  referenceNumber: string;
  version: number;
}

export function DocumentFooterSeal({
  agreementId,
  referenceNumber,
  version,
}: Props) {
  return (
    <footer className="mt-12 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[12.5px] text-faint gap-2 break-inside-avoid">
      <div>
        <span>URUGO Residential Lease Agreement</span>
        <span className="mx-1.5">&middot;</span>
        <span>REF: {referenceNumber}</span>
        <span className="mx-1.5">&middot;</span>
        <span>v{version}.0</span>
      </div>
      <div className="flex items-center gap-2">
        <span>Doc ID: {agreementId}</span>
        <span className="text-zinc-400">&middot;</span>
        <span className="text-zinc-600">Official Electronic Record</span>
      </div>
    </footer>
  );
}
