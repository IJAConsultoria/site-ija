"use client";

import { useState, useEffect, use } from "react";
import { Loader2 } from "lucide-react";
import ArticleEditor from "@/components/admin/ArticleEditor";
import { getArticle, type Article } from "@/lib/queries/blog";

export default function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getArticle(id);
        setArticle(data);
      } catch {
        setError("Artigo não encontrado.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-400">{error || "Artigo não encontrado."}</p>
      </div>
    );
  }

  return <ArticleEditor article={article} />;
}
