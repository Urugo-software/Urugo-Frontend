"use client";

import { useState } from "react";
import { notificationsData } from "@/data/home-seeker-data";

export function NotificationList() {
  const [unread, setUnread] = useState(true);
  return (
    <section className="space-y-3" aria-label="Notification list">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-ink">Notifications</h2>
          <p className="mt-1 text-sm text-body">
            Updates on your viewings, waiting list, and account.
          </p>
        </div>
        <button
          onClick={() => setUnread(false)}
          disabled={!unread}
          className="rounded-lg border border-line px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand-tint disabled:cursor-default disabled:opacity-50"
        >
          Mark all as read
        </button>
      </div>
      <div className="pt-3 flex flex-col gap-4">
        {notificationsData.map(
          ({ icon: Icon, title, detail, time, unread: isNew }) => (
            <article
              key={title}
              className={`relative flex gap-4 rounded-2xl border p-5 transition hover:shadow-sm ${isNew && unread ? "border-brand/20 bg-brand-tint/50" : "border-line bg-white"}`}
            >
              {isNew && unread && (
                <span
                  className="absolute right-5 top-5 size-2 rounded-full bg-brand"
                  aria-label="Unread"
                />
              )}
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface">
                <Icon
                  className={`size-4 ${title === "Welcome to Urugo" ? "text-success" : isNew && unread ? "text-brand" : "text-body"}`}
                />
              </span>
              <div className="min-w-0 pr-3">
                <h3 className="text-sm font-bold text-ink">{title}</h3>
                <p className="mt-1 text-sm leading-6 text-body">{detail}</p>
                <time className="mt-2 block text-xs text-faint">{time}</time>
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  );
}
