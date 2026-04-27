"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { generateDiagnosticPDF } from "@/lib/diagnostico/pdf";

interface PDFDownloadButtonProps {
  elementId: string;
  businessName: string;
}

export function PDFDownloadButton({
  elementId,
  businessName,
}: PDFDownloadButtonProps) {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    if (generating) return;
    setGenerating(true);
    try {
      await generateDiagnosticPDF(elementId, businessName);
    } catch (err) {
      console.error("Erro ao gerar PDF:", err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={generating}
      className="inline-flex items-center gap-2 rounded-xl border border-navy-200 bg-white px-5 py-3 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {generating ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Gerando PDF...
        </>
      ) : (
        <>
          <Download size={16} />
          Baixar PDF
        </>
      )}
    </button>
  );
}
