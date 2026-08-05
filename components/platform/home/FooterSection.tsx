import Link from "next/link";
import Logo from "./headerSection/Logo";

function FooterSection() {
  return (
    <footer className="py-14 border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 mb-10">
          <div>
            <div className="mb-3">
              <Logo />
            </div>
            <p className="text-[13.5px] text-body max-w-[260px]">
              Rwanda's verified rental registry — digital payments, honest
              landlords, and an AI assistant to help you find home.
            </p>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wide text-faint mb-4">
              Platform
            </h5>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="#"
                  className="text-[13.5px] text-body hover:text-ink"
                >
                  For landlords
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13.5px] text-body hover:text-ink"
                >
                  For renters
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13.5px] text-body hover:text-ink"
                >
                  AI assistant
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wide text-faint mb-4">
              Trust
            </h5>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="#"
                  className="text-[13.5px] text-body hover:text-ink"
                >
                  Verification process
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13.5px] text-body hover:text-ink"
                >
                  Blacklist policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13.5px] text-body hover:text-ink"
                >
                  Dispute resolution
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wide text-faint mb-4">
              Contact
            </h5>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="#"
                  className="text-[13.5px] text-body hover:text-ink"
                >
                  Kigali, Rwanda
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13.5px] text-body hover:text-ink"
                >
                  support@urugo.rw
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[13.5px] text-body hover:text-ink"
                >
                  +250 788 000 000
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between text-xs text-faint flex-wrap gap-2.5 pt-5 border-t border-line">
          <div>© 2026 Urugo. All rights reserved.</div>
          <div>Built for Rwanda's rental market.</div>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
