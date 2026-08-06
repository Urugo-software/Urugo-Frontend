import { cn } from "@/lib/utils";

function SectionTitle({
  title,
  description,
  className,
  descriptionClassName,
}: {
  title: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
}) {
  return (
    <div className="max-w-[550px]">
      <h1
        className={
          cn(
            "text-2xl tracking-tight max-md:tracking-normal font-extrabold  ",
          ) +
          " " +
          className
        }
      >
        {title}
      </h1>
      {description && (
        <p className={cn("text-body  text-base" + " " + descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionTitle;
