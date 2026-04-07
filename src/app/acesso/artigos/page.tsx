"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PenSquare,
  Search,
  FileText,
  MoreVertical,
  Trash2,
  Edit3,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { getArticles, deleteArticle, type Article } from "@/lib/queries/blog";
import { BLOG_CATEGORIES } from "@/lib/constants";

export default function ArticlesListPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    try {
      const data = await getArticles();
      setArticles(data);
    } catch {
      setError("Erro ao carregar artigos. Verifique a tabela no Supabase.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Tem certeza que deseja excluir este artigo?")) return;
    try {
      await deleteArticle(id);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setError("Erro ao excluir.");
    }
    setMenuOpen(null);
  }

  const filtered = articles.filter((a) => {
    if (filter !== "all" && a.status !== filter) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const getCategoryName = (slug: string) =>
    BLOG_CATEGORIES.find((c) => c.slug === slug)?.name || slug;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-950">Artigos</h1>
          <p className="mt-1 text-sm text-navy-600">
            {articles.length} artigo{articles.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/acesso/artigos/novo"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-accent-dark"
        >
          <PenSquare size={16} />
          Novo artigo
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-500"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar artigos..."
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-navy-950 placeholder-gray-400 focus:border-accent focus:outline-none"
          />
        </div>
        <div className="flex gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
          {(["all", "published", "draft"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f
                  ? "bg-accent text-navy-950"
                  : "text-navy-600 hover:text-navy-950"
              }`}
            >
              {f === "all" ? "Todos" : f === "published" ? "Publicados" : "Rascunhos"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 px-5 py-16 text-center">
          <FileText size={40} className="mx-auto mb-3 text-navy-600" />
          <p className="text-navy-600">
            {search || filter !== "all"
              ? "Nenhum artigo encontrado."
              : "Nenhum artigo criado ainda."}
          </p>
          {!search && filter === "all" && (
            <Link
              href="/acesso/artigos/novo"
              className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:text-accent-dark"
            >
              <PenSquare size={14} />
              Criar primeiro artigo
            </Link>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600">
                  Artigo
                </th>
                <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600 md:table-cell">
                  Categoria
                </th>
                <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600 sm:table-cell">
                  Status
                </th>
                <th className="hidden px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-navy-600 lg:table-cell">
                  Data
                </th>
                <th className="w-10 px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.map((article) => (
                <tr
                  key={article.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <Link
                      href={`/acesso/artigos/editar?id=${article.id}`}
                      className="block"
                    >
                      <p className="font-medium text-navy-950 hover:text-accent transition-colors">
                        {article.title}
                      </p>
                      {article.excerpt && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-navy-500">
                          {article.excerpt}
                        </p>
                      )}
                    </Link>
                  </td>
                  <td className="hidden px-5 py-4 md:table-cell">
                    <span className="text-xs text-navy-600">
                      {article.category
                        ? getCategoryName(article.category)
                        : "—"}
                    </span>
                  </td>
                  <td className="hidden px-5 py-4 sm:table-cell">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                        article.status === "published"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          article.status === "published"
                            ? "bg-green-400"
                            : "bg-yellow-400"
                        }`}
                      />
                      {article.status === "published"
                        ? "Publicado"
                        : "Rascunho"}
                    </span>
                  </td>
                  <td className="hidden px-5 py-4 lg:table-cell">
                    <span className="text-xs text-navy-500">
                      {new Date(article.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </td>
                  <td className="relative px-5 py-4">
                    <button
                      onClick={() =>
                        setMenuOpen(
                          menuOpen === article.id ? null : article.id
                        )
                      }
                      className="rounded p-1 text-navy-600 transition-colors hover:text-navy-950"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {menuOpen === article.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setMenuOpen(null)}
                        />
                        <div className="absolute right-5 top-full z-20 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-xl">
                          <Link
                            href={`/acesso/artigos/editar?id=${article.id}`}
                            onClick={() => setMenuOpen(null)}
                            className="flex items-center gap-2 px-3 py-2 text-sm text-navy-700 hover:bg-gray-50 hover:text-navy-950"
                          >
                            <Edit3 size={14} />
                            Editar
                          </Link>
                          {article.status === "published" && (
                            <a
                              href={`/blog/${article.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setMenuOpen(null)}
                              className="flex items-center gap-2 px-3 py-2 text-sm text-navy-700 hover:bg-gray-50 hover:text-navy-950"
                            >
                              <ExternalLink size={14} />
                              Ver no site
                            </a>
                          )}
                          <button
                            onClick={() => handleDelete(article.id)}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                            Excluir
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
