import { ChevronDown } from "lucide-react";

type Question = readonly [string, string];
interface FaqListProps {
  questions: readonly Question[];
  open?: string;
  onToggle: (title: string) => void;
}

export function FaqList({ questions, open, onToggle }: FaqListProps) {
  if (!questions.length)
    return (
      <p className="py-5 text-sm text-body">
        No answers found. Try a different search.
      </p>
    );
  return (
    <>
      {questions.map(([title, answer]) => (
        <div key={title} className="border-b border-line last:border-0">
          <button
            onClick={() => onToggle(title)}
            className="flex w-full items-center justify-between gap-3 py-4 text-left text-[15px] font-semibold"
          >
            <span>{title}</span>
            <ChevronDown
              className={`size-4 transition ease-in-out duration-300 ${open === title ? "rotate-180" : ""}`}
            />
          </button>
          {open === title && (
            <p className="pb-4  duration-300 transition-all ease-in-out text-[15px] leading-6 text-body">
              {answer}
            </p>
          )}
        </div>
      ))}
    </>
  );
}
