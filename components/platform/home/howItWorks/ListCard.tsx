import { CheckIcon } from "lucide-react";

export function ListCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3.5 items-start">
      <div className="w-6 h-6 rounded-full bg-success-tint flex items-center justify-center flex-shrink-0 mt-0.5">
        <CheckIcon className="w-3.5 h-3.5 text-success" />
      </div>
      <div>
        <b className="text-[15px] font-bold">{title}</b>
        <br />
        <span className="text-sm text-body">{description}</span>
      </div>
    </div>
  );
}

export default ListCard;
