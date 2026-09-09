interface SectionErrorProps {
  message?: string;
}

function SectionError({
  message = "An error occurred while loading this section.",
}: SectionErrorProps) {
  return (
    <div className="flex min-h-64 w-full items-center justify-center text-center text-sm text-red-600">
      <p role="alert">{message}</p>
    </div>
  );
}

export default SectionError;
