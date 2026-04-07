"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  PenSquare,
  Eye,
  Clock,
  TrendingUp,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { getArticles, getArticleStats, type Article } from "@/lib/queries/blog";

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [statsData, articles] = await Promise.all([
          getArticleStats(),
          getArticles(),
        ]);
        setStats(statsData);
        setRecentArticles(articles.slice(0, 5));
      } catch {
        setError(
          "Erro ao carregar dados. Verifique se as tabelas do Supabase foram criadas."
        );
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statCards = [
    {
      label: "Total de Artigos",
      value: stats.total,
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Publicados",
      value: stats.published,
      icon: Eye,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Rascunhos",
      value: stats.drafts,
      icon: Clock,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Painel</h1>
          <p className="mt-1 text-sm text-navy-400">
            Gerencie o conteúdo do blog do IJA
          </p>
        </div>
        <Link
          href="/acesso/artigos/novo"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          <PenSquare size={16} />
          Novo artigo
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
          <p className="text-sm text-yellow-400">{error}</p>
          <p className="mt-2 text-xs text-yellow-500/80">
            Execute o SQL de migração no Supabase para criar a tabela{" "}
            <code className="rounded bg-white/5 px-1">articles</code>.
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}
                  >
                    <stat.icon size={18} className={stat.color} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-navy-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Articles */}
          <div className="rounded-xl border border-white/10 bg-white/5">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="font-semibold text-white">Artigos recentes</h2>
              <Link
                href="/acesso/artigos"
                className="flex items-center gap-1 text-xs text-accent hover:text-accent-dark"
              >
                Ver todos <ArrowRight size={12} />
              </Link>
            </div>

            {recentArticles.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <FileText
                  size={32}
                  className="mx-auto mb-3 text-navy-600"
                />
                <p className="text-sm text-navy-400">
                  Nenhum artigo ainda.
                </p>
                <Link
                  href="/acesso/artigos/novo"
                  className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark"
                >
                  <PenSquare size={14} />
                  Criar primeiro artigo
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {recentArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/acesso/artigos/editar?id=${article.id}`}
                    className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-white/5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        {article.title}
                      </p>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-navy-500">
                        <span>{article.category || "Sem categoria"}</span>
                        <span>
                          {new Date(article.created_at).toLocaleDateString(
                            "pt-BR"
                          )}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`ml-3 shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                        article.status === "published"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {article.status === "published"
                        ? "Publicado"
                        : "Rascunho"}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/acesso/artigos/novo"
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-accent/30 hover:bg-accent/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <PenSquare size={20} />
              </div>
              <div>
                <p className="font-semibold text-white">Escrever artigo</p>
                <p className="text-xs text-navy-400">
                  Crie conteúdo para o blog do IJA
                </p>
              </div>
            </Link>

            <a
              href="/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-accent/30 hover:bg-accent/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="font-semibold text-white">Ver blog</p>
                <p className="text-xs text-navy-400">
                  Visualize como os artigos aparecem no site
                </p>
              </div>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
