import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

interface RoleCardProps {
  title: string;
  description: string;
  benefits: string[];
  addedBy: string;
  Icon: LucideIcon | IconType;
  isHighlighted?: boolean;
}
function RoleCard({
  title,
  description,
  benefits,
  addedBy,
  Icon,
  isHighlighted = false,
}: RoleCardProps) {
  return (
    <div
      className={`border border-line rounded-[18px] p-8 ${isHighlighted ? "bg-brand " : ""}`}
    >
      <div className="w-12 h-12 rounded-xl bg-brand-tint flex items-center justify-center mb-5">
        <Icon className="w-5.5 h-5.5 text-brand" />
      </div>
      <h3
        className={`text-lg font-extrabold mb-2 ${isHighlighted ? "text-white" : "text-ink"}`}
      >
        {title}
      </h3>
      <p
        className={`text-sm ${isHighlighted ? "text-white" : "text-body"} mb-4.5`}
      >
        {description}
      </p>
      <ul className="flex flex-col gap-2.5 mb-4.5 text-[13.5px]">
        {benefits.map((benefit: string, index: number) => (
          <li
            className={`flex gap-2 ${isHighlighted ? "text-white" : "text-ink"}`}
            key={index}
          >
            <span className={`${isHighlighted ? "text-white" : "text-brand"}`}>
              —
            </span>{" "}
            {benefit}
          </li>
        ))}
      </ul>
      <span
        className={`text-[11.5px] font-bold text-faint  ${isHighlighted ? "text-white bg-white/10 border border-white/30" : "text-body bg-surface"} px-3 py-1.5 rounded-full inline-block`}
      >
        {`Added by ${addedBy}`}
      </span>
    </div>
  );
}

export default RoleCard;
