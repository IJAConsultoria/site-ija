"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, Download, Search } from "lucide-react";
import { getAllLeads, type LeadEntry } from "@/lib/queries/leads";

export default function LeadsPage() {
  const [leads, setLeads] = useState<LeadEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [source, setSource] = useState<string>("all");

  useEffect(() => {
    getAllLeads()
      .then(setLeads)
      .finally(() => setLoading(false));
  }, []);

  const sources = Array.from(new Set(leads.map((l) => l.source))).sort();

  const filtered = leads.filter((l) => {
    if (source !== "all" && l.source !== source) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.phone || "").includes(q) ||
        (l.business || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  function exportCsv() {
    const header = ["Origem", "Data", "Nome", "Email", "Telefone", "Empresa", "UTM Source", "UTM Campaign"];
    const rows = filtered.map((l) => [
      l.source,
      new Date(l.created_at).toLocaleString("pt-BR"),
      l.name,
      l.email,
      l.phone || "",
      l.business || "",
      l.utm_source || "",
      l.utm_campaign || "",
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-ija-${Date.now()}.csv`;
    a.click();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-950">Email Marketing</h1>
          <p className="mt-1 text-sm text-navy-600">{leads.length} leads totais</p>
        </div>
        <button
          onClick={exportCsv}
          disabled={!filtered.length}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-navy-950 hover:bg-accent-dark disabled:opacity-50"
        >
          <Download size={16} /> Exportar CSV
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, email, telefone..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-navy-950 placeholder-gray-400 focus:border-accent focus:outline-none"
          />
        </div>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-navy-950"
        >
          <option value="all">Todas as origens</option>
          {sources.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-12 text-center">
          <Mail size={36} className="mx-auto mb-3 text-navy-600" />
          <p className="text-sm text-navy-600">Nenhum lead encontrado.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600">Data</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600">Nome</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600">Contato</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600">Origem</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600">UTM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.slice(0, 200).map((l) => (
                <tr key={l.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-navy-600">
                    {new Date(l.created_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 text-sm text-navy-950">
                    <p className="font-medium">{l.name}</p>
                    {l.business && <p className="text-xs text-navy-500">{l.business}</p>}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    <p className="text-navy-700">{l.email}</p>
                    {l.phone && <p className="text-navy-500">{l.phone}</p>}
                  </td>
                  <td className="px-4 py-3 text-xs text-navy-600">{l.source}</td>
                  <td className="px-4 py-3 text-xs text-navy-500">
                    {l.utm_source || "—"}
                    {l.utm_campaign && <span> / {l.utm_campaign}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length > 200 && (
            <p className="border-t border-gray-200 px-4 py-3 text-center text-xs text-navy-500">
              Mostrando 200 de {filtered.length}. Use o filtro ou exporte CSV pra ver todos.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
