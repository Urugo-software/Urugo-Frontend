function HomeStasCounter({
  title,
  paragraph,
}: {
  title: string;
  paragraph: string;
}) {
  return (
    <div className="flex  flex-col items-center justify-center gap-1">
      <h1 className="text-2xl font-extrabold font-ibm ">{title}</h1>
      <p className="text-body text-sm tracking-wide">{paragraph}</p>
    </div>
  );
}

export default HomeStasCounter;
