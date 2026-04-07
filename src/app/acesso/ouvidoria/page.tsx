"use client";

import { useEffect, useState } from "react";
import RequireAdmin from "@/components/admin/RequireAdmin";
import {
  Loader2,
  MessageCircle,
  Search,
  Download,
  Shield,
  X,
  Trash2,
} from "lucide-react";
import {
  getOuvidorias,
  updateOuvidoriaStatus,
  deleteOuvidoria,
  type OuvidoriaMensagem,
  type OuvidoriaStatus,
  type OuvidoriaTipo,
} from "@/lib/queries/ouvidoria";
import { logOuvidoriaAccess } from "@/lib/queries/auditLog";

const TIPO_LABEL: Record<OuvidoriaTipo, { label: string; cls: string }> = {
  elogio: { label: "Elogio", cls: "bg-green-100 text-green-700" },
  sugestao: { label: "Sugestão", cls: "bg-blue-100 text-blue-700" },
  reclamacao: { label: "Reclamação", cls: "bg-yellow-100 text-yellow-700" },
  denuncia: { label: "Denúncia", cls: "bg-red-100 text-red-700" },
};

const STATUS_LABEL: Record<OuvidoriaStatus, { label: string; cls: string }> = {
  novo: { label: "Novo", cls: "bg-accent/15 text-accent" },
  lido: { label: "Lido", cls: "bg-gray-100 text-gray-700" },
  respondido: { label: "Respondido", cls: "bg-green-100 text-green-700" },
  arquivado: { label: "Arquivado", cls: "bg-gray-100 text-gray-500" },
};

export default function OuvidoriaPage() {
  return (
    <RequireAdmin>
      <OuvidoriaAdminPage />
    </RequireAdmin>
  );
}

function OuvidoriaAdminPage() {
  const [items, setItems] = useState<OuvidoriaMensagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<OuvidoriaStatus | "all">("all");
  const [filterTipo, setFilterTipo] = useState<OuvidoriaTipo | "all">("all");
  const [filterEmpresa, setFilterEmpresa] = useState<string>("all");
  const [filterIdentif, setFilterIdentif] = useState<"all" | "identificado" | "anonimo">("all");
  const [open, setOpen] = useState<OuvidoriaMensagem | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      setItems(await getOuvidorias());
    } finally {
      setLoading(false);
    }
  }

  const empresasUnicas = Array.from(new Set(items.map((i) => i.empresa).filter(Boolean))).sort();

  const filtered = items.filter((i) => {
    if (filterStatus !== "all" && i.status !== filterStatus) return false;
    if (filterTipo !== "all" && i.tipo !== filterTipo) return false;
    if (filterEmpresa !== "all" && i.empresa !== filterEmpresa) return false;
    if (filterIdentif === "identificado" && !i.identificado) return false;
    if (filterIdentif === "anonimo" && i.identificado) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        i.protocolo.toLowerCase().includes(q) ||
        i.empresa.toLowerCase().includes(q) ||
        (i.nome || "").toLowerCase().includes(q) ||
        i.mensagem.toLowerCase().includes(q)
      );
    }
    return true;
  });

  async function changeStatus(item: OuvidoriaMensagem, status: OuvidoriaStatus) {
    await updateOuvidoriaStatus(item.id, status);
    await logOuvidoriaAccess(item.id, "status_change", { from: item.status, to: status });
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, status } : i)));
    if (open?.id === item.id) setOpen({ ...item, status });
  }

  async function remove(item: OuvidoriaMensagem) {
    if (!confirm(`Excluir manifestação ${item.protocolo}?`)) return;
    await logOuvidoriaAccess(item.id, "delete", { protocolo: item.protocolo });
    await deleteOuvidoria(item.id);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    if (open?.id === item.id) setOpen(null);
  }

  function exportCsv() {
    // Log de exportação (atende LGPD art. 37 — registros de operações)
    Promise.all(filtered.map((i) => logOuvidoriaAccess(i.id, "export"))).catch(() => {});
    const header = [
      "Protocolo",
      "Data",
      "Status",
      "Empresa",
      "Cargo",
      "Identificado",
      "Nome",
      "Email",
      "Tipo",
      "Gravidade",
      "Resposta desejada",
      "Mensagem",
      "Sugestão de melhoria",
      "Já tentou resolver",
      "Ações tomadas",
      "Forma de contato",
    ];
    const formatFormaContato = (v: string | null) =>
      v === "reuniao" ? "Gostaria de uma reunião" : v === "nao_contatar" ? "Não gostaria de contato" : "";
    const rows = filtered.map((i) => [
      i.protocolo,
      new Date(i.created_at).toLocaleString("pt-BR"),
      STATUS_LABEL[i.status].label,
      i.empresa,
      i.cargo || "",
      i.identificado ? "Sim" : "Anônimo",
      i.nome || "",
      i.email || "",
      TIPO_LABEL[i.tipo].label,
      i.gravidade || "",
      i.resposta_desejada ? "Sim" : "Não",
      i.mensagem.replace(/\n/g, " "),
      (i.sugestao_melhoria || "").replace(/\n/g, " "),
      i.ja_tentou_resolver === null ? "" : i.ja_tentou_resolver ? "Sim" : "Não",
      (i.acoes_tomadas || "").replace(/\n/g, " "),
      formatFormaContato(i.forma_contato),
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ouvidoria-ija-${Date.now()}.csv`;
    a.click();
  }

  const novosCount = items.filter((i) => i.status === "novo").length;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-navy-950">
            <Shield className="text-accent" size={24} />
            Ouvidoria
          </h1>
          <p className="mt-1 text-sm text-navy-600">
            {items.length} manifestações · {novosCount} novas
          </p>
        </div>
        <button
          onClick={exportCsv}
          disabled={!filtered.length}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-50"
        >
          <Download size={16} /> Exportar CSV
        </button>
      </div>

      {/* Filtros */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar protocolo, empresa, nome ou mensagem..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-navy-950 placeholder-gray-400 focus:border-accent focus:outline-none"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as OuvidoriaStatus | "all")}
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-navy-950"
        >
          <option value="all">Todos status</option>
          <option value="novo">Novos</option>
          <option value="lido">Lidos</option>
          <option value="respondido">Respondidos</option>
          <option value="arquivado">Arquivados</option>
        </select>
        <select
          value={filterTipo}
          onChange={(e) => setFilterTipo(e.target.value as OuvidoriaTipo | "all")}
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-navy-950"
        >
          <option value="all">Todos tipos</option>
          <option value="elogio">Elogio</option>
          <option value="sugestao">Sugestão</option>
          <option value="reclamacao">Reclamação</option>
          <option value="denuncia">Denúncia</option>
        </select>
        <select
          value={filterEmpresa}
          onChange={(e) => setFilterEmpresa(e.target.value)}
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-navy-950"
        >
          <option value="all">Todas empresas</option>
          {empresasUnicas.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
        <select
          value={filterIdentif}
          onChange={(e) => setFilterIdentif(e.target.value as "all" | "identificado" | "anonimo")}
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-navy-950"
        >
          <option value="all">Identificados + Anônimos</option>
          <option value="identificado">Só identificados</option>
          <option value="anonimo">Só anônimos</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-12 text-center">
          <MessageCircle size={36} className="mx-auto mb-3 text-gray-400" />
          <p className="text-sm text-navy-600">Nenhuma manifestação encontrada.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600">Protocolo</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600">Data</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600">Empresa</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600">Tipo</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600">De</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((i) => (
                <tr
                  key={i.id}
                  onClick={() => {
                    setOpen(i);
                    logOuvidoriaAccess(i.id, "view");
                    if (i.status === "novo") changeStatus(i, "lido");
                  }}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-accent">
                    {i.protocolo}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-navy-600">
                    {new Date(i.created_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-4 py-3 text-sm text-navy-950">{i.empresa}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${TIPO_LABEL[i.tipo].cls}`}
                    >
                      {TIPO_LABEL[i.tipo].label}
                    </span>
                    {i.gravidade && (
                      <span className="ml-1 text-[10px] uppercase text-red-600">
                        · {i.gravidade}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${STATUS_LABEL[i.status].cls}`}
                    >
                      {STATUS_LABEL[i.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-navy-600">
                    {i.identificado ? i.nome || i.email : <em className="text-navy-400">Anônimo</em>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Drawer de detalhe */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/40 p-4">
          <div className="max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
              <div>
                <p className="font-mono text-sm text-accent">{open.protocolo}</p>
                <p className="text-xs text-navy-500">
                  {new Date(open.created_at).toLocaleString("pt-BR")}
                </p>
              </div>
              <button onClick={() => setOpen(null)} className="rounded-lg p-2 hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="flex flex-wrap gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${TIPO_LABEL[open.tipo].cls}`}>
                  {TIPO_LABEL[open.tipo].label}
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_LABEL[open.status].cls}`}>
                  {STATUS_LABEL[open.status].label}
                </span>
                {open.gravidade && (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    Gravidade {open.gravidade}
                  </span>
                )}
                {open.identificado ? (
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    Identificado
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                    Anônimo
                  </span>
                )}
              </div>

              <DetailRow label="Empresa" value={open.empresa} />
              {open.cargo && <DetailRow label="Cargo" value={open.cargo} />}
              {open.nome && <DetailRow label="Nome" value={open.nome} />}
              {open.email && (
                <DetailRow
                  label="Email"
                  value={
                    <a href={`mailto:${open.email}`} className="text-accent hover:underline">
                      {open.email}
                    </a>
                  }
                />
              )}
              <DetailRow
                label="Deseja resposta"
                value={open.resposta_desejada ? "Sim" : "Não / desabafo"}
              />

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-navy-500">
                  Manifestação
                </p>
                <p className="whitespace-pre-wrap rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-navy-800">
                  {open.mensagem}
                </p>
              </div>

              {open.sugestao_melhoria && (
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-navy-500">
                    Sugestão de melhoria
                  </p>
                  <p className="whitespace-pre-wrap rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-navy-800">
                    {open.sugestao_melhoria}
                  </p>
                </div>
              )}

              {open.ja_tentou_resolver !== null && (
                <DetailRow
                  label="Tentou resolver com superior/colega?"
                  value={open.ja_tentou_resolver ? "Sim" : "Não"}
                />
              )}

              {open.acoes_tomadas && (
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-navy-500">
                    Ações tomadas
                  </p>
                  <p className="whitespace-pre-wrap rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-navy-800">
                    {open.acoes_tomadas}
                  </p>
                </div>
              )}

              {open.forma_contato && (
                <DetailRow
                  label="Forma de contato preferida"
                  value={open.forma_contato === "reuniao" ? "Reunião" : "Não deseja contato"}
                />
              )}

              <div className="flex flex-wrap gap-2 border-t border-gray-200 pt-4">
                {(["novo", "lido", "respondido", "arquivado"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => changeStatus(open, s)}
                    disabled={open.status === s}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                      open.status === s
                        ? "bg-accent text-white"
                        : "border border-gray-200 text-navy-700 hover:bg-gray-50"
                    }`}
                  >
                    {STATUS_LABEL[s].label}
                  </button>
                ))}
                <button
                  onClick={() => remove(open)}
                  className="ml-auto flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={12} /> Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-100 pb-2 text-sm">
      <span className="text-navy-500">{label}</span>
      <span className="text-right text-navy-950">{value}</span>
    </div>
  );
}
