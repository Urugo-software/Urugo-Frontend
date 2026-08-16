function HeaderSection({
  children,
  subTitle,
  Title,
  classNameTitle,
}: {
  children?: React.ReactNode;
  subTitle?: string;
  Title?: string;
  classNameTitle?: string;
}) {
  return (
    <div>
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="block text-xs font-bold tracking-widest uppercase text-brand mb-3.5">
          {subTitle}
        </span>
        <h2
          className={`text-4xl font-extrabold tracking-tight mb-3.5 ${classNameTitle || ""}`}
        >
          {Title}
        </h2>
        {children}
      </div>
    </div>
  );
}

export default HeaderSection;
