interface SectionLoadingProps {
  message?: string;
}

function SectionLoading({ message = "Loading..." }: SectionLoadingProps) {
  return (
    <div className="flex min-h-64 w-full items-center justify-center text-sm text-body">
      <div className="flex items-center gap-3" role="status" aria-live="polite">
        <span className="size-5 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
        <span>{message}</span>
      </div>
    </div>
  );
}

export default SectionLoading;
