import { MessageCircle } from "lucide-react";

export function HelpContactCard() {
  return (
    <section className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-brand p-6 text-white">
      <div><h3 className="font-bold">Still need help?</h3><p className="mt-1 text-sm text-white/80">Our support team is ready to assist you.</p></div>
      <button className="flex shrink-0 items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand"><MessageCircle className="size-4" />Contact us</button>
    </section>
  );
}