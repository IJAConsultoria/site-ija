"use client";

import { useEffect, useState } from "react";
import { Plus, Loader2, Trash2, Edit3, Download } from "lucide-react";
import {
  getLeadMagnets,
  createLeadMagnet,
  updateLeadMagnet,
  deleteLeadMagnet,
  type LeadMagnet,
} from "@/lib/queries/leadMagnets";
import ImageUpload from "@/components/admin/ImageUpload";
import { uploadFile } from "@/lib/storage";

const blank: Partial<LeadMagnet> = {
  type: "pdf",
  title: "",
  description: "",
  cta_text: "Baixar agora",
  cta_url: "",
  file_url: "",
  cover_url: "",
  active: true,
};

export default function IscasPage() {
  const [items, setItems] = useState<LeadMagnet[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<LeadMagnet> | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      setItems(await getLeadMagnets());
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    if (!editing?.title) return;
    setSaving(true);
    try {
      if (editing.id) await updateLeadMagnet(editing.id, editing);
      else await createLeadMagnet(editing);
      setEditing(null);
      load();
    } finally {
      setSaving(false);
    }
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFile(true);
    try {
      const url = await uploadFile(file, "lead-magnets");
      setEditing((prev) => ({ ...prev!, file_url: url }));
    } finally {
      setUploadingFile(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Iscas Digitais</h1>
          <p className="mt-1 text-sm text-navy-400">{items.length} iscas</p>
        </div>
        <button
          onClick={() => setEditing(blank)}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          <Plus size={16} /> Nova isca
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <Download size={36} className="mx-auto mb-3 text-navy-600" />
          <p className="text-sm text-navy-400">Nenhuma isca digital ainda.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <div key={m.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              {m.cover_url && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={m.cover_url} alt="" className="h-32 w-full object-cover" />
              )}
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-white">{m.title}</h3>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      m.active ? "bg-green-500/10 text-green-400" : "bg-navy-700 text-navy-400"
                    }`}
                  >
                    {m.active ? "Ativo" : "Inativo"}
                  </span>
                </div>
                <p className="line-clamp-2 text-xs text-navy-400">{m.description}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setEditing(m)}
                    className="flex items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10"
                  >
                    <Edit3 size={12} /> Editar
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Excluir isca?")) deleteLeadMagnet(m.id).then(load);
                    }}
                    className="flex items-center gap-1 rounded-lg bg-red-500/10 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-navy-900 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">
              {editing.id ? "Editar isca" : "Nova isca digital"}
            </h2>
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Tipo</label>
                  <select
                    value={editing.type}
                    onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  >
                    <option value="pdf">PDF / E-book</option>
                    <option value="video">Vídeo</option>
                    <option value="webinar">Webinar</option>
                    <option value="planilha">Planilha</option>
                    <option value="checklist">Checklist</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Status</label>
                  <select
                    value={editing.active ? "true" : "false"}
                    onChange={(e) => setEditing({ ...editing, active: e.target.value === "true" })}
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  >
                    <option value="true">Ativo</option>
                    <option value="false">Inativo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-navy-400">Título</label>
                <input
                  type="text"
                  value={editing.title || ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-navy-400">Descrição</label>
                <textarea
                  value={editing.description || ""}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Texto do CTA</label>
                  <input
                    type="text"
                    value={editing.cta_text || ""}
                    onChange={(e) => setEditing({ ...editing, cta_text: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-navy-400">URL do CTA (form)</label>
                  <input
                    type="text"
                    value={editing.cta_url || ""}
                    onChange={(e) => setEditing({ ...editing, cta_url: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-navy-400">Arquivo (PDF/etc)</label>
                <input type="file" onChange={handleFile} disabled={uploadingFile} className="text-xs text-navy-400" />
                {editing.file_url && (
                  <p className="mt-1 truncate text-xs text-green-400">✓ {editing.file_url}</p>
                )}
              </div>

              <ImageUpload
                value={editing.cover_url || null}
                onChange={(url) => setEditing({ ...editing, cover_url: url || "" })}
                folder="lead-magnets"
                label="Imagem de capa"
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setEditing(null)}
                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/5"
              >
                Cancelar
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
