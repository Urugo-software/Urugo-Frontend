function HomeStasCounter({
  title,
  paragraph,
}: {
  title: string;
  paragraph: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <p className="font-ibm text-2xl font-extrabold text-ink">{title}</p>
      <p className="text-sm tracking-wide text-body">{paragraph}</p>
    </div>
  );
}

export default HomeStasCounter;
