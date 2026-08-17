import { Search } from "lucide-react";
interface SearchInputProps {
  className: string;
}

function SearchInput({ className }: SearchInputProps) {
  return (
    <div className="flex items-center border border-line  hover:border-brand hover:ring-brand/60 hover:ring-2 transition-all duration-300  ">
      <Search size={16} className="text-faint ml-3" />
      <input
        type="text"
        placeholder="Search by location, e.g. Kimironko…"
        className={`${className}`}
      />
    </div>
  );
}

export default SearchInput;
