"use client";

import { useEffect, useState } from "react";
import { Check, X, Trash2, Loader2, MessageSquare } from "lucide-react";
import {
  getComments,
  updateCommentStatus,
  deleteComment,
  type BlogComment,
  type CommentStatus,
} from "@/lib/queries/comments";

type CommentRow = BlogComment & { articles_ija: { title: string; slug: string } | null };

export default function ComentariosPage() {
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<CommentStatus | "all">("pending");
  const [error, setError] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const data = await getComments();
      setComments(data);
    } catch {
      setError("Erro ao carregar comentários");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatus(id: string, status: CommentStatus) {
    await updateCommentStatus(id, status);
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este comentário?")) return;
    await deleteComment(id);
    setComments((prev) => prev.filter((c) => c.id !== id));
  }

  const filtered = comments.filter((c) => filter === "all" || c.status === filter);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-950">Comentários</h1>
        <p className="mt-1 text-sm text-navy-600">Modere os comentários do blog</p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      <div className="mb-4 flex gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1 w-fit">
        {(["pending", "approved", "rejected", "all"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f ? "bg-accent text-navy-950" : "text-navy-600 hover:text-navy-950"
            }`}
          >
            {f === "pending"
              ? "Pendentes"
              : f === "approved"
                ? "Aprovados"
                : f === "rejected"
                  ? "Rejeitados"
                  : "Todos"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-12 text-center">
          <MessageSquare size={36} className="mx-auto mb-3 text-navy-600" />
          <p className="text-sm text-navy-600">Nenhum comentário {filter !== "all" ? filter : ""}.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => (
            <div key={c.id} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-navy-950">{c.name}</p>
                  <p className="text-xs text-navy-500">
                    {c.email} {c.phone && `• ${c.phone}`}
                  </p>
                  <p className="mt-0.5 text-xs text-navy-500">
                    em <span className="text-accent">{c.articles_ija?.title || "—"}</span> •{" "}
                    {new Date(c.created_at).toLocaleString("pt-BR")}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                    c.status === "approved"
                      ? "bg-green-50 text-green-700"
                      : c.status === "rejected"
                        ? "bg-red-50 text-red-600"
                        : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {c.status === "approved"
                    ? "Aprovado"
                    : c.status === "rejected"
                      ? "Rejeitado"
                      : "Pendente"}
                </span>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm text-navy-800">{c.comment}</p>
              <div className="mt-4 flex gap-2">
                {c.status !== "approved" && (
                  <button
                    onClick={() => handleStatus(c.id, "approved")}
                    className="flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1.5 text-xs text-green-700 hover:bg-green-100"
                  >
                    <Check size={12} /> Aprovar
                  </button>
                )}
                {c.status !== "rejected" && (
                  <button
                    onClick={() => handleStatus(c.id, "rejected")}
                    className="flex items-center gap-1 rounded-lg bg-yellow-50 px-3 py-1.5 text-xs text-yellow-700 hover:bg-yellow-100"
                  >
                    <X size={12} /> Rejeitar
                  </button>
                )}
                <button
                  onClick={() => handleDelete(c.id)}
                  className="ml-auto flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={12} /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
