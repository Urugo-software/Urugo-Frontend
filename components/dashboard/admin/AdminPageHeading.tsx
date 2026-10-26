export function AdminPageHeading({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
    <div><h1 className="text-2xl font-semibold text-ink">{title}</h1><p className="mt-1.5 text-[15px] leading-6 text-body">{description}</p></div>
    {action}
  </div>;
}
