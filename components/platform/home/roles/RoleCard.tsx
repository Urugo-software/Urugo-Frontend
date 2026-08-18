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
      className={`relative flex flex-col border rounded-2xl p-7 transition-all duration-300 ${
        isHighlighted
          ? "bg-brand border-brand shadow-xl shadow-brand/20"
          : "bg-white border-line hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
      }`}
    >
      {/* Icon */}
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
          isHighlighted ? "bg-white/15" : "bg-brand-tint"
        }`}
      >
        <Icon
          className={`w-5 h-5 ${isHighlighted ? "text-white" : "text-brand"}`}
        />
      </div>

      {/* Title & Description */}
      <h3
        className={`text-[17px] font-extrabold mb-1.5 tracking-tight ${
          isHighlighted ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm leading-relaxed mb-5 ${
          isHighlighted ? "text-white/75" : "text-body"
        }`}
      >
        {description}
      </p>

      {/* Divider */}
      <div
        className={`w-full h-px mb-5 ${
          isHighlighted ? "bg-white/15" : "bg-line"
        }`}
      />

      {/* Benefits — numbered */}
      <ul className="flex flex-col gap-3 mb-6">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3">
            {/* Number pill */}
            <span
              className={`flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold leading-none ${
                isHighlighted
                  ? "bg-white/20 text-white"
                  : "bg-brand-tint text-brand"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              className={`text-[13px] leading-snug ${
                isHighlighted ? "text-white" : "text-ink"
              }`}
            >
              {benefit}
            </span>
          </li>
        ))}
      </ul>

      {/* Onboarding badge */}
      <div className="mt-auto">
        <span
          className={`text-[11px] font-semibold px-3 py-1.5 rounded-full inline-block ${
            isHighlighted
              ? "bg-white/15 text-white border border-white/25"
              : "bg-surface text-faint border border-line"
          }`}
        >
          {addedBy}
        </span>
      </div>
    </div>
  );
}

export default RoleCard;
