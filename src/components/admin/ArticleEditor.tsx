"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  Send,
  ArrowLeft,
  Eye,
  ChevronDown,
  Loader2,
  Trash2,
} from "lucide-react";
import TiptapEditor from "./TiptapEditor";
import ImageUpload from "./ImageUpload";
import { BLOG_CATEGORIES } from "@/lib/constants";
import {
  createArticle,
  updateArticle,
  deleteArticle,
  type Article,
} from "@/lib/queries/blog";

interface ArticleEditorProps {
  article?: Article;
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function ArticleEditor({ article }: ArticleEditorProps) {
  const router = useRouter();
  const isEditing = !!article;

  const [title, setTitle] = useState(article?.title || "");
  const [slug, setSlug] = useState(article?.slug || "");
  const [excerpt, setExcerpt] = useState(article?.excerpt || "");
  const [content, setContent] = useState(article?.content || "");
  const [coverUrl, setCoverUrl] = useState(article?.cover_url || "");
  const [category, setCategory] = useState(article?.category || "");
  const [tagsInput, setTagsInput] = useState(
    article?.tags?.join(", ") || ""
  );
  const [metaTitle, setMetaTitle] = useState(article?.meta_title || "");
  const [metaDescription, setMetaDescription] = useState(
    article?.meta_description || ""
  );
  const [ctaEnabled, setCtaEnabled] = useState(article?.cta_enabled || false);
  const [ctaTitle, setCtaTitle] = useState(article?.cta_title || "");
  const [ctaDescription, setCtaDescription] = useState(article?.cta_description || "");
  const [ctaButtonText, setCtaButtonText] = useState(article?.cta_button_text || "");
  const [ctaButtonUrl, setCtaButtonUrl] = useState(article?.cta_button_url || "");
  const [ctaImage, setCtaImage] = useState<string | null>(article?.cta_image || null);
  const [showCta, setShowCta] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showSeo, setShowSeo] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing || !article?.slug) {
      setSlug(generateSlug(value));
    }
  };

  const prepareTags = () =>
    tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

  const handleSave = async (status: "draft" | "published") => {
    if (!title.trim()) {
      setError("O título é obrigatório.");
      return;
    }
    if (!content.trim()) {
      setError("O conteúdo é obrigatório.");
      return;
    }

    const isPublishing = status === "published";
    isPublishing ? setPublishing(true) : setSaving(true);
    setError("");

    try {
      const articleData = {
        title: title.trim(),
        slug: slug || generateSlug(title),
        excerpt: excerpt.trim(),
        content,
        cover_url: coverUrl.trim() || null,
        category,
        tags: prepareTags(),
        status,
        author: "João Pedro Alves",
        meta_title: metaTitle.trim() || null,
        meta_description: metaDescription.trim() || null,
        cta_enabled: ctaEnabled,
        cta_title: ctaTitle.trim() || null,
        cta_description: ctaDescription.trim() || null,
        cta_button_text: ctaButtonText.trim() || null,
        cta_button_url: ctaButtonUrl.trim() || null,
        cta_image: ctaImage,
        ...(status === "published" && !article?.published_at
          ? { published_at: new Date().toISOString() }
          : {}),
      };

      if (isEditing && article) {
        await updateArticle(article.id, articleData);
      } else {
        await createArticle(articleData);
      }

      router.push("/acesso/artigos");
      router.refresh();
    } catch {
      setError("Erro ao salvar. Verifique a conexão com o Supabase.");
    } finally {
      setSaving(false);
      setPublishing(false);
    }
  };

  const handleDelete = async () => {
    if (!article) return;
    if (!window.confirm("Tem certeza que deseja excluir este artigo?")) return;

    setDeleting(true);
    try {
      await deleteArticle(article.id);
      router.push("/acesso/artigos");
      router.refresh();
    } catch {
      setError("Erro ao excluir.");
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => router.push("/acesso/artigos")}
          className="flex items-center gap-2 text-sm text-navy-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        <div className="flex items-center gap-2">
          {isEditing && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
            >
              {deleting ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Trash2 size={14} />
              )}
              Excluir
            </button>
          )}

          <button
            onClick={() => handleSave("draft")}
            disabled={saving || publishing}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/5"
          >
            {saving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Save size={14} />
            )}
            Salvar rascunho
          </button>

          <button
            onClick={() => handleSave("published")}
            disabled={saving || publishing}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            {publishing ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Send size={14} />
            )}
            Publicar
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main content */}
        <div className="space-y-4">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Título do artigo"
            className="w-full bg-transparent text-3xl font-bold text-white placeholder-navy-600 focus:outline-none"
          />

          {/* Excerpt */}
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Resumo do artigo (aparece nas listagens e SEO)"
            rows={2}
            className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-navy-500 focus:border-accent focus:outline-none"
          />

          {/* Editor */}
          <TiptapEditor content={content} onChange={setContent} />
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Status */}
          {isEditing && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-navy-400">
                Status
              </p>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                  article?.status === "published"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-yellow-500/10 text-yellow-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    article?.status === "published"
                      ? "bg-green-400"
                      : "bg-yellow-400"
                  }`}
                />
                {article?.status === "published" ? "Publicado" : "Rascunho"}
              </span>
            </div>
          )}

          {/* Category */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-navy-400">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-navy-900 px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
            >
              <option value="">Selecione...</option>
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-navy-400">
              Tags
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="CMV, Lucro, Finanças"
              className="w-full rounded-lg border border-white/10 bg-navy-900 px-3 py-2 text-sm text-white placeholder-navy-500 focus:border-accent focus:outline-none"
            />
            <p className="mt-1 text-[11px] text-navy-500">
              Separe com vírgula
            </p>
          </div>

          {/* Cover */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <ImageUpload
              value={coverUrl || null}
              onChange={(url) => setCoverUrl(url || "")}
              folder="articles"
              label="Imagem de capa"
            />
          </div>

          {/* CTA Banner */}
          <div className="rounded-lg border border-white/10 bg-white/5">
            <button
              type="button"
              onClick={() => setShowCta(!showCta)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-navy-400">
                CTA Banner
                {ctaEnabled && (
                  <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-[9px] text-green-400">
                    ON
                  </span>
                )}
              </span>
              <ChevronDown
                size={14}
                className={`text-navy-400 transition-transform ${showCta ? "rotate-180" : ""}`}
              />
            </button>
            {showCta && (
              <div className="space-y-3 border-t border-white/10 p-4">
                <label className="flex items-center gap-2 text-xs text-white">
                  <input
                    type="checkbox"
                    checked={ctaEnabled}
                    onChange={(e) => setCtaEnabled(e.target.checked)}
                  />
                  Mostrar CTA neste artigo
                </label>
                <input
                  type="text"
                  value={ctaTitle}
                  onChange={(e) => setCtaTitle(e.target.value)}
                  placeholder="Título do CTA"
                  className="w-full rounded-lg border border-white/10 bg-navy-900 px-3 py-2 text-sm text-white"
                />
                <textarea
                  value={ctaDescription}
                  onChange={(e) => setCtaDescription(e.target.value)}
                  placeholder="Descrição"
                  rows={2}
                  className="w-full rounded-lg border border-white/10 bg-navy-900 px-3 py-2 text-sm text-white"
                />
                <input
                  type="text"
                  value={ctaButtonText}
                  onChange={(e) => setCtaButtonText(e.target.value)}
                  placeholder="Texto do botão"
                  className="w-full rounded-lg border border-white/10 bg-navy-900 px-3 py-2 text-sm text-white"
                />
                <input
                  type="text"
                  value={ctaButtonUrl}
                  onChange={(e) => setCtaButtonUrl(e.target.value)}
                  placeholder="URL do botão"
                  className="w-full rounded-lg border border-white/10 bg-navy-900 px-3 py-2 text-sm text-white"
                />
                <ImageUpload
                  value={ctaImage}
                  onChange={setCtaImage}
                  folder="articles/cta"
                  label="Imagem do CTA"
                />
              </div>
            )}
          </div>

          {/* Slug */}
          <div className="rounded-lg border border-white/10 bg-white/5 p-4">
            <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-navy-400">
              Slug (URL)
            </label>
            <div className="flex items-center gap-1 text-xs text-navy-500">
              <span>/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="titulo-do-artigo"
                className="flex-1 rounded border border-white/10 bg-navy-900 px-2 py-1 text-sm text-white placeholder-navy-500 focus:border-accent focus:outline-none"
              />
            </div>
          </div>

          {/* SEO */}
          <div className="rounded-lg border border-white/10 bg-white/5">
            <button
              type="button"
              onClick={() => setShowSeo(!showSeo)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-navy-400">
                <Eye size={14} />
                SEO
              </span>
              <ChevronDown
                size={14}
                className={`text-navy-400 transition-transform ${
                  showSeo ? "rotate-180" : ""
                }`}
              />
            </button>
            {showSeo && (
              <div className="space-y-3 border-t border-white/10 p-4">
                <div>
                  <label className="mb-1 block text-xs text-navy-400">
                    Meta título
                  </label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={title || "Título para SEO"}
                    className="w-full rounded-lg border border-white/10 bg-navy-900 px-3 py-2 text-sm text-white placeholder-navy-500 focus:border-accent focus:outline-none"
                  />
                  <p className="mt-0.5 text-[11px] text-navy-500">
                    {(metaTitle || title).length}/60 caracteres
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-navy-400">
                    Meta descrição
                  </label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder={excerpt || "Descrição para SEO"}
                    rows={3}
                    className="w-full resize-none rounded-lg border border-white/10 bg-navy-900 px-3 py-2 text-sm text-white placeholder-navy-500 focus:border-accent focus:outline-none"
                  />
                  <p className="mt-0.5 text-[11px] text-navy-500">
                    {(metaDescription || excerpt).length}/160 caracteres
                  </p>
                </div>

                {/* Preview */}
                <div className="rounded-lg bg-white p-3">
                  <p className="text-sm font-medium text-blue-800 leading-tight">
                    {metaTitle || title || "Título do artigo"}
                  </p>
                  <p className="mt-0.5 text-xs text-green-700">
                    institutojoaoalves.com.br/blog/{slug || "..."}
                  </p>
                  <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                    {metaDescription || excerpt || "Descrição do artigo..."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
