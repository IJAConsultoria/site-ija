import type { Classification } from "@/lib/diagnostico/types";
import { CLASSIFICATION_CONFIG } from "@/lib/diagnostico/scoring";

interface ClassificationBadgeProps {
  classification: Classification;
  size?: "sm" | "md" | "lg";
}

export function ClassificationBadge({
  classification,
  size = "md",
}: ClassificationBadgeProps) {
  const config = CLASSIFICATION_CONFIG[classification];
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bg} ${config.color} ${config.border} border ${sizeClasses[size]}`}
    >
      <span>{config.emoji}</span>
      {config.label}
    </span>
  );
}
