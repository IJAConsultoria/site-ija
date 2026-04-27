import { jsPDF } from "jspdf";
import type { DiagnosticResults } from "./types";
import { getHealthScore, CLASSIFICATION_CONFIG } from "./scoring";

export async function generateDiagnosticPDF(
  results: DiagnosticResults,
  businessName: string
): Promise<void> {
  const pdf = new jsPDF("p", "mm", "a4");
  const w = 210;
  let y = 0;

  // ---- Header ----
  pdf.setFillColor(1, 23, 53);
  pdf.rect(0, 0, w, 30, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("Instituto João Alves", 15, 14);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text("Diagnóstico Empresarial Avançado", 15, 22);

  if (businessName) {
    pdf.setTextColor(166, 133, 35);
    pdf.setFontSize(11);
    pdf.text(businessName, w - 15, 14, { align: "right" });
  }

  pdf.setTextColor(141, 174, 216);
  pdf.setFontSize(8);
  pdf.text(
    new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    w - 15,
    22,
    { align: "right" }
  );

  y = 40;

  // ---- Score geral ----
  const healthScore = getHealthScore(results.overall_negative_pct);
  const overallConfig = CLASSIFICATION_CONFIG[results.overall_classification];

  pdf.setFontSize(22);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(1, 23, 53);
  pdf.text(`Saúde Geral: ${healthScore}%`, w / 2, y, { align: "center" });
  y += 8;

  pdf.setFontSize(12);
  pdf.setTextColor(100, 100, 100);
  pdf.text(
    `Classificação: ${overallConfig.emoji} ${overallConfig.label}`,
    w / 2,
    y,
    { align: "center" }
  );
  y += 15;

  // ---- Linha separadora ----
  pdf.setDrawColor(217, 228, 242);
  pdf.line(15, y, w - 15, y);
  y += 10;

  // ---- Detalhamento por solução ----
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(1, 23, 53);
  pdf.text("Resultado por Área", 15, y);
  y += 10;

  for (const solution of results.solutions) {
    const score = getHealthScore(solution.negative_pct);
    const config = CLASSIFICATION_CONFIG[solution.classification];

    // Check page break
    if (y > 260) {
      pdf.addPage();
      y = 20;
    }

    // Background bar
    pdf.setFillColor(240, 244, 250);
    pdf.roundedRect(15, y - 5, w - 30, 18, 3, 3, "F");

    // Label
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(1, 23, 53);
    pdf.text(solution.label, 20, y + 3);

    // Score
    pdf.setFontSize(11);
    pdf.text(`${score}%`, w - 60, y + 3);

    // Classification
    pdf.setFontSize(9);
    const classColor =
      solution.classification === "critico"
        ? [220, 38, 38]
        : solution.classification === "atencao"
          ? [217, 119, 6]
          : [5, 150, 105];
    pdf.setTextColor(classColor[0], classColor[1], classColor[2]);
    pdf.text(`${config.emoji} ${config.label}`, w - 40, y + 3);

    // Progress bar
    const barX = 20;
    const barY = y + 7;
    const barW = w - 70;
    const barH = 3;

    pdf.setFillColor(217, 228, 242);
    pdf.roundedRect(barX, barY, barW, barH, 1, 1, "F");

    pdf.setFillColor(classColor[0], classColor[1], classColor[2]);
    pdf.roundedRect(barX, barY, (barW * score) / 100, barH, 1, 1, "F");

    y += 22;
  }

  y += 5;

  // ---- Prioridades ----
  if (y > 230) {
    pdf.addPage();
    y = 20;
  }

  pdf.setDrawColor(217, 228, 242);
  pdf.line(15, y, w - 15, y);
  y += 10;

  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(1, 23, 53);
  pdf.text("Prioridades de Ação", 15, y);
  y += 10;

  const sorted = [...results.solutions].sort(
    (a, b) => b.negative_pct - a.negative_pct
  );

  sorted.forEach((s, i) => {
    if (y > 270) {
      pdf.addPage();
      y = 20;
    }

    const config = CLASSIFICATION_CONFIG[s.classification];

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(1, 23, 53);
    pdf.text(`${i + 1}. ${s.label}`, 20, y);

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(100, 100, 100);
    pdf.text(
      `${config.emoji} ${config.label} — ${s.negative_count} pontos de atenção em ${s.total} perguntas`,
      20,
      y + 5
    );

    y += 14;
  });

  // ---- Footer em todas as páginas ----
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFillColor(1, 23, 53);
    pdf.rect(0, 287, w, 10, "F");
    pdf.setTextColor(141, 174, 216);
    pdf.setFontSize(7);
    pdf.text("www.ijaconsultoria.com.br", 15, 293);
    pdf.text(`Página ${i} de ${totalPages}`, w - 15, 293, { align: "right" });
  }

  // Download
  const fileName = businessName
    ? `diagnostico-ija-${businessName.toLowerCase().replace(/\s+/g, "-")}.pdf`
    : `diagnostico-ija-${Date.now()}.pdf`;

  pdf.save(fileName);
}
