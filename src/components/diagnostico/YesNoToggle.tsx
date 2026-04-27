"use client";

import { Check, X } from "lucide-react";

interface YesNoToggleProps {
  value: boolean | undefined;
  onChange: (value: boolean) => void;
}

export function YesNoToggle({ value, onChange }: YesNoToggleProps) {
  return (
    <div className="flex shrink-0 gap-1.5">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`flex h-11 w-16 items-center justify-center gap-1 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
          value === true
            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
            : "border border-navy-200 bg-white text-navy-400 hover:border-emerald-300 hover:text-emerald-600"
        }`}
      >
        {value === true && <Check size={14} strokeWidth={3} />}
        Sim
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`flex h-11 w-16 items-center justify-center gap-1 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
          value === false
            ? "bg-red-500 text-white shadow-md shadow-red-500/25"
            : "border border-navy-200 bg-white text-navy-400 hover:border-red-300 hover:text-red-600"
        }`}
      >
        {value === false && <X size={14} strokeWidth={3} />}
        Não
      </button>
    </div>
  );
}
