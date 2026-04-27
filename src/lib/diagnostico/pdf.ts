import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function generateDiagnosticPDF(
  elementId: string,
  businessName: string
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error("Elemento não encontrado");

  // Capturar como canvas
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#faf7f2", // cream
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");
  const imgWidth = 190; // mm (A4 width - margins)
  const pageHeight = 277; // mm (A4 height - margins)
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  const pdf = new jsPDF("p", "mm", "a4");
  let position = 10; // top margin

  // Header branding
  pdf.setFillColor(1, 23, 53); // navy-950
  pdf.rect(0, 0, 210, 25, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("Instituto João Alves", 10, 12);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text("Diagnóstico Empresarial Avançado", 10, 18);

  if (businessName) {
    pdf.setTextColor(166, 133, 35); // gold
    pdf.setFontSize(10);
    pdf.text(businessName, 200, 12, { align: "right" });
  }

  // Date
  pdf.setTextColor(141, 174, 216); // navy-300
  pdf.setFontSize(8);
  pdf.text(
    new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    200,
    18,
    { align: "right" }
  );

  position = 30;

  // Add image, splitting across pages if needed
  let heightLeft = imgHeight;
  let currentPosition = position;

  pdf.addImage(imgData, "PNG", 10, currentPosition, imgWidth, imgHeight);
  heightLeft -= pageHeight - currentPosition;

  while (heightLeft > 0) {
    pdf.addPage();
    currentPosition = heightLeft - imgHeight + 10;
    pdf.addImage(imgData, "PNG", 10, currentPosition, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  // Footer on last page
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFillColor(1, 23, 53);
    pdf.rect(0, 287, 210, 10, "F");
    pdf.setTextColor(141, 174, 216);
    pdf.setFontSize(7);
    pdf.text("www.ijaconsultoria.com.br", 10, 293);
    pdf.text(`Página ${i} de ${totalPages}`, 200, 293, { align: "right" });
  }

  // Download
  const fileName = businessName
    ? `diagnostico-ija-${businessName.toLowerCase().replace(/\s+/g, "-")}.pdf`
    : `diagnostico-ija-${Date.now()}.pdf`;

  pdf.save(fileName);
}
