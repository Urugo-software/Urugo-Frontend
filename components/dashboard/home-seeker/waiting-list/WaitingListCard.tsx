"use client";

import Image from "next/image";
import Link from "next/link";
import { FullWaitingListItem } from "@/data/waiting-list-data";
import CustomButton from "@/components/shared/CustomButton";

interface WaitingListCardProps {
  item: FullWaitingListItem;
  onLeave: (id: string) => void;
}

export function WaitingListCard({ item, onLeave }: WaitingListCardProps) {
  return (
    <div className=" border border-line bg-white p-6 transition hover:shadow-xs">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="relative h-[100px] w-full shrink-0 overflow-hidden rounded-xl bg-surface sm:w-[140px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-[17px] font-bold text-ink">
                <Link
                  href={"/properties/" + item.id}
                  className="hover:text-brand duration-300 hover:underline"
                >
                  {item.title}
                </Link>
              </div>
              <div className="text-[13px] text-body">
                {item.location} · {item.price}
              </div>
            </div>
            <span className="rounded-full bg-brand-tint px-3.5 py-1.5 text-[12px] font-bold text-brand whitespace-nowrap">
              {item.queueBadge}
            </span>
          </div>

          <div className="mt-3 flex max-md:flex-col flex-wrap gap-x-8 gap-y-2 text-[13px] ">
            <div>
              <span className="text-faint">Status</span>
              <div className="font-semibold text-ink">{item.status}</div>
            </div>
            <hr className="hidden md:block border-2 h-9 border-brand/80" />
            <div>
              <span className="text-faint">Joined waiting list</span>
              <div className="font-semibold text-ink">{item.joinedDate}</div>
            </div>
            <hr className="hidden md:block border-2 h-9 border-brand/80" />

            <div>
              <span className="text-faint">People ahead of you</span>
              <div className="font-semibold text-ink">{item.peopleAhead}</div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <Link href="/properties">
              <CustomButton
                className="rounded-none"
                title="View Property"
                variant="light"
              />
            </Link>

            <CustomButton
              className="rounded-none"
              title="Leave waiting list"
              variant="light"
              onClick={() => onLeave(item.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
