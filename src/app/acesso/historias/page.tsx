"use client";

import { useEffect, useState } from "react";
import { Plus, Loader2, Trash2, Edit3, Trophy } from "lucide-react";
import {
  getStories,
  createStory,
  updateStory,
  deleteStory,
  type CustomerStory,
} from "@/lib/queries/stories";
import ImageUpload from "@/components/admin/ImageUpload";

const blank: Partial<CustomerStory> = {
  company_name: "",
  segment: "",
  contact_name: "",
  contact_role: "",
  challenge: "",
  solution: "",
  results: "",
  testimonial: "",
  status: "draft",
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function HistoriasPage() {
  const [items, setItems] = useState<CustomerStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<CustomerStory> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      setItems(await getStories());
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    if (!editing?.company_name) return;
    setSaving(true);
    try {
      const payload = {
        ...editing,
        slug: editing.slug || slugify(editing.company_name),
        ...(editing.status === "published" && !editing.published_at
          ? { published_at: new Date().toISOString() }
          : {}),
      };
      if (editing.id) await updateStory(editing.id, payload);
      else await createStory(payload);
      setEditing(null);
      load();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Histórias de Clientes</h1>
          <p className="mt-1 text-sm text-navy-400">{items.length} cases</p>
        </div>
        <button
          onClick={() => setEditing(blank)}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          <Plus size={16} /> Novo case
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <Trophy size={36} className="mx-auto mb-3 text-navy-600" />
          <p className="text-sm text-navy-400">Nenhum case ainda.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((s) => (
            <div key={s.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
              {s.cover_url && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={s.cover_url} alt="" className="h-32 w-full object-cover" />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-white">{s.company_name}</h3>
                    <p className="text-xs text-navy-500">{s.segment}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      s.status === "published"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {s.status === "published" ? "Publicado" : "Rascunho"}
                  </span>
                </div>
                {s.testimonial && (
                  <p className="mt-2 line-clamp-2 text-xs italic text-navy-400">
                    &ldquo;{s.testimonial}&rdquo;
                  </p>
                )}
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setEditing(s)}
                    className="flex items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10"
                  >
                    <Edit3 size={12} /> Editar
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Excluir case?")) deleteStory(s.id).then(load);
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
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-navy-900 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">
              {editing.id ? "Editar case" : "Novo case"}
            </h2>
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Nome da empresa</label>
                  <input
                    type="text"
                    value={editing.company_name || ""}
                    onChange={(e) => setEditing({ ...editing, company_name: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Segmento</label>
                  <input
                    type="text"
                    value={editing.segment || ""}
                    onChange={(e) => setEditing({ ...editing, segment: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Nome do contato</label>
                  <input
                    type="text"
                    value={editing.contact_name || ""}
                    onChange={(e) => setEditing({ ...editing, contact_name: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Cargo</label>
                  <input
                    type="text"
                    value={editing.contact_role || ""}
                    onChange={(e) => setEditing({ ...editing, contact_role: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-navy-400">Desafio</label>
                <textarea
                  value={editing.challenge || ""}
                  onChange={(e) => setEditing({ ...editing, challenge: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-navy-400">Solução</label>
                <textarea
                  value={editing.solution || ""}
                  onChange={(e) => setEditing({ ...editing, solution: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-navy-400">Resultados</label>
                <textarea
                  value={editing.results || ""}
                  onChange={(e) => setEditing({ ...editing, results: e.target.value })}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-navy-400">Depoimento curto</label>
                <textarea
                  value={editing.testimonial || ""}
                  onChange={(e) => setEditing({ ...editing, testimonial: e.target.value })}
                  rows={2}
                  className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <ImageUpload
                  value={editing.logo_url || null}
                  onChange={(url) => setEditing({ ...editing, logo_url: url })}
                  folder="stories"
                  label="Logo"
                />
                <ImageUpload
                  value={editing.cover_url || null}
                  onChange={(url) => setEditing({ ...editing, cover_url: url })}
                  folder="stories"
                  label="Capa"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs text-navy-400">Status</label>
                <select
                  value={editing.status}
                  onChange={(e) =>
                    setEditing({ ...editing, status: e.target.value as "draft" | "published" })
                  }
                  className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                >
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
              </div>
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
