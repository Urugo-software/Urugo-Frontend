import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

function FeatureCard({ title, description, Icon }: FeatureCardProps) {
  return (
    <div className="border border-line rounded-2xl bg-white p-6">
      <div className="w-11 h-11 rounded-xl bg-brand-tint flex items-center justify-center mb-4">
        <Icon size={20} className="text-brand" />
      </div>
      <h3 className="text-[15px] font-bold mb-2">{title}</h3>
      <p className="text-[13.5px] text-body leading-relaxed">{description}</p>
    </div>
  );
}

export default FeatureCard;
