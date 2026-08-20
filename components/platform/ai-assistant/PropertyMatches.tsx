"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, ShieldCheck } from "lucide-react";

export interface PropertyMatchItem {
  id?: string;
  image: string;
  name: string;
  location?: string;
  details: string;
  price: string;
  badge?: string;
}

const defaultProperties: PropertyMatchItem[] = [
  {
    id: "prop-1",
    image: "/assets/home/prop1.jpg",
    name: "2BR Modern Apartment — Kimironko",
    location: "Kimironko, Kigali",
    details: "★ 4.8 · Parking · High-speed WiFi",
    price: "150,000 RWF",
    badge: "Verified"
  },
  {
    id: "prop-2",
    image: "/assets/home/prop2.jpg",
    name: "2BR Cozy Serviced Flat — Kabeza",
    location: "Kabeza, Kigali",
    details: "★ 4.6 · Dedicated Parking · Water included",
    price: "180,000 RWF",
    badge: "Instant Tour"
  },
  {
    id: "prop-3",
    image: "/assets/home/prop3.jpg",
    name: "2BR Premium Residence — Kacyiru",
    location: "Kacyiru, Kigali",
    details: "★ 4.9 · Secured Parking · Fully Furnished",
    price: "195,000 RWF",
    badge: "Verified"
  },
];

interface PropertyMatchesProps {
  items?: PropertyMatchItem[];
  onSelectProperty?: (name: string) => void;
}

export function PropertyMatches({ items = defaultProperties, onSelectProperty }: PropertyMatchesProps) {
  return (
    <div className="mt-2 flex w-full flex-col gap-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((prop) => (
          <div
            key={prop.name}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md hover:shadow-brand/5"
          >
            <div className="relative h-32 w-full overflow-hidden rounded-xl bg-surface">
              <Image
                src={prop.image}
                alt={prop.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {prop.badge && (
                <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-brand shadow-sm backdrop-blur">
                  <ShieldCheck className="size-3 text-brand" />
                  {prop.badge}
                </span>
              )}
            </div>

            <div className="mt-3 flex flex-1 flex-col justify-between">
              <div>
                <h3 className="line-clamp-1 text-sm font-bold text-ink group-hover:text-brand transition-colors">
                  {prop.name}
                </h3>
                {prop.location && (
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-body">
                    <MapPin className="size-3 text-faint" />
                    {prop.location}
                  </p>
                )}
                <p className="mt-1 text-[12px] text-body">{prop.details}</p>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-line/60 pt-2.5">
                <div>
                  <span className="text-[10px] font-medium text-faint uppercase tracking-wider block">Monthly rent</span>
                  <span className="font-mono text-sm font-bold text-brand">{prop.price}</span>
                </div>

                <Link
                  href="/properties"
                  onClick={() => onSelectProperty?.(prop.name)}
                  className="inline-flex items-center gap-1 rounded-xl bg-brand-tint px-3 py-1.5 text-xs font-bold text-brand transition-all hover:bg-brand hover:text-white"
                >
                  View <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
