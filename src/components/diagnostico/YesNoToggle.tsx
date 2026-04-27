"use client";

interface YesNoToggleProps {
  value: boolean | undefined;
  onChange: (value: boolean) => void;
}

export function YesNoToggle({ value, onChange }: YesNoToggleProps) {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => onChange(true)}
        className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${
          value === true
            ? "bg-emerald-600 text-white shadow-sm"
            : "border border-navy-200 bg-white text-navy-600 hover:border-emerald-300 hover:bg-emerald-50"
        }`}
      >
        Sim
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
        className={`rounded-lg px-5 py-2 text-sm font-medium transition-all ${
          value === false
            ? "bg-red-600 text-white shadow-sm"
            : "border border-navy-200 bg-white text-navy-600 hover:border-red-300 hover:bg-red-50"
        }`}
      >
        Não
      </button>
    </div>
  );
}
