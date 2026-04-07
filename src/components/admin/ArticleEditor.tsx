"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Save, Send, ArrowLeft, Loader2, Trash2, Clock, ChevronDown } from "lucide-react";
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
  const [coverUrl, setCoverUrl] = useState<string | null>(article?.cover_url || null);
  const [category, setCategory] = useState(article?.category || "");
  const [tagsInput, setTagsInput] = useState(article?.tags?.join(", ") || "");
  const [author, setAuthor] = useState(article?.author || "João Pedro Alves");
  const [authorAvatar, setAuthorAvatar] = useState<string | null>(article?.author_avatar || null);
  const [metaTitle, setMetaTitle] = useState(article?.meta_title || "");
  const [metaDescription, setMetaDescription] = useState(article?.meta_description || "");
  const [ctaEnabled, setCtaEnabled] = useState(article?.cta_enabled || false);
  const [ctaTitle, setCtaTitle] = useState(article?.cta_title || "");
  const [ctaDescription, setCtaDescription] = useState(article?.cta_description || "");
  const [ctaButtonText, setCtaButtonText] = useState(article?.cta_button_text || "");
  const [ctaButtonUrl, setCtaButtonUrl] = useState(article?.cta_button_url || "");
  const [ctaImage, setCtaImage] = useState<string | null>(article?.cta_image || null);
  const [showCta, setShowCta] = useState(false);
  const [showSeo, setShowSeo] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  // Stats: word count + read time (200wpm)
  const stats = useMemo(() => {
    const text = content.replace(/<[^>]+>/g, " ").trim();
    const words = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return { words, minutes };
  }, [content]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!isEditing || !article?.slug) setSlug(generateSlug(value));
  };

  const prepareTags = () =>
    tagsInput.split(",").map((t) => t.trim()).filter(Boolean);

  const handleSave = async (status: "draft" | "published") => {
    if (!title.trim()) return setError("O título é obrigatório.");
    if (!content.trim()) return setError("O conteúdo é obrigatório.");

    const isPublishing = status === "published";
    isPublishing ? setPublishing(true) : setSaving(true);
    setError("");

    try {
      const articleData = {
        title: title.trim(),
        slug: slug || generateSlug(title),
        excerpt: excerpt.trim(),
        content,
        cover_url: coverUrl,
        category,
        tags: prepareTags(),
        status,
        author: author.trim() || "João Pedro Alves",
        author_avatar: authorAvatar,
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

      if (isEditing && article) await updateArticle(article.id, articleData);
      else await createArticle(articleData);

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
    if (!confirm("Tem certeza que deseja excluir este artigo?")) return;
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
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => router.push("/acesso/artigos")}
          className="flex items-center gap-2 text-sm text-navy-600 hover:text-navy-950"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        <div className="flex items-center gap-2">
          {isEditing && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
              Excluir
            </button>
          )}
          <button
            onClick={() => handleSave("draft")}
            disabled={saving || publishing}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-navy-950 hover:bg-gray-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Salvar rascunho
          </button>
          <button
            onClick={() => handleSave("published")}
            disabled={saving || publishing}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark"
          >
            {publishing ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
            Publicar
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Main */}
        <div className="space-y-5">
          {/* Título */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <label className="mb-2 block text-sm font-semibold text-navy-950">
              Título do artigo <span className="text-accent">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Digite o título do seu artigo..."
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-lg font-semibold text-navy-950 placeholder-gray-400 focus:border-accent focus:outline-none"
            />
          </div>

          {/* Slug */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <label className="mb-2 block text-sm font-semibold text-navy-950">Slug (URL)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="titulo-do-artigo"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-navy-950 placeholder-gray-400 focus:border-accent focus:outline-none"
            />
            <p className="mt-2 text-xs text-navy-500">
              /blog/<span className="text-accent">{slug || "titulo-do-artigo"}</span>
            </p>
          </div>

          {/* Resumo */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <label className="mb-2 block text-sm font-semibold text-navy-950">
              Resumo do artigo
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Aparece nas listagens e em SEO..."
              rows={2}
              className="w-full resize-none rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-navy-950 placeholder-gray-400 focus:border-accent focus:outline-none"
            />
          </div>

          {/* Conteúdo */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <label className="mb-2 block text-sm font-semibold text-navy-950">
              Conteúdo <span className="text-accent">*</span>
            </label>
            <TiptapEditor content={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Configurações */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-4 text-sm font-bold text-navy-950">Configurações</h3>
            <div className="space-y-4">
              {/* Status (só editing) */}
              {isEditing && (
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-navy-500">
                    Status
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      article?.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {article?.status === "published" ? "Publicado" : "Rascunho"}
                  </span>
                </div>
              )}

              {/* Categoria */}
              <div>
                <label className="mb-1 block text-xs font-medium text-navy-700">
                  Categoria <span className="text-accent">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-accent focus:outline-none"
                >
                  <option value="">Selecione...</option>
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Autor */}
              <div>
                <label className="mb-1 block text-xs font-medium text-navy-700">Autor</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-navy-950 focus:border-accent focus:outline-none"
                />
              </div>

              {/* Foto do autor */}
              <ImageUpload
                value={authorAvatar}
                onChange={setAuthorAvatar}
                folder="authors"
                label="Foto do autor"
              />

              {/* Tempo de leitura */}
              <div>
                <p className="mb-1 text-xs font-medium text-navy-700">Tempo de leitura</p>
                <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
                  <Clock size={14} className="text-accent" />
                  <span className="text-sm font-medium text-navy-950">{stats.minutes} min</span>
                  <span className="text-xs text-navy-500">({stats.words} palavras)</span>
                </div>
              </div>

              {/* Meta descrição */}
              <div>
                <label className="mb-1 block text-xs font-medium text-navy-700">
                  Meta descrição
                </label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Descrição para SEO (até 160 caracteres)"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-navy-950 placeholder-gray-400 focus:border-accent focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-navy-500">
                  {metaDescription.length}/160 caracteres
                </p>
              </div>

              {/* Tags */}
              <div>
                <label className="mb-1 block text-xs font-medium text-navy-700">Tags</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="CMV, Lucro, Finanças"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-navy-950 placeholder-gray-400 focus:border-accent focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-navy-500">Separe com vírgula</p>
              </div>
            </div>
          </div>

          {/* Imagem de capa */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <ImageUpload
              value={coverUrl}
              onChange={setCoverUrl}
              folder="articles"
              label="Imagem de capa"
            />
          </div>

          {/* CTA Banner (collapsible) */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <button
              type="button"
              onClick={() => setShowCta(!showCta)}
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <span className="flex items-center gap-2 text-sm font-bold text-navy-950">
                CTA Banner
                {ctaEnabled && (
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[9px] text-green-700">
                    ON
                  </span>
                )}
              </span>
              <ChevronDown
                size={16}
                className={`text-navy-500 transition-transform ${showCta ? "rotate-180" : ""}`}
              />
            </button>
            {showCta && (
              <div className="space-y-3 border-t border-gray-200 p-5">
                <label className="flex items-center gap-2 text-xs text-navy-700">
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
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-navy-950 placeholder-gray-400 focus:border-accent focus:outline-none"
                />
                <textarea
                  value={ctaDescription}
                  onChange={(e) => setCtaDescription(e.target.value)}
                  placeholder="Descrição"
                  rows={2}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-navy-950 placeholder-gray-400 focus:border-accent focus:outline-none"
                />
                <input
                  type="text"
                  value={ctaButtonText}
                  onChange={(e) => setCtaButtonText(e.target.value)}
                  placeholder="Texto do botão"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-navy-950 placeholder-gray-400 focus:border-accent focus:outline-none"
                />
                <input
                  type="text"
                  value={ctaButtonUrl}
                  onChange={(e) => setCtaButtonUrl(e.target.value)}
                  placeholder="URL do botão"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-navy-950 placeholder-gray-400 focus:border-accent focus:outline-none"
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

          {/* SEO avançado (collapsible) */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <button
              type="button"
              onClick={() => setShowSeo(!showSeo)}
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <span className="text-sm font-bold text-navy-950">SEO avançado</span>
              <ChevronDown
                size={16}
                className={`text-navy-500 transition-transform ${showSeo ? "rotate-180" : ""}`}
              />
            </button>
            {showSeo && (
              <div className="space-y-3 border-t border-gray-200 p-5">
                <div>
                  <label className="mb-1 block text-xs text-navy-700">Meta título</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder={title || "Título para SEO"}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-navy-950 placeholder-gray-400 focus:border-accent focus:outline-none"
                  />
                  <p className="mt-1 text-[11px] text-navy-500">
                    {(metaTitle || title).length}/60 caracteres
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <p className="text-sm font-medium leading-tight text-blue-800">
                    {metaTitle || title || "Título do artigo"}
                  </p>
                  <p className="mt-0.5 text-xs text-green-700">
                    institutojoaoalves.com.br/blog/{slug || "..."}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-600">
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
