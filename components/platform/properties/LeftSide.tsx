import Link from "next/link";
import { MessageSquareText } from "lucide-react";

function LeftSide() {
  return (
    <div className=" sm:min-w-[300px] w-[300px] max-md:w-full  h-full flex flex-col gap-2">
      {/* talk to an agent card */}
      <div className="bg-brand rounded-2xl p-6 text-white mb-4">
        <h4 className="text-base font-extrabold mb-1.5">List your property</h4>
        <p className="text-[13px] text-white/80 mb-4">
          Reach 430+ landlords already earning more with verified tenants.
        </p>
        <Link
          href="/ai-assistant"
          className="w-full flex justify-center text-[13.5px] font-semibold px-4.5 py-2.5 rounded-full bg-white text-brand"
        >
          Talk to an agent
        </Link>
      </div>
      {/*  Ask the AI Assistant card*/}
      <div className="bg-white border border-line rounded-2xl p-5.5 mb-4">
        <div className="w-9.5 h-9.5 rounded-[10px] bg-brand-tint flex items-center justify-center mb-3.5">
          <MessageSquareText size={16} className="text-brand" />
        </div>
        <h4 className="text-[14.5px] font-bold mb-1.5">
          Not sure what you need?
        </h4>
        <p className="text-xs text-body mb-3.5">
          {`Chat with the Urugo Assistant describe what you're looking for in
        plain language.`}
        </p>
        <Link
          href="#"
          className="w-full flex justify-center text-[13.5px] font-semibold px-4.5 py-2.5 rounded-full border border-line text-ink"
        >
          Ask the AI Assistant
        </Link>
      </div>
      {/* Property already taken card */}
      <div className="bg-surface border border-dashed border-line rounded-2xl p-5">
        <h5 className="text-[13px] font-bold mb-1.5">
          Property already taken?
        </h5>
        <p className="text-xs text-body">
          {`Express interest and we'll notify you the moment it's available again.`}
        </p>
      </div>
    </div>
  );
}

export default LeftSide;
