"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Zap, Calendar, ArrowRight } from "lucide-react";
import { EVENTS } from "@/lib/constants";

function getNextEvent() {
  const now = new Date();
  // Find the next upcoming event by dateISO
  const upcoming = EVENTS.filter((e) => {
    if (!("dateISO" in e) || !e.dateISO) return false;
    const eventDate = new Date(e.dateISO + "T23:59:59");
    return eventDate >= now;
  }).sort((a, b) => {
    const da = "dateISO" in a && a.dateISO ? a.dateISO : "9999";
    const db = "dateISO" in b && b.dateISO ? b.dateISO : "9999";
    return da.localeCompare(db);
  });

  return upcoming[0] || null;
}

export default function EventBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user already dismissed this banner in this session
    const dismissedSlug = sessionStorage.getItem("event_banner_dismissed");
    const event = getNextEvent();
    if (event && dismissedSlug === event.slug) {
      setDismissed(true);
    }
  }, []);

  const event = getNextEvent();

  if (!event || dismissed || !mounted) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("event_banner_dismissed", event.slug);
  };

  return (
    <div className="relative z-40 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border-b border-accent/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 py-2.5 sm:py-3">
          <Link
            href={`/eventos/${event.slug}`}
            className="flex flex-1 items-center gap-3 group min-w-0"
          >
            <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent ring-1 ring-accent/20">
              <Zap size={12} />
              Ao vivo
            </span>
            <span className="sm:hidden shrink-0">
              <Zap size={14} className="text-accent" />
            </span>
            <span className="truncate text-sm font-medium text-white group-hover:text-accent transition-colors">
              <span className="font-bold">{event.title}</span>
              <span className="hidden md:inline text-navy-400"> — </span>
              <span className="hidden md:inline text-navy-300">
                {event.description.slice(0, 80)}...
              </span>
            </span>
            <span className="hidden sm:flex shrink-0 items-center gap-1.5 text-xs text-navy-400">
              <Calendar size={12} className="text-accent" />
              {event.date} às {event.time}
            </span>
            <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white group-hover:bg-accent-dark transition-colors">
              Inscreva-se
              <ArrowRight size={12} />
            </span>
          </Link>
          <button
            onClick={handleDismiss}
            className="shrink-0 rounded-lg p-1 text-navy-500 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fechar banner"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
