"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, BarChart3, Eye, Download } from "lucide-react";
import { getAllDiagnostics } from "@/lib/queries/diagnostico";
import { ClassificationBadge } from "@/components/diagnostico/ClassificationBadge";
import { getResultsBySession } from "@/lib/queries/diagnostico";
import type { Classification } from "@/lib/diagnostico/types";

type DiagSession = {
  id: string;
  nome: string;
  sobrenome: string | null;
  email: string;
  phone_number: string | null;
  business_name: string | null;
  revenue_range: string | null;
  status: string;
  started_at: string;
  completed_at: string | null;
};

type DiagWithClassification = DiagSession & {
  classification?: Classification;
};

export default function DiagnosticosPage() {
  const [diagnostics, setDiagnostics] = useState<DiagWithClassification[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    async function load() {
      try {
        const sessions = (await getAllDiagnostics()) as DiagSession[];

        // Para sessões completas, buscar classificação geral
        const withClassification = await Promise.all(
          sessions.map(async (s) => {
            if (s.status !== "completed") return { ...s };
            try {
              const results = await getResultsBySession(s.id);
              if (results && results.length > 0) {
                const totalQ = results.reduce(
                  (sum: number, r: Record<string, unknown>) => sum + (r.total_questions as number),
                  0
                );
                const totalN = results.reduce(
                  (sum: number, r: Record<string, unknown>) => sum + (r.negative_count as number),
                  0
                );
                const pct =
                  totalQ > 0 ? Math.round((totalN / totalQ) * 100) : 0;
                const classification: Classification =
                  pct >= 60 ? "critico" : pct >= 30 ? "atencao" : "controlado";
                return { ...s, classification };
              }
            } catch {}
            return { ...s };
          })
        );

        setDiagnostics(withClassification);
      } catch (err) {
        console.error("Erro ao carregar diagnósticos:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = diagnostics.filter((d) => {
    if (statusFilter !== "all" && d.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        `${d.nome} ${d.sobrenome || ""}`.toLowerCase().includes(q) ||
        d.email.toLowerCase().includes(q) ||
        (d.business_name || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  function exportCsv() {
    const header = [
      "Data",
      "Empresa",
      "Nome",
      "Email",
      "Telefone",
      "Faturamento",
      "Status",
      "Classificação",
    ];
    const rows = filtered.map((d) => [
      new Date(d.started_at).toLocaleString("pt-BR"),
      d.business_name || "",
      `${d.nome} ${d.sobrenome || ""}`.trim(),
      d.email,
      d.phone_number || "",
      d.revenue_range || "",
      d.status,
      d.classification || "",
    ]);
    const csv = [header, ...rows]
      .map((r) =>
        r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagnosticos-ija-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-navy-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-950">Diagnósticos</h1>
          <p className="text-sm text-navy-500">
            {diagnostics.length} diagnóstico(s) registrado(s)
          </p>
        </div>
        <button
          onClick={exportCsv}
          className="flex items-center gap-2 rounded-lg border border-navy-200 bg-white px-4 py-2 text-sm font-medium text-navy-700 hover:bg-navy-50"
        >
          <Download size={14} />
          Exportar CSV
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400"
          />
          <input
            type="text"
            placeholder="Buscar por nome, email ou empresa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-navy-200 bg-white py-2 pl-9 pr-4 text-sm text-navy-800 focus:border-accent focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800"
        >
          <option value="all">Todos</option>
          <option value="completed">Concluídos</option>
          <option value="in_progress">Em andamento</option>
          <option value="abandoned">Abandonados</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-navy-100 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-100 bg-navy-50/50">
              <th className="px-4 py-3 text-left font-medium text-navy-600">
                Data
              </th>
              <th className="px-4 py-3 text-left font-medium text-navy-600">
                Empresa
              </th>
              <th className="px-4 py-3 text-left font-medium text-navy-600">
                Contato
              </th>
              <th className="px-4 py-3 text-left font-medium text-navy-600">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium text-navy-600">
                Resultado
              </th>
              <th className="px-4 py-3 text-right font-medium text-navy-600">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-navy-400"
                >
                  <BarChart3
                    size={32}
                    className="mx-auto mb-2 text-navy-200"
                  />
                  Nenhum diagnóstico encontrado
                </td>
              </tr>
            ) : (
              filtered.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-navy-50 hover:bg-navy-50/30"
                >
                  <td className="px-4 py-3 text-navy-600">
                    {new Date(d.started_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 font-medium text-navy-950">
                    {d.business_name || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-navy-800">
                      {d.nome} {d.sobrenome || ""}
                    </p>
                    <p className="text-xs text-navy-400">{d.email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        d.status === "completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : d.status === "in_progress"
                            ? "bg-blue-50 text-blue-700"
                            : "bg-gray-50 text-gray-500"
                      }`}
                    >
                      {d.status === "completed"
                        ? "Concluído"
                        : d.status === "in_progress"
                          ? "Em andamento"
                          : "Abandonado"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {d.classification ? (
                      <ClassificationBadge
                        classification={d.classification}
                        size="sm"
                      />
                    ) : (
                      <span className="text-navy-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {d.status === "completed" && (
                      <a
                        href={`/diagnostico-empresarial/resultado?session=${d.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-accent hover:underline"
                      >
                        <Eye size={14} />
                        Ver
                      </a>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
