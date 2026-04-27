"use client";

import { Check, X } from "lucide-react";

interface YesNoToggleProps {
  value: boolean | undefined;
  onChange: (value: boolean) => void;
}

export function YesNoToggle({ value, onChange }: YesNoToggleProps) {
  return (
    <div className="flex shrink-0 overflow-hidden rounded-full border border-navy-200 bg-navy-50/50">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`flex h-10 w-[72px] items-center justify-center gap-1.5 text-sm font-semibold transition-all ${
          value === true
            ? "bg-emerald-500 text-white"
            : "text-navy-400 hover:bg-emerald-50 hover:text-emerald-600"
        }`}
      >
        {value === true && <Check size={14} strokeWidth={3} />}
        Sim
      </button>
      <div className="w-px bg-navy-200" />
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`flex h-10 w-[72px] items-center justify-center gap-1.5 text-sm font-semibold transition-all ${
          value === false
            ? "bg-red-500 text-white"
            : "text-navy-400 hover:bg-red-50 hover:text-red-600"
        }`}
      >
        {value === false && <X size={14} strokeWidth={3} />}
        Não
      </button>
    </div>
  );
}
