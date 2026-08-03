function SectionTitle({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div>
      <h1 className="text-3xl tracking-tight font-extrabold text-ink">
        {title}
      </h1>
      {description && <p className="text-body text-[15px]">{description}</p>}
    </div>
  );
}

export default SectionTitle;
