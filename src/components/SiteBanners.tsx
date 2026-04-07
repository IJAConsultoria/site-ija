"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { SiteBanner, BannerPosition } from "@/lib/queries/banners";

const STORAGE_KEY = "ija_dismissed_banners";

function getDismissed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function dismiss(id: string) {
  const list = getDismissed();
  if (!list.includes(id)) {
    list.push(id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
}

export default function SiteBanners() {
  const [banners, setBanners] = useState<SiteBanner[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  useEffect(() => {
    setDismissedIds(getDismissed());
    const supabase = createClient();
    supabase
      .from("site_banners")
      .select("*")
      .eq("active", true)
      .order("priority", { ascending: false })
      .then(({ data }) => {
        const now = new Date();
        const filtered = ((data || []) as SiteBanner[]).filter((b) => {
          if (b.start_date && new Date(b.start_date) > now) return false;
          if (b.end_date && new Date(b.end_date) < now) return false;
          return true;
        });
        setBanners(filtered);
      });
  }, []);

  function handleDismiss(id: string) {
    dismiss(id);
    setDismissedIds([...dismissedIds, id]);
  }

  const visible = banners.filter((b) => !dismissedIds.includes(b.id));
  const byPosition = (pos: BannerPosition) => visible.filter((b) => b.position === pos);

  const renderBar = (b: SiteBanner) => (
    <div
      key={b.id}
      className="flex items-center justify-center gap-3 px-4 py-2.5 text-sm"
      style={{ backgroundColor: b.bg_color, color: b.text_color }}
    >
      <p className="text-center">
        <strong>{b.title}</strong>
        {b.description && <span className="ml-2 opacity-90">— {b.description}</span>}
      </p>
      {b.cta_text && b.cta_url && (
        <Link
          href={b.cta_url}
          className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm hover:bg-white/30"
        >
          {b.cta_text}
        </Link>
      )}
      {b.dismissible && (
        <button
          onClick={() => handleDismiss(b.id)}
          className="ml-2 rounded-full p-1 hover:bg-white/20"
          aria-label="Fechar"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );

  const renderPopup = (b: SiteBanner, side: "center" | "side") => (
    <div
      key={b.id}
      className={
        side === "center"
          ? "fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4"
          : "fixed bottom-6 right-6 z-[60] max-w-sm"
      }
    >
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl"
        style={{ backgroundColor: b.bg_color, color: b.text_color, maxWidth: 480 }}
      >
        {b.dismissible && (
          <button
            onClick={() => handleDismiss(b.id)}
            className="absolute right-3 top-3 rounded-full bg-black/30 p-1.5 text-white hover:bg-black/50"
          >
            <X size={14} />
          </button>
        )}
        {b.image_url && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={b.image_url} alt="" className="h-40 w-full object-cover" />
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold">{b.title}</h3>
          {b.description && <p className="mt-2 text-sm opacity-90">{b.description}</p>}
          {b.cta_text && b.cta_url && (
            <Link
              href={b.cta_url}
              className="mt-4 inline-flex rounded-2xl bg-white/20 px-5 py-2.5 text-sm font-semibold backdrop-blur-sm hover:bg-white/30"
            >
              {b.cta_text}
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {byPosition("above-header").map(renderBar)}
      {byPosition("below-header").map(renderBar)}

      {byPosition("floating-bottom").length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          {byPosition("floating-bottom").map(renderBar)}
        </div>
      )}

      {byPosition("popup-center").map((b) => renderPopup(b, "center"))}
      {byPosition("popup-side").map((b) => renderPopup(b, "side"))}
    </>
  );
}
