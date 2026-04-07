"use client";

import { useEffect, useState } from "react";
import { Plus, Loader2, Trash2, Edit3, Megaphone } from "lucide-react";
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  type SiteBanner,
  type BannerPosition,
} from "@/lib/queries/banners";
import ImageUpload from "@/components/admin/ImageUpload";

const blank: Partial<SiteBanner> = {
  title: "",
  description: "",
  cta_text: "Saiba mais",
  cta_url: "",
  display_mode: "banner",
  position: "below-header",
  dismissible: true,
  bg_color: "#A68523",
  text_color: "#FFFFFF",
  active: true,
  priority: 0,
};

const POSITIONS: { value: BannerPosition; label: string }[] = [
  { value: "above-header", label: "Acima do header (top bar)" },
  { value: "below-header", label: "Abaixo do header" },
  { value: "floating-bottom", label: "Flutuante (rodapé)" },
  { value: "popup-center", label: "Popup central" },
  { value: "popup-side", label: "Popup lateral" },
];

export default function BannersPage() {
  const [items, setItems] = useState<SiteBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<SiteBanner> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      setItems(await getBanners());
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    if (!editing?.title) return;
    setSaving(true);
    try {
      if (editing.id) await updateBanner(editing.id, editing);
      else await createBanner(editing);
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
          <h1 className="text-2xl font-bold text-white">Banners do Site</h1>
          <p className="mt-1 text-sm text-navy-400">{items.length} banners</p>
        </div>
        <button
          onClick={() => setEditing(blank)}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
        >
          <Plus size={16} /> Novo banner
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <Megaphone size={36} className="mx-auto mb-3 text-navy-600" />
          <p className="text-sm text-navy-400">Nenhum banner ainda.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((b) => (
            <div key={b.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div
                className="mb-3 rounded-lg p-3 text-sm"
                style={{ backgroundColor: b.bg_color, color: b.text_color }}
              >
                <strong>{b.title}</strong>
                {b.description && <span className="ml-2 opacity-90">— {b.description}</span>}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="rounded bg-white/5 px-2 py-0.5 text-navy-400">{b.position}</span>
                  <span className="rounded bg-white/5 px-2 py-0.5 text-navy-400">prioridade {b.priority}</span>
                  <span
                    className={`rounded px-2 py-0.5 ${
                      b.active ? "bg-green-500/10 text-green-400" : "bg-navy-700 text-navy-400"
                    }`}
                  >
                    {b.active ? "Ativo" : "Inativo"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditing(b)}
                    className="flex items-center gap-1 rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white hover:bg-white/10"
                  >
                    <Edit3 size={12} /> Editar
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Excluir banner?")) deleteBanner(b.id).then(load);
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
              {editing.id ? "Editar banner" : "Novo banner"}
            </h2>
            <div className="space-y-4">
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
                  rows={2}
                  className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Texto do botão</label>
                  <input
                    type="text"
                    value={editing.cta_text || ""}
                    onChange={(e) => setEditing({ ...editing, cta_text: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-navy-400">URL do botão</label>
                  <input
                    type="text"
                    value={editing.cta_url || ""}
                    onChange={(e) => setEditing({ ...editing, cta_url: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Modo</label>
                  <select
                    value={editing.display_mode}
                    onChange={(e) =>
                      setEditing({ ...editing, display_mode: e.target.value as "banner" | "popup" })
                    }
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  >
                    <option value="banner">Barra (banner)</option>
                    <option value="popup">Popup</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Posição</label>
                  <select
                    value={editing.position}
                    onChange={(e) =>
                      setEditing({ ...editing, position: e.target.value as BannerPosition })
                    }
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  >
                    {POSITIONS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Cor de fundo</label>
                  <input
                    type="color"
                    value={editing.bg_color || "#A68523"}
                    onChange={(e) => setEditing({ ...editing, bg_color: e.target.value })}
                    className="h-10 w-full rounded-lg border border-white/10 bg-navy-950"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Cor do texto</label>
                  <input
                    type="color"
                    value={editing.text_color || "#FFFFFF"}
                    onChange={(e) => setEditing({ ...editing, text_color: e.target.value })}
                    className="h-10 w-full rounded-lg border border-white/10 bg-navy-950"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Início (opcional)</label>
                  <input
                    type="datetime-local"
                    value={editing.start_date?.slice(0, 16) || ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        start_date: e.target.value ? new Date(e.target.value).toISOString() : null,
                      })
                    }
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Fim (opcional)</label>
                  <input
                    type="datetime-local"
                    value={editing.end_date?.slice(0, 16) || ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        end_date: e.target.value ? new Date(e.target.value).toISOString() : null,
                      })
                    }
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-navy-400">Prioridade</label>
                  <input
                    type="number"
                    value={editing.priority || 0}
                    onChange={(e) => setEditing({ ...editing, priority: Number(e.target.value) })}
                    className="w-full rounded-lg border border-white/10 bg-navy-950 px-3 py-2 text-sm text-white"
                  />
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

              <label className="flex items-center gap-2 text-sm text-white">
                <input
                  type="checkbox"
                  checked={editing.dismissible || false}
                  onChange={(e) => setEditing({ ...editing, dismissible: e.target.checked })}
                />
                Pode ser fechado pelo usuário
              </label>

              <ImageUpload
                value={editing.image_url || null}
                onChange={(url) => setEditing({ ...editing, image_url: url })}
                folder="banners"
                label="Imagem (popups)"
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
