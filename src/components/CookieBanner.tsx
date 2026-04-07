"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "ija_cookie_consent";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, at: new Date().toISOString() }));
    setShow(false);
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: false, at: new Date().toISOString() }));
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-2xl rounded-2xl border border-navy-200 bg-white p-5 shadow-2xl sm:inset-x-auto sm:right-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Cookie size={18} />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-navy-950">Usamos cookies</h3>
          <p className="mt-1 text-xs leading-relaxed text-navy-600">
            Utilizamos cookies essenciais para o funcionamento do site e analytics anônimos
            para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{" "}
            <Link href="/privacidade" className="text-accent hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={accept}
              className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-dark"
            >
              Aceitar todos
            </button>
            <button
              onClick={reject}
              className="rounded-lg border border-navy-200 px-4 py-2 text-xs font-medium text-navy-700 hover:bg-navy-50"
            >
              Só essenciais
            </button>
          </div>
        </div>
        <button
          onClick={reject}
          className="rounded-full p-1 text-navy-400 hover:bg-navy-100 hover:text-navy-950"
          aria-label="Fechar"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
