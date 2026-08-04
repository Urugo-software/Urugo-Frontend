function RoleCard() {
  return (
    <div className="flex flex-col">
      <div className="border border-line rounded-[18px] p-8">
        <div className="w-12 h-12 rounded-xl bg-brand-tint flex items-center justify-center mb-5"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 21V9L12 3L20 9V21H14V14H10V21H4Z" stroke="#1D4ED8" stroke-width="1.7" stroke-linejoin="round"/></svg></div>
        <h3 className="text-lg font-extrabold mb-2">Landlords</h3>
        <p className="text-sm text-body mb-4.5">Onboarded by an admin or licensed agent after document checks.</p>
        <ul className="flex flex-col gap-2.5 mb-4.5 text-[13.5px]">
          <li className="flex gap-2"><span className="text-brand">—</span>Mobile money collection, instant receipts</li>
          <li className="flex gap-2"><span className="text-brand">—</span>Color-coded payment dashboard</li>
          <li className="flex gap-2"><span className="text-brand">—</span>Blacklist check before signing</li>
        </ul>
        <span className="text-[11.5px] font-bold text-faint bg-surface px-3 py-1.5 rounded-full inline-block">Added by admin / agent</span>
      </div>
      <div className="rounded-[18px] p-8 bg-brand">
        <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-5"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.4" stroke="white" stroke-width="1.7"/><path d="M4 20C4 16 7.5 14 12 14C16.5 14 20 16 20 20" stroke="white" stroke-width="1.7" stroke-linecap="round"/></svg></div>
        <h3 className="text-lg font-extrabold mb-2 text-white">Guests</h3>
        <p className="text-sm text-white/85 mb-4.5">Just looking? Register in seconds, no forms required.</p>
        <ul className="flex flex-col gap-2.5 mb-4.5 text-[13.5px] text-white">
          <li className="flex gap-2"><span className="text-white/60">—</span>Chat-based registration with the AI</li>
          <li className="flex gap-2"><span className="text-white/60">—</span>Natural language property search</li>
          <li className="flex gap-2"><span className="text-white/60">—</span>Join a waiting list for occupied homes</li>
        </ul>
        <span className="text-[11.5px] font-bold text-white bg-white/15 px-3 py-1.5 rounded-full inline-block">Self-registration, instant</span>
      </div>
    </div>
  );
}

export default RoleCard;
