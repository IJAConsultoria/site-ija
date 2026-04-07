"use client";

import { useState } from "react";
import { MessageSquare, Loader2, CheckCircle2 } from "lucide-react";
import { createComment, type BlogComment } from "@/lib/queries/comments";

interface Props {
  articleId: string;
  initialComments: BlogComment[];
}

export default function CommentSection({ articleId, initialComments }: Props) {
  const [comments] = useState<BlogComment[]>(initialComments);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !comment) return;
    setSubmitting(true);
    setError("");
    try {
      await createComment({
        article_id: articleId,
        name,
        email,
        phone: phone || undefined,
        comment,
      });
      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setComment("");
    } catch {
      setError("Erro ao enviar comentário. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mt-16 border-t border-navy-200 pt-12">
      <div className="mb-8 flex items-center gap-2">
        <MessageSquare className="text-accent" size={22} />
        <h2 className="text-2xl font-bold text-navy-950">
          Comentários ({comments.length})
        </h2>
      </div>

      {/* Form */}
      <div className="mb-10 rounded-2xl border border-navy-100 bg-white p-6 lg:p-8">
        {submitted ? (
          <div className="flex items-center gap-3 text-sm text-green-700">
            <CheckCircle2 size={20} />
            <p>
              Comentário enviado! Aparecerá após aprovação da nossa equipe.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <h3 className="font-semibold text-navy-950">Deixe seu comentário</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome *"
                className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-950 focus:border-accent focus:outline-none"
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu email *"
                className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-950 focus:border-accent focus:outline-none"
              />
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefone (opcional)"
              className="w-full rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-950 focus:border-accent focus:outline-none"
            />
            <textarea
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Seu comentário *"
              rows={4}
              className="w-full resize-none rounded-lg border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-950 focus:border-accent focus:outline-none"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-50"
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              Enviar comentário
            </button>
          </form>
        )}
      </div>

      {/* List */}
      {comments.length === 0 ? (
        <p className="text-sm text-navy-500">Seja o primeiro a comentar.</p>
      ) : (
        <div className="space-y-6">
          {comments.map((c) => (
            <div key={c.id} className="rounded-2xl border border-navy-100 bg-white p-5">
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  {c.name[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-950">{c.name}</p>
                  <p className="text-xs text-navy-500">
                    {new Date(c.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
              <p className="whitespace-pre-wrap text-sm text-navy-700">{c.comment}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
