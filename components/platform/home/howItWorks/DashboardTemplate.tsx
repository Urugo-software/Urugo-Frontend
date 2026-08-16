import { Menu } from "lucide-react";
import Image from "next/image";

function DashboardTemplate() {
  return (
    <div className="h-fit my-auto bg-white border border-line rounded-[18px] overflow-hidden shadow-[0_24px_60px_-24px_rgba(14,17,22,.18)]">
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-line bg-surface">
        <Menu size={16} className="text-faint" />
        <div className="flex-1 bg-white border border-line rounded-lg px-3 py-1.5 text-xs text-faint">
          Search properties, tenants, payments…
        </div>
        <div>
          <Image
            src="https://flagcdn.com/w320/rw.png"
            alt="Rwanda Flag"
            height={12}
            width={24}
          />
        </div>
        <div className="w-6 h-6 rounded-full bg-brand-tint"></div>
      </div>
      <div className="flex">
        <div className="w-11 bg-white border-r border-line py-3.5 flex flex-col items-center gap-4">
          <div className="w-4.5 h-4.5 rounded-[5px] bg-brand"></div>
          <div className="w-4.5 h-4.5 rounded-[5px] bg-line"></div>
          <div className="w-4.5 h-4.5 rounded-[5px] bg-line"></div>
          <div className="w-4.5 h-4.5 rounded-[5px] bg-line"></div>
          <div className="w-4.5 h-4.5 rounded-[5px] bg-line"></div>
          <div className="w-4.5 h-4.5 rounded-[5px] bg-line"></div>
        </div>
        <div className="flex-1 p-5">
          <h4 className="text-sm font-bold mb-4">Dashboard</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-line rounded-[10px] px-3.5 py-3">
              <div className="text-[11px] text-faint mb-1.5">
                Total Properties
              </div>
              <div className="text-xl font-extrabold font-mono">156</div>
              <div className="text-[10.5px] text-success font-semibold mt-1">
                ↑ 4.2% vs last month
              </div>
            </div>
            <div className="border border-line rounded-[10px] px-3.5 py-3">
              <div className="text-[11px] text-faint mb-1.5">
                Active Landlords
              </div>
              <div className="text-xl font-extrabold font-mono">45</div>
              <div className="text-[10.5px] text-success font-semibold mt-1">
                ↑ 2.1%
              </div>
            </div>
            <div className="border border-line rounded-[10px] px-3.5 py-3">
              <div className="text-[11px] text-faint mb-1.5">
                Monthly Revenue
              </div>
              <div className="text-xl font-extrabold font-mono">RF 8.5M</div>
              <div className="text-[10.5px] text-success font-semibold mt-1">
                ↑ 12.9%
              </div>
            </div>
            <div className="border border-line rounded-[10px] px-3.5 py-3">
              <div className="text-[11px] text-faint mb-1.5">
                Pending Verification
              </div>
              <div className="text-xl font-extrabold font-mono">7</div>
              <div className="text-[10.5px] text-[#DC2626] font-semibold mt-1">
                ↓ 1%
              </div>
            </div>
            <div className="border border-line rounded-[10px] px-3.5 py-3">
              <div className="text-[11px] text-faint mb-1.5">
                Blacklist Reports
              </div>
              <div className="text-xl font-extrabold font-mono">4</div>
              <div className="text-[10.5px] text-success font-semibold mt-1">
                ↑ 0.5%
              </div>
            </div>
            <div className="border border-line rounded-[10px] px-3.5 py-3">
              <div className="text-[11px] text-faint mb-1.5">
                Properties Available
              </div>
              <div className="text-xl font-extrabold font-mono">42</div>
              <div className="text-[10.5px] text-[#DC2626] font-semibold mt-1">
                ↓ 3.1%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTemplate;
